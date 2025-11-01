# Experience India - Replit Setup

## Overview
A modern, React-based cultural discovery platform for HEC Paris students to explore Indian culture, cuisine, and cinema. Completely redesigned from the original static MVP with a sophisticated, accessible, and performant architecture.

## Project Status
- ✅ **Complete Redesign**: Modern React + TypeScript + Tailwind stack
- ✅ **Development Server**: Running on port 5000 with Vite HMR
- ✅ **Google Sheets Integration**: Live data fetching with smart caching
- ✅ **Theme System**: Indian-modern light/dark modes
- ✅ **Multi-Language Support**: EN/FR toggle using Google Translate widget
- ✅ **Google Authentication**: Optional Google Sign-In in navbar
- ✅ **User Engagement**: Floating comment/suggestion box
- ✅ **Rangoli Decorations**: Vibrant Indian-inspired visual elements
- ✅ **Deployment Ready**: Configured for autoscale production deployment
- ✅ **Performance Optimized**: Lazy loading, responsive images, smart caching

## Tech Stack
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 6 (requires Node 22+)
- **Styling:** Tailwind CSS with custom Indian-inspired palette
- **Animations:** Framer Motion
- **Data Fetching:** React Query (TanStack Query)
- **UI Components:** Headless UI (WCAG AA accessible)
- **Authentication:** @react-oauth/google (Google Identity Services)
- **CSV Parsing:** PapaParse
- **Data Source:** Google Sheets (public API) or local CSV files
- **Database:** PostgreSQL (for future comment storage)

## Project Structure
```
├── src/
│   ├── components/        # React components
│   │   ├── Navbar.tsx    # Glass-morphism navbar with language toggle, Google Sign-In & theme
│   │   ├── LanguageToggle.tsx # 🌐 EN|FR language switcher (Google Translate)
│   │   ├── Hero.tsx      # Animated landing with rangoli decorations
│   │   ├── Section.tsx   # Configurable content sections with background images
│   │   ├── Card.tsx      # Individual content cards (4-column grid, borders)
│   │   ├── CardModal.tsx # Accessible detail modal (Headless UI)
│   │   ├── GoogleAuth.tsx # Google Sign-In component with One Tap
│   │   ├── CommentBox.tsx # Floating feedback/suggestion box
│   │   └── Footer.tsx    # Footer with gradient accents
│   ├── config/
│   │   └── site.config.ts # All site configuration (sections, sheets, branding)
│   ├── hooks/
│   │   └── useTheme.ts   # Light/dark theme management
│   ├── lib/
│   │   └── sheets.ts     # Google Sheets fetching + caching
│   ├── types/
│   │   └── index.ts      # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles + Tailwind config
├── public/
│   └── data/             # CSV fallback files (7 files)
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration (port 5000, host 0.0.0.0)
├── tailwind.config.js    # Custom Indian color palette
├── .env.example          # Environment variable template
└── package.json          # Dependencies
```

## Key Configuration

### Development Server
- **Port:** 5000 (configured in vite.config.ts)
- **Host:** 0.0.0.0 (allows Replit proxy)
- **Dev Command:** `npm run dev`
- **Build Command:** `npm run build`
- **Preview:** `npm run preview`

### Deployment
- **Type:** Autoscale (serverless SPA)
- **Build:** `npm run build`
- **Output:** `dist/` directory
- **Preview:** `npx vite preview --host=0.0.0.0 --port=5000`

## Content Management

### Google Sheets Integration
- **How it works:** Fetches public Google Sheets via CSV export API
- **Caching:** 5-minute in-memory cache per section
- **Fallback:** Uses local CSV files if sheet URL is empty
- **Configuration:** All in `src/config/site.config.ts`

### Adding Content Sections
Simply edit `src/config/site.config.ts` - no code changes needed:

