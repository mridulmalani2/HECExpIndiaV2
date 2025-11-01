# 🔧 Setup Guide for Experience India

This guide will help you set up the Experience India platform with your own content using Google Sheets.

---

## 📊 Google Sheets Data Structure

### Required Columns

Each sheet should have these basic columns (names are flexible, the app will auto-detect):

#### All Sections (News, Bollywood, Restaurants, Recipes, Events, Resources)

**Core Fields:**
- `Title` or `Name` - Main heading for the card
- `Description` or `Summary` - Brief description (optional)
- `Image` or `Image URL` or `Photo` - URL to an image (optional)
- `URL` or `Link` - External link when clicking the image (optional)

**Additional Fields:**
Any other columns you add will appear in the detail modal when users click "View details"

### Example Sheet Structures

#### News Sheet
```
Title                | Description              | Image URL                | URL                    | Source      | Date
Latest Cricket Match | India wins series 3-0   | https://...              | https://news.com/...   | ESPN        | 2024-01-15
```

#### Bollywood Sheet
```
Title              | Description           | Poster URL          | Year | Genre    | Director      | Platform
Sholay             | Classic action film   | https://...         | 1975 | Action   | Ramesh Sippy  | Prime Video
```

#### Restaurants Sheet
```
Name               | Description           | Photo               | Google Maps URL      | Cuisine      | Location
Saravana Bhavan    | Authentic South Indian| https://...         | https://maps.app/... | South Indian | Paris 10e
```

---

## 🔗 Setting Up Google Sheets

### Step 1: Create Your Sheets

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet for each section (or use tabs in one spreadsheet)
3. Add your column headers in the first row
4. Fill in your data

### Step 2: Make Sheets Public

For each sheet/tab:

1. Click **Share** button (top right)
2. Click **Change to anyone with the link**
3. Set permission to **Viewer**
4. Copy the share URL
   - Format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=GID`
   - The `SPREADSHEET_ID` is the long string in the middle
   - The `gid` is the tab ID (0 for first tab, different numbers for other tabs)

### Step 3: Configure the App

#### Method A: Direct Config File (Recommended)

Edit `src/config/site.config.ts`:

```typescript
sections: [
  {
    id: 'news',
    title: 'News',
    emoji: '📰',
    description: 'Latest updates from India and France',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=YOUR_GID',
    enabled: true,
    fieldMappings: {
      title: ['title', 'headline', 'name'],
      description: ['description', 'summary'],
      image: ['image', 'image url', 'photo'],
      link: ['url', 'link', 'article url'],
    },
  },
  // Repeat for other sections...
]
```

#### Method B: Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your sheet URLs:
   ```
   VITE_SHEET_NEWS=https://docs.google.com/spreadsheets/d/ABC123/edit#gid=0
   VITE_SHEET_BOLLYWOOD=https://docs.google.com/spreadsheets/d/ABC123/edit#gid=1
   VITE_SHEET_RESTAURANTS=https://docs.google.com/spreadsheets/d/ABC123/edit#gid=2
   VITE_SHEET_RECIPES=https://docs.google.com/spreadsheets/d/ABC123/edit#gid=3
   VITE_SHEET_EVENTS=https://docs.google.com/spreadsheets/d/ABC123/edit#gid=4
   VITE_SHEET_RESOURCES=https://docs.google.com/spreadsheets/d/ABC123/edit#gid=5
   ```

3. Update `site.config.ts` to read from environment:
   ```typescript
   sheetUrl: import.meta.env.VITE_SHEET_NEWS || '',
   ```

---

## 🎨 Customization

### Logo

Replace the placeholder logo URL in `src/config/site.config.ts`:

```typescript
logoUrl: 'https://your-domain.com/logo.png',
```

**Recommended logo specs:**
- Format: PNG or SVG
- Size: 150-200px width, ~40-50px height
- Background: Transparent
- Style: Works on both light and dark backgrounds

### Site Title & Description

```typescript
title: 'Your Site Name',
description: 'Your description for SEO',
```

### Theme Colors

Edit `tailwind.config.js` to change the color palette:

```javascript
colors: {
  primary: { /* your brand color */ },
  accent: { /* your accent color */ },
}
```

### Cards Per Page

```typescript
features: {
  cardsPerPage: 9, // Show 9 cards before "Load More"
}
```

### Enable/Disable Features

```typescript
features: {
  enableSearch: true,      // Global search bar
  enableFiltering: true,   // Filter within sections
}
```

---

## 🔍 Field Mapping

The app automatically detects column names, but you can customize mappings:

```typescript
fieldMappings: {
  title: ['title', 'movie name', 'heading'],     // Try these columns in order
  description: ['desc', 'summary', 'synopsis'],
  image: ['poster', 'image', 'photo url'],
  link: ['watch link', 'url', 'website'],
}
```

The app will try each candidate and use the first match found.

---

## 🚀 Testing Your Setup

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Open browser**: `http://localhost:5000`

3. **Check each section**:
   - Verify cards appear
   - Click cards to see modals
   - Test image loading
   - Try external links

4. **Test search**: Type in the search bar to filter

5. **Test theme toggle**: Click moon/sun icon

---

## 🐛 Troubleshooting

### "No content available"

**Cause**: Sheet URL is empty or data can't be loaded

**Fix**:
1. Check `sheetUrl` is set correctly
2. Verify sheet is public (anyone with link can view)
3. Check browser console for errors
4. Test the CSV export URL directly in browser

### Images not loading

**Cause**: Invalid image URLs or CORS issues

**Fix**:
1. Use direct image URLs (not Google Drive share links)
2. Use HTTPS URLs
3. Consider hosting images on imgur, cloudinary, or similar

### Field not appearing

**Cause**: Column name doesn't match field mappings

**Fix**:
1. Check exact column name in sheet (case-insensitive)
2. Add the column name to `fieldMappings`
3. Reload the page to clear cache

---

## 📦 CSV Fallback

If Google Sheets isn't working, you can use local CSV files:

1. **Place CSV files** in `public/data/`:
   ```
   public/data/news.csv
   public/data/bollywood.csv
   public/data/restaurants.csv
   // etc...
   ```

2. **Leave sheetUrl empty** in config:
   ```typescript
   sheetUrl: '', // Will use /data/{section.id}.csv
   ```

3. **Format CSV** with headers matching your field mappings:
   ```csv
   Title,Description,Image,URL,Extra Field
   "First Item","Description here","https://...","https://...","Value"
   ```

---

## 🎯 Going Live

### Pre-Deployment Checklist

- [ ] All Google Sheets are public
- [ ] Sheet URLs are configured
- [ ] Logo URL is set
- [ ] Site title and description are updated
- [ ] Theme colors match your brand
- [ ] Test on mobile device
- [ ] All external links work
- [ ] Images load correctly
- [ ] SEO meta tags are set

### Build for Production

```bash
npm run build
```

This creates an optimized build in `dist/` folder.

### Deploy

**Netlify**: Drag the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)

**Vercel**: `vercel --prod`

**Replit**: Click "Deploy" button

---

## 📧 Support

If you run into issues:

1. Check browser console for errors
2. Verify Google Sheets are publicly accessible
3. Test the CSV export URL in your browser
4. Contact: mridul.malani@hec.edu

---

Happy building! 🎉
