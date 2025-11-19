# Web Scraper Setup Guide

## Overview

Your Growth Strategy App now includes a powerful web scraping feature that uses Puppeteer to automatically extract business information from websites and populate your forms.

## Quick Start

### 1. Start the Backend Server

In one terminal:

```bash
npm run server:dev
```

You should see:
```
🚀 Server is running on http://localhost:3001
📊 Scraping API available at http://localhost:3001/api/scrape
```

### 2. Start the Frontend

In another terminal:

```bash
npm run dev
```

### 3. Use the Import Feature

1. Click the "Import from URL" button on your form
2. Enter a website URL (e.g., `https://example.com`)
3. Select which sections you want to populate:
   - ✅ Stage Zero: Concept & Research
   - ✅ Stage One: Brand Identity
   - ⬜ Stage Two: Marketing Campaigns
   - ⬜ Stage Three: Operations & SOPs
   - ⬜ Stage Scale: Growth & Funding
4. Click "Import Data"
5. Wait for the scraper to analyze the website
6. Your form fields will be automatically populated!

## What Gets Extracted

### Stage Zero (Concept & Research)
- **Mission Statement**: Company purpose and why they exist
- **Vision Statement**: Long-term goals and aspirations
- **Core Values**: Guiding principles
- **Target Audience**: Who they serve
- **Problem Solving**: What challenges they address
- **Unique Approach**: How they differ from competitors

### Stage One (Brand Identity)
- **Brand Name**: Company/product name
- **Tagline**: Memorable one-liner
- **Brand Colors**: Primary colors used
- **Target Emotion**: Emotional response they aim for
- **UVP**: Unique Value Proposition

## How It Works

```
User Input → Backend API → Puppeteer Scraper → Data Extraction → Frontend Update
```

1. **User enters URL** in the Import dialog
2. **Frontend sends request** to backend API (`/api/scrape`)
3. **Puppeteer launches** a headless browser
4. **Page is loaded** and content is extracted
5. **Smart parsing** identifies relevant business information
6. **Data is structured** and returned to frontend
7. **LocalStorage is updated** with new data
8. **Components refresh** automatically with new information

## Example Websites to Try

Test the scraper with these types of websites:

- Your own business website
- Your portfolio site
- Company "About" pages
- Landing pages with clear value propositions
- Business profiles on LinkedIn

## Architecture

```
Growth-Strategy/
├── server/
│   ├── index.ts         # Express server with API endpoints
│   ├── scraper.ts       # Puppeteer scraping logic
│   ├── tsconfig.json    # TypeScript config for server
│   └── README.md        # Server documentation
├── src/
│   └── components/
│       ├── ImportFromUrl.tsx  # Import UI component
│       ├── StageZero.tsx      # Updated with storage listener
│       └── StageOne.tsx       # Updated with storage listener
└── vite.config.ts      # Includes proxy for /api routes
```

## API Reference

### POST /api/scrape

**Request:**
```typescript
{
  url: string;           // Website URL to scrape
  sections: {
    concept: boolean;    // Extract Stage Zero data
    brand: boolean;      // Extract Stage One data
    marketing: boolean;  // Extract Stage Two data (coming soon)
    operations: boolean; // Extract Stage Three data (coming soon)
    growth: boolean;     // Extract Stage Scale data (coming soon)
  }
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    // Stage Zero fields
    mission?: string;
    vision?: string;
    coreValues?: string;
    targetAudience?: string;
    problemSolving?: string;
    uniqueValue?: string;
    
    // Stage One fields
    brandName?: string;
    tagline?: string;
    brandColors?: string;
    targetEmotion?: string;
    uvp?: string;
  };
  message: string;
}
```

## Troubleshooting

### Server Won't Start

```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill the process if needed
kill -9 <PID>
```

### Puppeteer Errors

If you see Chromium download errors:

```bash
# Reinstall Puppeteer
npm install puppeteer --force
```

### No Data Extracted

Some websites may:
- Block headless browsers
- Require authentication
- Have minimal text content
- Use JavaScript rendering that takes time

Try:
- Websites with clear "About" sections
- Pages with structured content
- Sites without heavy JavaScript

### CORS Errors

The Vite proxy should handle this, but if you see CORS errors:
1. Make sure both servers are running
2. Check vite.config.ts has the proxy configured
3. Clear browser cache and restart

## Best Practices

### 🟢 Good URLs to Scrape
- Your own business website
- Public landing pages
- Company about pages
- Portfolio sites
- LinkedIn company pages (public info)

### 🔴 Don't Scrape
- Sites that explicitly prohibit scraping (robots.txt)
- Password-protected content
- Competitors' private data
- Sites with aggressive rate limiting

## Performance Tips

- **First scrape takes longer** (~5-10 seconds) as Puppeteer launches
- **Subsequent scrapes are faster**
- **Large websites** may take longer to parse
- **Single-page sites** are quickest

## Extending the Scraper

Want to extract more data? Edit `server/scraper.ts`:

```typescript
// Add new extraction logic
const extractNewField = () => {
  const element = document.querySelector('.your-selector');
  return element?.textContent?.trim();
};

data.newField = extractNewField();
```

Then update the TypeScript interface and frontend to use the new field.

## Future Enhancements

Planned features:
- [ ] AI-powered content summarization
- [ ] Multiple URL batch processing
- [ ] Screenshot capture
- [ ] SEO analysis
- [ ] Competitor analysis
- [ ] PDF export

## Need Help?

Check these files:
- `server/README.md` - Backend documentation
- `server/scraper.ts` - Scraping logic
- `src/components/ImportFromUrl.tsx` - Frontend UI

---

Happy scraping! 🚀
