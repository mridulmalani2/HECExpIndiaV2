# 🌏 Experience India

**A modern cultural discovery platform for HEC Paris students**

Experience India is a beautifully designed, performance-optimized web application that helps HEC Paris students and the international community explore Indian culture through movies, food, events, and more.

![Built with React, TypeScript, Tailwind CSS](https://img.shields.io/badge/Built%20with-React%20%7C%20TypeScript%20%7C%20Tailwind-blue)

---

## ✨ Features

### 🎨 Modern Design
- **Indian-Modern Color Palette**: Saffron, peacock blue, turmeric gold
- **Light/Dark Theme**: Seamless theme switching with system preference detection
- **Glass-morphism UI**: Sticky navbar with backdrop blur effects
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Responsive Design**: Mobile-first, works beautifully on all devices

### 🚀 Performance
- **Lazy Loading**: Images load on demand with intersection observer
- **Smart Caching**: 5-minute cache for Google Sheets data
- **Optimized Builds**: Vite for lightning-fast development and production builds
- **SEO Ready**: Meta tags and Open Graph configuration included

### 📊 Content Management
- **Google Sheets Integration**: Pull data directly from Google Sheets
- **CSV Fallback**: Works with local CSV files when sheets aren't configured
- **Live Search**: Filter across all sections in real-time
- **Load More Pagination**: Configurable items per page
- **Accessible Modals**: WCAG AA compliant detail views

---

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Indian-inspired theme
- **Animations**: Framer Motion
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Headless UI for accessibility
- **Build Tool**: Vite 6
- **CSV Parsing**: PapaParse

---

## 🚀 Quick Start

### Prerequisites
- Node.js 22+ (required for Vite 6)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd experience-india
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5000`

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📝 Configuration

### Google Sheets Setup

1. **Create your Google Sheet** with data organized in rows and columns

2. **Make the sheet publicly accessible**
   - File → Share → Get link
   - Change to "Anyone with the link can view"
   - Copy the share URL

3. **Configure in your app**
   
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
     },
     // ... more sections
   ]
   ```

4. **Alternative: Use environment variables**
   
   Create `.env` from `.env.example`:
   
   ```bash
   cp .env.example .env
   ```
   
   Then set your sheet URLs:
   ```
   VITE_SHEET_NEWS=https://docs.google.com/spreadsheets/d/...
   VITE_SHEET_BOLLYWOOD=https://docs.google.com/spreadsheets/d/...
   ```

### Customization

#### Branding
Update logo and site info in `src/config/site.config.ts`:
```typescript
export const siteConfig = {
  title: 'Your Site Name',
  description: 'Your description',
  logoUrl: 'https://your-logo-url.com/logo.png',
  // ...
}
```

#### Theme Colors
Modify Tailwind theme in `tailwind.config.js`:
```javascript
colors: {
  saffron: { /* your colors */ },
  peacock: { /* your colors */ },
  // ...
}
```

#### Cards Per Page
Adjust in `src/config/site.config.ts`:
```typescript
features: {
  cardsPerPage: 6, // Change to your preference
}
```

---

## 📂 Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── Navbar.tsx    # Glass-morphism navbar
│   │   ├── Hero.tsx      # Landing hero section
│   │   ├── Section.tsx   # Content section wrapper
│   │   ├── Card.tsx      # Individual card component
│   │   ├── CardModal.tsx # Accessible detail modal
│   │   └── Footer.tsx    # Site footer
│   ├── config/
│   │   └── site.config.ts # Main configuration file
│   ├── hooks/
│   │   └── useTheme.ts   # Theme switching logic
│   ├── lib/
│   │   └── sheets.ts     # Google Sheets integration
│   ├── types/
│   │   └── index.ts      # TypeScript definitions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── public/
│   └── data/             # CSV fallback files
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🎯 Adding New Sections

1. **Add data to Google Sheets** or create a CSV file in `public/data/`

2. **Update configuration** in `src/config/site.config.ts`:

```typescript
sections: [
  // ... existing sections
  {
    id: 'your-section',
    title: 'Your Section',
    emoji: '🎨',
    description: 'Section description',
    sheetUrl: '', // Add your Google Sheet URL
    enabled: true,
    fieldMappings: {
      title: ['title', 'name'],           // Column names for title
      description: ['description', 'summary'],
      image: ['image', 'photo'],
      link: ['url', 'link'],
    },
  },
]
```

3. **That's it!** The section will automatically appear in:
   - Navigation menu
   - Hero quick links
   - Main content area
   - Footer links

---

## 🚀 Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder**
   - Connect your Git repository to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Deploy on Replit

The app is already configured for Replit:
- Development server runs on port 5000
- Click "Run" to start the dev server
- Click "Deploy" to publish to production

---

## 🎨 Design Philosophy

### Visual Language
- **Generous Whitespace**: Let content breathe
- **Typography Hierarchy**: Playfair Display (serif) for headings, Inter for body
- **Color Psychology**: Warm saffron for CTAs, cool peacock for accents
- **Motion Design**: Subtle animations enhance UX without distraction

### Component System
- **Atomic Design**: Reusable, composable components
- **Configuration-Driven**: Add sections without touching component code
- **Accessibility-First**: Keyboard navigation, ARIA labels, WCAG AA compliant

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

**Mridul Malani**  
Master's in Management, HEC Paris  
📧 mridul.malani@hec.edu  
📞 +33 07 45 99 31 04

---

## 📄 License

This project is open source and available under the MIT License.

---

> **"Experience India is more than a website — it's a community platform designed to celebrate India's cultural vibrancy."**
