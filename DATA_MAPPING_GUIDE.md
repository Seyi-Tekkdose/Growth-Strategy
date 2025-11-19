# Data Mapping Guide

## How Web Scraper Data Maps to Form Fields

### 🎯 Stage Zero: Concept & Research

When you select "Stage Zero" during import, the scraper extracts:

| Scraped Data | Maps To | Field Description |
|--------------|---------|-------------------|
| `brandName` | **Business/Brand Name** | Company or brand name from logo, title, or H1 |
| `mission` | **Mission Statement** | Company purpose and why they exist |
| `vision` | **Vision Statement** | Long-term goals and aspirations |
| `coreValues` | **Core Values** | Guiding principles and values |
| `targetAudience` | **Target Audience** | Who they serve/ideal customers |
| `problemSolving` | **Problem You're Solving** | Pain points they address |
| `uniqueValue` | **Your Unique Approach** | How they differ from competitors |

### 🎨 Stage One: Brand Identity

When you select "Stage One" during import, the scraper extracts:

| Scraped Data | Maps To | Field Description |
|--------------|---------|-------------------|
| `brandName` | **Brand Name** | Company or brand name |
| `tagline` | **Tagline** | Memorable one-liner or slogan |
| `brandColors` | **Brand Colors** | Primary colors used in branding |
| `uvp` | **Unique Value Proposition** | Value proposition statement |
| `targetEmotion` | **Target Emotion** | Emotional response they aim for |

## 🔄 Data Flow

```
Website URL Input
      ↓
Puppeteer Scraper
      ↓
Data Extraction
      ↓
Smart Mapping
      ↓
LocalStorage Update
      ↓
Component Auto-Refresh
      ↓
Form Fields Populated ✅
```

## 💡 Key Changes Made

### What Was Fixed

**Problem:** The web scraper was extracting `brandName` but Stage Zero didn't have a field to display it.

**Solution:** 
1. ✅ Added `businessName` field to Stage Zero component
2. ✅ Updated scraper to better extract brand names from logos
3. ✅ Updated ImportFromUrl to map `brandName` → `businessName` for Stage Zero
4. ✅ Updated ImportFromUrl to map `brandName` → `brandName` for Stage One
5. ✅ Added helpful descriptions in the import dialog

### Data Sharing Between Stages

**Brand Name** appears in both stages:
- **Stage Zero** → `businessName`: Your overall business identity
- **Stage One** → `brandName`: Your brand identity (can be different for product brands)

This allows you to:
- Have a parent company name (Stage Zero)
- Have a different product/brand name (Stage One)
- OR use the same name for both if they're identical

## 📊 Example: Scraping Stripe.com

When you scrape `https://stripe.com`, the data flows like this:

```javascript
// Extracted Data
{
  brandName: "Stripe",
  mission: "Increase the GDP of the internet",
  tagline: "Financial infrastructure for the internet",
  uvp: "We help you accept payments and manage your business online",
  brandColors: "rgb(99, 91, 255), rgb(255, 255, 255)",
  ...
}

// Maps to Stage Zero
{
  businessName: "Stripe",  // ← from brandName
  mission: "Increase the GDP of the internet",
  ...
}

// Maps to Stage One
{
  brandName: "Stripe",  // ← from brandName
  tagline: "Financial infrastructure for the internet",
  brandColors: "rgb(99, 91, 255), rgb(255, 255, 255)",
  uvp: "We help you accept payments and manage your business online",
  ...
}
```

## 🎯 Best Practices

### For Best Results:

1. **Use your About/Home page** - These typically have the most complete information
2. **Check Stage Zero first** - Verify business name populated correctly
3. **Then check Stage One** - Verify branding details
4. **Manual refinement** - Edit fields after import to perfect the content

### What Gets Prioritized:

For **Brand Name**:
1. Logo text in header/navbar
2. Main H1 heading
3. Page title (cleaned up)

For **Mission/Vision**:
1. Sections with "mission" or "vision" in class/id
2. About section content
3. Meta descriptions

---

**Updated:** November 19, 2025
