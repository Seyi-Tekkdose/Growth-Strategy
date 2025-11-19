#!/bin/bash

# Growth Strategy App - Quick Start Script
# This script helps you get both the frontend and backend running quickly

echo "🚀 Starting Growth Strategy App..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the Growth-Strategy directory"
    exit 1
fi

echo "📦 Installing dependencies (if needed)..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1️⃣  Start the backend server:"
echo "   npm run server:dev"
echo ""
echo "2️⃣  In a new terminal, start the frontend:"
echo "   npm run dev"
echo ""
echo "3️⃣  Open your browser to:"
echo "   http://localhost:8080"
echo ""
echo "🎉 Enjoy using the web scraper feature!"
echo ""
echo "📚 Documentation:"
echo "   - WEB_SCRAPER_GUIDE.md - User guide"
echo "   - IMPLEMENTATION_SUMMARY.md - Technical details"
echo "   - server/README.md - Backend docs"
echo ""
