import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { analyzeWebsiteContent, ScrapedData } from './scraper';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Web scraping endpoint
app.post('/api/scrape', async (req: Request, res: Response) => {
  try {
    const { url, sections } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        error: 'URL is required',
        message: 'Please provide a valid URL to scrape'
      });
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ 
        error: 'Invalid URL',
        message: 'Please provide a valid URL (including https://)'
      });
    }
    
    console.log(`Starting to scrape: ${url}`);
    console.log(`Selected sections:`, sections);
    
    // Scrape the website
    const scrapedData = await analyzeWebsiteContent(url);
    
    console.log('Scraped data:', scrapedData);
    
    // Filter data based on selected sections
    const filteredData = filterDataBySections(scrapedData, sections);
    
    res.json({
      success: true,
      data: filteredData,
      message: 'Website data extracted successfully'
    });
    
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ 
      error: 'Scraping failed',
      message: error instanceof Error ? error.message : 'Failed to scrape the website. Please check if the URL is accessible.'
    });
  }
});

function filterDataBySections(data: ScrapedData, sections: any): any {
  const result: any = {};
  
  if (!sections) {
    return data;
  }
  
  // Stage Zero: Concept & Research
  if (sections.concept) {
    if (data.mission) result.mission = data.mission;
    if (data.vision) result.vision = data.vision;
    if (data.coreValues) result.coreValues = data.coreValues;
    if (data.targetAudience) result.targetAudience = data.targetAudience;
    if (data.problemSolving) result.problemSolving = data.problemSolving;
    if (data.uniqueValue) result.uniqueValue = data.uniqueValue;
  }
  
  // Stage One: Brand Identity
  if (sections.brand) {
    if (data.brandName) result.brandName = data.brandName;
    if (data.tagline) result.tagline = data.tagline;
    if (data.brandColors) result.brandColors = data.brandColors;
    if (data.targetEmotion) result.targetEmotion = data.targetEmotion;
    if (data.uvp) result.uvp = data.uvp;
  }
  
  // Additional sections can be added here as needed
  
  return result;
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Scraping API available at http://localhost:${PORT}/api/scrape`);
});

export default app;
