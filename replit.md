# HEC ExperienceIndia - Replit Setup

## Overview
This is a cultural discovery platform for HEC Paris students to explore Indian culture, food, cinema, and events. The site is built using **Eleventy (11ty)**, a static site generator with Nunjucks templating.

## Project Status
- ✅ Eleventy static site generator configured and running
- ✅ Development server running on port 5000 with 0.0.0.0 host
- ✅ Deployment configuration set for production (autoscale)
- ✅ All CSV data files in `/data` directory
- ✅ Static assets (CSS, JS) properly configured

## Tech Stack
- **Frontend:** Eleventy (11ty) v3.1.2 with Nunjucks templating
- **Data:** CSV files (news, bollywood, restaurants, recipes, events, resources, about)
- **Styling:** Custom CSS with Bootstrap framework
- **Hosting:** Static site built to `_site/` directory
- **Node.js:** v18+

## Project Structure
```
├── _data/              # Eleventy data files (JS modules that parse CSVs)
├── _includes/          # Nunjucks layouts and partials
│   └── base.njk       # Base layout template
├── _site/             # Generated static site (not in git)
├── data/              # CSV data files
├── static/            # CSS, JS, images
├── templates/         # Page templates
│   └── index.html     # Main page template
├── .eleventy.js       # Eleventy configuration
└── package.json       # Node dependencies
```

## Key Configuration

### Eleventy Server
- **Port:** 5000
- **Host:** 0.0.0.0 (allows Replit proxy)
- **Dev Command:** `npm run serve`
- **Build Command:** `npm run build`

### Deployment
- **Type:** Autoscale (static site)
- **Build:** `npm run build`
- **Output:** `_site/` directory

## Content Sections
The site includes these sections (all driven by CSV data):
- 📰 News
- 🎬 Bollywood
- 🍛 Restaurants
- 🍲 Recipes
- 🎭 Events
- 📚 Resources
- ℹ️ About

## Alternative Backend (Not Used)
There's also a Flask backend (`app.py`) in the repository that could serve the same content dynamically, but **Eleventy is the primary/active system** as indicated by the build configuration.

## Development Notes
- The site uses CSV files for all content
- Data is parsed at build time by JS files in `_data/`
- Templates use Nunjucks templating language
- Static assets are copied to `_site/` during build
- Site auto-rebuilds when files change in dev mode

## Recent Setup (Nov 1, 2025)
- Configured Eleventy to serve on 0.0.0.0:5000 for Replit compatibility
- Added .gitignore for node_modules and build artifacts
- Set up dev-server workflow
- Configured deployment for production publishing
