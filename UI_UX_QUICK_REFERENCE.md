# UI/UX Patterns - Quick Reference Guide
## Experience India - Complete Pattern Library

---

## PATTERN QUICK LOOKUP TABLE

### 1. BACKGROUND IMAGE & TRANSPARENCY PATTERNS

| Pattern | Location | Code Snippet | Purpose |
|---------|----------|---|---------|
| **Parallax Section Background** | `Section.tsx:104-124` | `backgroundAttachment: 'fixed'` | Creates parallax scrolling effect with semi-transparent overlay |
| **Gradient Overlay (Light)** | `Section.tsx:120` | `from-white/[0.81]` | 81% white overlay for light mode |
| **Gradient Overlay (Dark)** | `Section.tsx:120` | `dark:from-gray-900/95` | 95% dark overlay for dark mode |
| **Hero Decorative Gradients** | `Hero.tsx:31-42` | `mix-blend-multiply/screen` | Layered animated background circles |
| **Card Image Placeholder** | `Card.tsx:43` | `bg-gradient-to-br` | Loading state background |
| **Hover Reveal Card** | `index.css:231-305` | `transition-delay: 400ms` | Poster reveal on hover with 400ms delay |
| **Image Overlay Gradient** | `index.css:277-298` | `::after` pseudo-element | Dark gradient overlay on hover |

---

### 2. DARK MODE & THEME PATTERNS

| Pattern | Location | Implementation | Notes |
|---------|----------|---|---------|
| **Theme Toggle Hook** | `useTheme.ts` | localStorage + system preference | Reads localStorage, falls back to `prefers-color-scheme` |
| **CSS Variables - Light** | `index.css:8-29` | `:root` selector | 20+ variables for light mode |
| **CSS Variables - Dark** | `index.css:31-40` | `.dark` class selector | Overrides for dark mode |
| **Component Dark Classes** | `Card.tsx:77` | `dark:text-gray-100` | Tailwind's `dark:` prefix |
| **Glass Dark Mode** | `index.css:206-210` | `.dark .card` | Dark mode glass styling |
| **Feature Detection** | `index.css:212-224` | `@supports not (...)` | Fallback for no backdrop-filter |

---

### 3. MODAL & CARD PATTERNS

| Component | File | Key Features | Animation |
|-----------|------|---|---------|
| **Card Modal** | `CardModal.tsx` | Headless UI Dialog, aspect-16/9 image, metadata grid | Staggered backdrop + scale-95→100 |
| **Card Component** | `Card.tsx` | Aspect-4/3, smart crop, emoji fallback, text truncate | View-based fade-in + stagger |
| **Comment Modal** | `CommentBox.tsx` | Floating FAB, form inputs, success state | AnimatePresence with scale |
| **Floating Button** | `CommentBox.tsx` | Gradient from saffron to marigold, fixed positioning | scale 1.1 on hover, 0.9 on tap |
| **Search Bar Modal** | `App.tsx:26-64` | Sticky positioning, glass effect, saffron focus ring | Inline component, no animation |

---

### 4. GLASSMORPHISM EFFECTS

| Effect | Location | CSS Properties | Browser Support |
|--------|----------|---|---------|
| **Glass Class (Simple)** | `index.css:57-59` | `bg-white/80 backdrop-blur-md` | All modern browsers |
| **Card Class (Full)** | `index.css:61-69` | `backdrop-filter: blur(12px)` + `-webkit-` prefix | Chrome, Safari, Edge, Firefox |
| **Dynamic Navbar** | `Navbar.tsx:40-47` | Conditional class application on scroll | Smooth 300ms transition |
| **Modal Close Button** | `CardModal.tsx:43-50` | `bg-white/90 backdrop-blur-sm` | Higher opacity for visibility |
| **Hero Badge** | `Hero.tsx:50-54` | `bg-white/50 backdrop-blur-sm` | Very subtle glass effect |
| **Fallback (No Support)** | `index.css:212-224` | `rgba(255, 255, 255, 0.70)` | Solid background for old browsers |

---

### 5. COLOR SYSTEM REFERENCE

```
SAFFRON (Primary)          PEACOCK (Accent)       TURMERIC (Golden)
50:  #fff7ed              50:  #f0f9ff            50:  #fefce8
100: #ffedd5              100: #e0f2fe            100: #fef9c3
200: #fed7aa              200: #bae6fd            200: #fef08a
300: #fdba74              300: #7dd3fc            300: #fde047
400: #fb923c              400: #38bdf8            400: #facc15
500: #f97316 ⭐ PRIMARY  500: #0ea5e9 ⭐ ACCENT 500: #eab308
600: #ea580c              600: #0284c7            600: #ca8a04
700: #c2410c              700: #0369a1            700: #a16207
800: #9a3412              800: #075985            800: #854d0e
900: #7c2d12              900: #0c4a6e            900: #713f12

MARIGOLD (Orange)          INDIGO (Purple)
50:  #fff8ed              50:  #eef2ff
100: #ffedd5              100: #e0e7ff
200: #fed9ab              200: #c7d2fe
300: #fdba74              300: #a5b4fc
400: #fb923c              400: #818cf8
500: #f97316              500: #6366f1
600: #ea580c              600: #4f46e5
700: #c2410c              700: #4338ca
800: #9a3412              800: #3730a3
900: #7c2d12              900: #312e81
```

