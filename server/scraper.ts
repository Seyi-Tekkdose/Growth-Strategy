import puppeteer, { Browser, Page } from 'puppeteer';

export interface ScrapedData {
  mission?: string;
  vision?: string;
  coreValues?: string;
  targetAudience?: string;
  problemSolving?: string;
  uniqueValue?: string;
  brandName?: string;
  tagline?: string;
  brandColors?: string;
  targetEmotion?: string;
  uvp?: string;
  description?: string;
  aboutText?: string;
}

export async function scrapeWebsite(url: string): Promise<ScrapedData> {
  let browser: Browser | null = null;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page: Page = await browser.newPage();
    
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Navigate to the URL with timeout
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Extract data from the page using evaluateHandle to avoid __name issue
    const dataHandle = await page.evaluateHandle(() => {
      return {
        title: document.title,
        h1Text: document.querySelector('h1')?.textContent?.trim() || '',
        logoText: document.querySelector('header .logo, .navbar .logo, [class*="logo"]')?.textContent?.trim() || '',
        description: document.querySelector('meta[name="description"], meta[property="og:description"]')?.getAttribute('content') || '',
        tagline: document.querySelector('header p, .tagline, .subtitle')?.textContent?.trim() || '',
        mission: document.querySelector('[class*="mission"], [id*="mission"], .mission, #mission')?.textContent?.trim() || '',
        vision: document.querySelector('[class*="vision"], [id*="vision"], .vision, #vision')?.textContent?.trim() || '',
        values: document.querySelector('[class*="value"], [id*="value"], .values, #values')?.textContent?.trim() || '',
        about: document.querySelector('[class*="about"], [id*="about"], .about, #about')?.textContent?.trim() || '',
        heroP: document.querySelector('.hero p, section:first-of-type p')?.textContent?.trim() || ''
      };
    });
    
    const rawData = await dataHandle.jsonValue();
    await dataHandle.dispose();
    
    //Process the raw data
    const scrapedData: ScrapedData = {};
    
    // Extract brand name
    const brandName = rawData.logoText || rawData.h1Text || rawData.title.split('|')[0].trim() || rawData.title.split('-')[0].trim();
    if (brandName) {
      scrapedData.brandName = brandName
        .replace(/\s*[-|–]\s*.+$/, '')
        .replace(/\s+(Inc\.|LLC|Ltd\.|Limited|Corporation|Corp\.)$/i, '')
        .trim();
    }
    
    // Extract other fields
    if (rawData.description && rawData.description.length > 0) {
      scrapedData.description = rawData.description;
    }
    
    if (rawData.tagline && rawData.tagline.length > 0) {
      scrapedData.tagline = rawData.tagline;
    }
    
    if (rawData.mission && rawData.mission.length > 20) {
      scrapedData.mission = rawData.mission;
    }
    
    if (rawData.vision && rawData.vision.length > 20) {
      scrapedData.vision = rawData.vision;
    }
    
    if (rawData.values && rawData.values.length > 10) {
      scrapedData.coreValues = rawData.values;
    }
    
    if (rawData.about && rawData.about.length > 50) {
      scrapedData.aboutText = rawData.about;
    }
    
    if (rawData.heroP && rawData.heroP.length > 30 && rawData.heroP.length < 300) {
      scrapedData.uvp = rawData.heroP;
    }
    
    // Process the scraped data with AI-like enhancement
    const processedData = enhanceScrapedData(scrapedData as ScrapedData);
    
    return processedData;
    
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error(`Failed to scrape website: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function enhanceScrapedData(data: ScrapedData): ScrapedData {
  const enhanced: ScrapedData = { ...data };
  
  // If we have description but no mission, use description as mission
  if (!enhanced.mission && enhanced.description) {
    enhanced.mission = enhanced.description;
  }
  
  // If we have about text, try to extract useful information
  if (enhanced.aboutText) {
    const about = enhanced.aboutText.toLowerCase();
    
    // Try to identify problem solving
    if (about.includes('solve') || about.includes('problem') || about.includes('challenge')) {
      const sentences = enhanced.aboutText.split(/[.!?]+/);
      for (const sentence of sentences) {
        const lower = sentence.toLowerCase();
        if (lower.includes('solve') || lower.includes('problem') || lower.includes('challenge')) {
          enhanced.problemSolving = sentence.trim();
          break;
        }
      }
    }
    
    // Try to identify unique value
    if (about.includes('unique') || about.includes('different') || about.includes('unlike')) {
      const sentences = enhanced.aboutText.split(/[.!?]+/);
      for (const sentence of sentences) {
        const lower = sentence.toLowerCase();
        if (lower.includes('unique') || lower.includes('different') || lower.includes('unlike')) {
          enhanced.uniqueValue = sentence.trim();
          break;
        }
      }
    }
    
    // Try to identify target audience
    if (about.includes('for') || about.includes('help') || about.includes('serve')) {
      const sentences = enhanced.aboutText.split(/[.!?]+/);
      for (const sentence of sentences) {
        const lower = sentence.toLowerCase();
        if ((lower.includes('for') || lower.includes('help') || lower.includes('serve')) 
            && (lower.includes('business') || lower.includes('people') || lower.includes('customers'))) {
          enhanced.targetAudience = sentence.trim();
          break;
        }
      }
    }
  }
  
  // Use UVP for mission if mission is missing
  if (!enhanced.mission && enhanced.uvp) {
    enhanced.mission = enhanced.uvp;
  }
  
  return enhanced;
}

export async function analyzeWebsiteContent(url: string): Promise<ScrapedData> {
  try {
    const data = await scrapeWebsite(url);
    return data;
  } catch (error) {
    throw error;
  }
}