```typescript
sections: [
  {
    id: 'new-section',
    title: 'New Section',
    emoji: '🎨',
    description: 'Description here',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/...',
    enabled: true,
    fieldMappings: {
      title: ['title', 'name'],
      description: ['description', 'summary'],
      image: ['image', 'photo'],
      link: ['url', 'link'],
    },
  }
]
```

## Design System

### Color Palette (Indian Modern)
- **Saffron:** Primary accent (#f97316)
- **Peacock Blue:** Secondary accent (#0ea5e9)
- **Turmeric Gold:** Highlights (#eab308)
- **Marigold:** Warm tones (#f97316)
- **Indigo:** Deep accents (#6366f1)

### Typography
- **Display:** Great Vibes (cursive, hero sections)
- **Headings:** Playfair Display (serif)
- **Artistic:** Cormorant Garamond (serif, hero byline, buttons, section tabs)
- **Body:** Inter (sans-serif)

### Components
- **Glass Morphism:** Navbar with backdrop blur
- **Gradient Text:** Multi-color gradients for headings
- **Smooth Animations:** Framer Motion for page transitions
- **Accessible Modals:** Headless UI with keyboard navigation
- **Responsive Grid:** 1/2/3 columns based on viewport

## Features

### User Experience
- ✅ Sticky glass navbar with smooth scrolling
- ✅ Language toggle (EN/FR) using Google Translate widget
- ✅ Theme toggle (light/dark with localStorage persistence)
- ✅ Global search across all sections
- ✅ Load more pagination (configurable cards per page)
- ✅ Click images to open external links
- ✅ Click cards to view metadata modal
- ✅ Keyboard accessible throughout

### Performance
- ✅ Lazy image loading with IntersectionObserver
- ✅ React Query smart caching
- ✅ Vite code splitting
- ✅ Production optimized builds
- ✅ Responsive image loading

### SEO & Accessibility
- ✅ Meta tags in index.html
- ✅ Open Graph tags
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation
- ✅ Screen reader friendly

## Development Workflow

1. **Start dev server:** `npm run dev`
2. **Edit code:** Changes hot-reload instantly via Vite HMR
3. **Configure content:** Edit `src/config/site.config.ts`
4. **Add Google Sheets:** Paste public sheet URLs in config
5. **Test:** Browse to localhost:5000
6. **Build:** `npm run build` → creates optimized `dist/`
7. **Deploy:** Click "Deploy" button in Replit

## Environment Variables

Create `.env` from `.env.example` to use environment-based config:

```bash
VITE_SHEET_NEWS=https://docs.google.com/spreadsheets/d/.../edit#gid=0
VITE_SHEET_BOLLYWOOD=...
VITE_SITE_TITLE=Experience India
VITE_LOGO_URL=https://your-logo-url.com/logo.png
```

## Sections (Configurable)
All sections pull from Google Sheets or CSV:
- 📰 News
- 🎬 Bollywood
- 🍛 Restaurants
- 🍲 Recipes
- 🎭 Events
- 📚 Resources
- 💬 PeopleSpeak (community testimonials and stories)

## Migration Notes

### What Changed (Nov 1, 2025)
- ❌ **Removed:** Eleventy, Flask, Nunjucks, old static files
- ✅ **Added:** React, TypeScript, Vite, Tailwind, Framer Motion
- ✅ **Upgraded:** Node 18 → Node 22 (required for Vite 6)
- ✅ **New Features:** Live Google Sheets, theme toggle, search, modals
- ✅ **Design:** Complete visual redesign with Indian-modern aesthetics

### Why React?
- Modern, component-based architecture
- Easy to add new sections without touching code
- Rich ecosystem (React Query, Framer Motion, Headless UI)
- Better performance and user experience
- Type-safe with TypeScript

## Documentation
- **README.md** - Full setup guide, deployment instructions
- **SETUP.md** - Step-by-step Google Sheets configuration
- **.env.example** - Environment variable template

## Support
For questions or issues:
- Email: mridul.malani@hec.edu
- Check README.md for detailed instructions
- See SETUP.md for Google Sheets configuration