**Usage:**
- **Text Default:** gray-900 (light), gray-100 (dark)
- **Hover Text:** saffron-600 (light), saffron-400 (dark)
- **Links:** gray-600 → saffron-600 on hover
- **Focus Ring:** saffron-500 always
- **Accents:** peacock-500 for contrast

---

### 6. TYPOGRAPHY SYSTEM

```
FONTS LOADED:
├─ Inter (Body)           300, 400, 500, 600, 700
├─ Playfair Display       400, 500, 600, 700, 800 (Headings)
├─ Great Vibes            400 (Decorative)
└─ Cormorant Garamond     300-700 (Special styling)

TAILWIND ALIASES:
├─ font-serif      → Playfair Display (Headings)
├─ font-sans       → Inter (Body)
└─ font-display    → Great Vibes (Special)

CUSTOM CLASSES:
├─ .hero-byline    → Cormorant Garamond, 1.375rem, 0.025em letter-spacing
├─ .section-tab    → Cormorant Garamond, 600 weight, 0.5px letter-spacing
└─ .gradient-text  → Multi-color gradient text (saffron→marigold→turmeric)
```

---

### 7. SPACING & LAYOUT

```
RESPONSIVE SECTION PADDING:
Mobile (base)   → px-4 py-16
Tablet (sm)     → px-6 py-20
Desktop (lg)    → px-8 py-24

CONTAINER:
max-w-7xl mx-auto           (1280px centered)

GRID LAYOUTS:
1 col (mobile) → 2 cols (tablet) → 3 cols (medium) → 4 cols (desktop)
gap-5 (20px spacing)

FLEXBOX UTILITIES:
gap-2, gap-3, gap-4, gap-8, gap-12
items-center, items-end, items-start
justify-center, justify-between
flex-1 (grow), flex-shrink-0 (no shrink)
mt-auto (push to bottom)
```

---

### 8. ANIMATIONS & TRANSITIONS

```
KEYFRAME ANIMATIONS (Tailwind):
├─ fade-in        0.5s ease-in      (0% opacity:0 → 100% opacity:1)
├─ slide-up       0.5s ease-out     (0% translateY(20px) → 0%)
└─ scale-in       0.3s ease-out     (0% scale(0.95) → 100% scale(1))

CUSTOM KEYFRAMES:
├─ spin-slow      20s linear infinite (decorative rotation)
└─ hover-reveal   300ms cubic-bezier (image poster effect)

FRAMER MOTION PATTERNS:
├─ whileInView           (Trigger on viewport entry)
├─ initial/whileHover    (Hover states)
├─ whileTap              (Click feedback)
└─ AnimatePresence/exit  (Cleanup animations)

TRANSITION DURATIONS:
200ms  (quick, button interactions)
250ms  (medium, glass effects)
300ms  (smooth, modal entrance)
400ms  (delayed, hover reveals)
500ms  (slow, page entrance)
800ms  (very slow, hero section)
1s     (decorative elements)

EASING FUNCTIONS:
ease-in      (accelerating)
ease-out     (decelerating)
ease-in-out  (smooth)
linear       (constant)
cubic-bezier(0.4, 0, 0.2, 1)  (natural motion)
```

---

### 9. COMPONENT-SPECIFIC PATTERNS

#### **Card Component**
```typescript
Structure:
├─ Motion Div (animation wrapper)
├─ Image Wrapper (aspect-[4/3])
│  ├─ Loading Spinner (if loading)
│  └─ Img Tag (lazy load, smart crop)
└─ Content Div
   ├─ Title (line-clamp-2)
   ├─ Description (line-clamp-3, flex-1)
   └─ Footer (border-top with CTA)

Animations:
- Entry: opacity-0 y-20 → opacity-1 y-0 (0.4s)
- Stagger: delay: index * 0.05
- Hover: y-8 scale-1.03 (0.2s)

Interactions:
- Click: Open modal
- Hover: Scale image 1.1x, reveal poster effect
```

#### **Modal Component**
```typescript
Structure:
├─ Dialog (Headless UI)
├─ Backdrop (semi-transparent + blur)
├─ Dialog.Panel
│  ├─ Close Button (glass effect)
│  ├─ Image (aspect-[16/9])
│  ├─ Title
│  ├─ Description
│  ├─ Metadata Grid
│  └─ Action Button
└─ Exit Animation

Animations:
- Backdrop: opacity-0 → opacity-1 (300ms)
- Panel: opacity-0 scale-95 → opacity-100 scale-100 (300ms)
- Exit: Reversed, 200ms duration
```

