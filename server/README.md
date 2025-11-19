# Growth Strategy App - Web Scraper Backend

This backend server uses Puppeteer to scrape website content and extract relevant business information to populate the Growth Strategy form.

## Features

- **Web Scraping**: Uses Puppeteer to extract content from any public website
- **Smart Data Extraction**: Automatically identifies and extracts:
  - Mission statements
  - Vision statements
  - Core values
  - Brand information (name, tagline, colors)
  - Target audience
  - Unique value propositions
  - Problem solving statements

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

Dependencies are already installed when you ran `npm install` in the root directory.

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run server:dev
```

This will start the server on `http://localhost:3001` with automatic reloading when you make changes.

### Production Mode

```bash
npm run server
```

## API Endpoints

### Health Check

```
GET http://localhost:3001/api/health
```

Returns server status.

### Scrape Website

```
POST http://localhost:3001/api/scrape
```

**Request Body:**

```json
{
  "url": "https://example.com",
  "sections": {
    "concept": true,
    "brand": true,
    "marketing": false,
    "operations": false,
    "growth": false
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "mission": "Extracted mission statement",
    "vision": "Extracted vision statement",
    "brandName": "Extracted brand name",
    "tagline": "Extracted tagline",
    "uvp": "Extracted unique value proposition",
    ...
  },
  "message": "Website data extracted successfully"
}
```

## How It Works

1. **URL Input**: User enters their website URL in the frontend
2. **Section Selection**: User selects which sections to populate
3. **Web Scraping**: Backend launches Puppeteer to:
   - Navigate to the URL
   - Extract HTML content and metadata
   - Parse specific sections (about, mission, vision, etc.)
   - Extract brand colors from CSS
   - Identify key business information
4. **Data Processing**: Extracted data is enhanced and structured
5. **Response**: Cleaned data is sent back to frontend
6. **Auto-Population**: Frontend automatically fills form fields with extracted data

## Data Extraction Strategy

The scraper uses multiple strategies to find relevant information:

- **Meta Tags**: Checks `<meta>` tags for descriptions and OG tags
- **Semantic HTML**: Looks for sections with IDs/classes containing keywords like "mission", "vision", "about"
- **CSS Analysis**: Extracts brand colors from computed styles
- **Content Analysis**: Analyzes text content to identify problem statements and unique values

## Troubleshooting

### Puppeteer Installation Issues

If Puppeteer fails to install:

```bash
# On macOS
brew install chromium

# Set environment variable
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=/path/to/chromium
```

### CORS Issues

The server is configured with CORS enabled for all origins in development. For production, update the CORS configuration in `server/index.ts`.

### Timeout Issues

If scraping times out:
- Increase the timeout in `scraper.ts` (currently 30 seconds)
- Check if the target website requires authentication
- Some websites may block headless browsers

## Security Notes

- Never scrape websites without permission
- Respect robots.txt files
- Be mindful of rate limiting
- Some websites may block automated access
- This tool is intended for scraping your own business websites

## Future Enhancements

- [ ] Add AI-powered content analysis (OpenAI/Anthropic integration)
- [ ] Support for authenticated pages
- [ ] PDF export of scraped data
- [ ] Batch URL processing
- [ ] Screenshot capture
- [ ] SEO analysis
