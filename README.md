# Growth Strategy App 🚀

A comprehensive business growth planning application with AI-powered web scraping capabilities.

## ✨ New Feature: Web Scraper

**Automatically extract business information from any website!**

Simply enter your website URL and let Puppeteer extract:
- Mission & Vision statements
- Brand identity information
- Core values
- Target audience
- Unique value propositions
- And more!

👉 **[Read the Web Scraper Guide](WEB_SCRAPER_GUIDE.md)** for detailed instructions.

## Project info

**URL**: https://lovable.dev/projects/40cb5110-192b-40c1-b215-f4df7ee7bedc

## Quick Start

### Frontend + Backend

```sh
# Terminal 1: Start the backend server
npm run server:dev

# Terminal 2: Start the frontend
npm run dev
```

Visit `http://localhost:8080` to use the app!

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend API server
- `npm run server:dev` - Start backend with auto-reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Technologies

**Frontend:**
- React + TypeScript
- Vite
- shadcn-ui
- Tailwind CSS
- Lucide React (icons)

**Backend:**
- Node.js + Express
- Puppeteer (web scraping)
- TypeScript

## Features

### 📝 Multi-Stage Growth Planning
- **Stage Zero**: Concept & Research
- **Stage One**: Brand & MVP
- **Stage Two**: Marketing Campaigns
- **Stage Three**: Operations & SOPs
- **Stage Scale**: Growth & Funding

### 🤖 AI-Powered Tools
- **Import from URL**: Automatically extract business data from websites
- **AI Content Generator**: Generate mission statements, taglines, and more

### 💾 Data Persistence
- Local storage for all form data
- Export/import functionality
- Progress tracking

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/40cb5110-192b-40c1-b215-f4df7ee7bedc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Click "Code" → "Codespaces" → "New codespace"
- Edit and commit directly in the browser

## 📚 Documentation

- **[Web Scraper Guide](WEB_SCRAPER_GUIDE.md)** - Complete guide to using the web scraper
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Technical implementation details
- **[Server README](server/README.md)** - Backend server documentation

## 🚀 Deployment

Deploy via [Lovable](https://lovable.dev/projects/40cb5110-192b-40c1-b215-f4df7ee7bedc):
- Click Share → Publish

### Custom Domain

Connect a custom domain in Project > Settings > Domains.

[Read more about custom domains](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🛠️ Project Structure

```
Growth-Strategy/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom hooks
│   └── lib/               # Utilities
├── server/                 # Backend API server
│   ├── index.ts           # Express server
│   ├── scraper.ts         # Puppeteer scraping logic
│   └── README.md          # Server documentation
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is private and proprietary.

## 🎉 What's New

### v1.1.0 - Web Scraper Integration
- ✨ Puppeteer-based web scraping
- 🔍 Automatic business information extraction
- 🎯 Smart data mapping to form fields
- 🚀 Background processing with loading states
- ✅ Error handling and validation

---

Built with ❤️ using React, TypeScript, and Puppeteer