#### **Navbar Component**
```typescript
Behavior:
- Initial: Transparent background
- On scroll (scrollY > 20): Apply glass effect
- Glass class includes shadow and border

Animations:
- Page load: y-100 → y-0 (instant via initial/animate)
- Transition: 300ms for all properties

Mobile Menu:
- Height-based animation (0 → auto)
- Opacity fade-in/out
```

---

## FILE DEPENDENCY MAP

```
App.tsx (Root)
├─ Navbar.tsx
│  └─ useTheme.ts
├─ Hero.tsx
├─ Section.tsx (Multiple)
│  ├─ Card.tsx (Multiple)
│  │  └─ smartCrop.ts
│  └─ CardModal.tsx
├─ Footer.tsx
└─ CommentBox.tsx

Styling Layer:
├─ index.css (Global)
│  ├─ Google Fonts import
│  ├─ Tailwind directives
│  ├─ CSS variables (:root, .dark)
│  ├─ Custom classes (@layer)
│  └─ Specific selectors
├─ tailwind.config.js
└─ postcss.config.js
```

---

## COPY-PASTE PATTERNS

### Pattern: Section with Background Image
```typescript
<section 
  className="section-padding relative"
  style={{
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.81] via-white/[0.84] to-white/[0.81] dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95" />
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Content */}
  </div>
</section>
```

### Pattern: Glass Effect Container
```typescript
<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6">
  {/* Content */}
</div>
```

### Pattern: Responsive Grid
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
  {/* Items */}
</div>
```

### Pattern: Animated Card Entrance
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-50px' }}
  transition={{ duration: 0.4, delay: index * 0.05 }}
  whileHover={{ y: -8, scale: 1.03 }}
>
  {/* Content */}
</motion.div>
```

### Pattern: Modal with Glass Close Button
```typescript
<button
  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 transition-colors"
>
  {/* Icon */}
</button>
```

### Pattern: Dark Mode Text Colors
```typescript
<h3 className="text-gray-900 dark:text-gray-100 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
  {text}
</h3>
```

---

## BROWSER COMPATIBILITY

| Feature | Chrome | Safari | Firefox | Edge | IE |
|---------|--------|--------|---------|------|-----|
| backdrop-filter | ✅ 76+ | ✅ 9+ | ⚠️ 103+ | ✅ 79+ | ❌ |
| CSS Grid | ✅ 57+ | ✅ 10.1+ | ✅ 52+ | ✅ 16+ | ⚠️ 11 |
| CSS Variables | ✅ 49+ | ✅ 9.1+ | ✅ 31+ | ✅ 15+ | ❌ |
| Flexbox | ✅ 29+ | ✅ 6.1+ | ✅ 18+ | ✅ 11+ | ⚠️ 11 |
| mix-blend-mode | ✅ 41+ | ✅ 8+ | ✅ 32+ | ✅ 79+ | ❌ |
| Tailwind CSS | ✅ All | ✅ All | ✅ All | ✅ All | ❌ |

**Fallbacks:**
- No backdrop-filter → Solid background (70% opacity)
- Old browsers → Basic styling without animations
- Graceful degradation via @supports queries

---

## PERFORMANCE TIPS

1. **Lazy Loading:** Images use `loading="lazy"`
2. **Smart Crop:** Applied only to Bollywood section
3. **Pagination:** 8 cards per page with "Load More"
4. **CSS Variables:** Single-file theme switching
5. **Tailwind:** Purges unused classes in production
6. **Animations:** GPU-accelerated (transform, opacity only)
7. **Focus Visible:** Custom focus ring for accessibility

---

## ACCESSIBILITY CHECKLIST

- ✅ Focus rings (saffron-500, 2px)
- ✅ ARIA labels on buttons (`aria-label`)
- ✅ Semantic HTML (Dialog, Section, Footer)
- ✅ Color contrast (WCAG AA compliant)
- ✅ Keyboard navigation (Tab support)
- ✅ Alt text on images
- ✅ Form labels properly associated
- ✅ Loading states clearly indicated
- ✅ Dark mode for reduced motion option

---

## KEY TAKEAWAYS

**What makes this design system special:**
1. **Indian-Inspired Colors** - Saffron, peacock, turmeric palette
2. **Dual-Mode Architecture** - Seamless light/dark switching
3. **Glass Morphism** - Modern frosted glass effects with fallbacks
4. **Staggered Animations** - Entrance effects create visual flow
5. **Responsive Design** - Mobile-first approach with fluid scaling
6. **Accessibility First** - WCAG compliant with proper focus management
7. **Performance Conscious** - Lazy loading, smart cropping, CSS variables
8. **Type System** - React + TypeScript for maintainability

