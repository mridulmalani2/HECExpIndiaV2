# Comprehensive UI/UX Patterns Documentation
## Experience India - HEC Paris Cultural Discovery Platform

**Project Type:** React 18 + TypeScript + Tailwind CSS + Framer Motion  
**Build Tool:** Vite  
**Theme System:** Dark Mode with CSS Variables  
**Styling Approach:** Tailwind CSS + Custom CSS Classes + Framer Motion

---

## QUICK REFERENCE

### Key Files by Category

**Theme & Dark Mode:**
- `/src/hooks/useTheme.ts` - Dark mode toggle logic
- `/src/index.css` (lines 7-40) - CSS variables for theming

**Components:**
- `/src/components/Card.tsx` - Card component with animations
- `/src/components/CardModal.tsx` - Modal implementation
- `/src/components/Section.tsx` - Section with background images
- `/src/components/Hero.tsx` - Hero with decorative backgrounds
- `/src/components/Navbar.tsx` - Navbar with glass effect
- `/src/components/CommentBox.tsx` - Floating comment modal

**Styling:**
- `/src/index.css` - Global styles and Tailwind layers
- `/tailwind.config.js` - Tailwind configuration
- `/postcss.config.js` - PostCSS plugins

---

## 1. BACKGROUND IMAGE USAGE & TRANSPARENCY

### Section Background with Parallax Overlay
**File:** `src/components/Section.tsx` (lines 104-124)

```typescript
<section 
  id={section.id} 
  className="section-padding relative"
  style={{
    backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',  // Parallax effect
  }}
>
  {/* Overlay with gradient transparency */}
  {section.backgroundImage && (
    <div 
      className="absolute inset-0 bg-gradient-to-b from-white/[0.81] via-white/[0.84] to-white/[0.81] dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95"
    />
  )}
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Content here */}
  </div>
</section>
```

**Key Techniques:**
- **Background Attachment:** `fixed` creates parallax scrolling
- **Overlay Technique:** Semi-transparent gradient from white (light) to gray-900 (dark)
- **Opacity Values:** Light mode uses 81-84%, dark mode uses 90-95%
- **Content Positioning:** `relative z-10` ensures content appears above overlay

### Hero Section with Animated Decorative Backgrounds
**File:** `src/components/Hero.tsx` (lines 31-42)

```css
/* Base gradient */
.bg-gradient-to-br from-saffron-50 via-peacock-50 to-indigo-50 
  dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950

/* Decorative floating circles */
.opacity-35 dark:opacity-40
.bg-gradient-to-br from-saffron-500 to-orange-400 
  dark:mix-blend-screen
.blur-3xl 
.animate-pulse
```

**Features:**
- Multiple layered gradients for depth
- Blend modes: `mix-blend-multiply` (light), `mix-blend-screen` (dark)
- Staggered pulse animations with `animationDelay`

### Card Image Hover Reveal Effect
**File:** `src/index.css` (lines 231-305)

```css
.hover-reveal-card img {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  object-fit: cover;
}

.hover-reveal-card:hover img {
  transition-delay: 400ms;        /* Delay before effect starts */
  object-fit: contain !important; /* Reveal full image */
  transform: scale(0.95);         /* Subtle scale down */
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
}

/* Overlay appears on hover */
.hover-reveal-card::after {
  background: linear-gradient(180deg, 
    transparent 0%, 
    transparent 70%, 
    rgba(0,0,0,0.7) 100%
  );
  opacity: 0;
  transition: opacity 300ms ease;
  transition-delay: 400ms;
}

.hover-reveal-card:hover::after {
  opacity: 1;
}
```

**Timing Strategy:**
- 400ms delay before image reveal (poster display effect)
- No delay on exit (instant reset)
- Separate overlay animation coordinates with image

---

## 2. DARK VS LIGHT MODE IMPLEMENTATION

### Theme Hook with Persistence
**File:** `src/hooks/useTheme.ts`

```typescript
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // 1. Check localStorage first
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    
    // 2. Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light'
  })

  useEffect(() => {
    // Apply theme to root element
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    // Persist preference
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, toggleTheme }
}
```

**Implementation Details:**
- CSS class-based approach (Tailwind's `darkMode: 'class'`)
- Reads from localStorage, falls back to system preference
- Toggles `.dark` class on `<html>` element

### CSS Variables for Dynamic Theming
**File:** `src/index.css` (lines 7-40)

```css
:root {
  /* Light Mode (default) */
  --color-bg-primary: 255 255 255;      /* White */
  --color-text-primary: 17 24 39;       /* Dark gray */
  --color-accent: 249 115 22;           /* Saffron */
  
  /* Shadow elevation */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Glassmorphism */
  --glass-blur: 12px;
  --glass-bg-light: rgba(255, 255, 255, 0);
  --glass-border-light: rgba(255, 255, 255, 0.25);
  --glass-shadow-light: 0 4px 20px rgba(0, 0, 0, 0.10);
}

.dark {
  /* Dark Mode */
  --color-bg-primary: 17 24 39;         /* Dark gray */
  --color-text-primary: 243 244 246;    /* Light gray */
  --color-accent: 251 146 60;           /* Lighter saffron */
  
  /* Dark mode glass values */
  --glass-bg-dark: rgba(32, 33, 42, 0.12);
  --glass-border-dark: rgba(255, 255, 255, 0.15);
  --glass-shadow-dark: 0 4px 20px rgba(0, 0, 0, 0.30);
}
```

**Benefits:**
- Single place to update all theme colors
- RGB color space allows flexible alpha application
- Semantic naming (primary, secondary, accent)

### Component-Level Dark Mode Usage
**File:** `src/components/Card.tsx`

```typescript
{/* Title with dark mode support */}
<h3 className="text-gray-900 dark:text-gray-100 
               group-hover:text-saffron-600 dark:group-hover:text-saffron-400
               transition-colors">
  {card.title}
</h3>

{/* Border that adjusts in dark mode */}
<div className="border-t border-gray-200 dark:border-gray-700">
```

**Pattern:**
- Light color by default, dark variant with `dark:` prefix
- Accent color changes for readability (saffron-600 light, saffron-400 dark)
- All color transitions use `transition-colors`

### Browser Support & Fallbacks
**File:** `src/index.css` (lines 198-224)

```css
/* Media query approach (respects system preference) */
@media (prefers-color-scheme: dark) {
  .card {
    background-color: var(--glass-bg-dark);
    border-color: var(--glass-border-dark);
  }
}

/* Class-based approach (user selection) */
.dark .card {
  background-color: var(--glass-bg-dark);
  border-color: var(--glass-border-dark);
}

/* Fallback for no backdrop-filter support */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .card {
    background-color: rgba(255, 255, 255, 0.70);
  }
  .dark .card {
    background-color: rgba(32, 33, 42, 0.70);
  }
}
```

---

## 3. MODAL & CARD MODALITIES

### Full-Featured Modal Component
**File:** `src/components/CardModal.tsx`

```typescript
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'

export function CardModal({ card, isOpen, onClose }: CardModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        
        {/* Backdrop animation */}
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal panel with scale animation */}
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
        >
          <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-800">
            
            {/* Close button with glassmorphism */}
            <button className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              {/* SVG close icon */}
            </button>

            {/* Image section with aspect ratio */}
            {card.image && (
              <div className="aspect-[16/9] overflow-hidden">
                <img src={card.image} alt={card.title} />
              </div>
            )}

            {/* Content section */}
            <div className="p-6 sm:p-8">
              <Dialog.Title className="text-3xl font-serif font-bold">
                {card.title}
              </Dialog.Title>
              {/* Additional content */}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
```

**Key Features:**
- Accessibility: Built on Headless UI's Dialog
- Staggered animations: Backdrop fades, panel scales
- Asymmetric timing: 300ms enter, 200ms leave
- Dark mode: Full support with `dark:` classes

### Card Component with Framer Motion
**File:** `src/components/Card.tsx`

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-50px' }}
  transition={{ duration: 0.4, delay: index * 0.05 }}
  whileHover={{ y: -8, scale: 1.03 }}
  className="card hover-reveal-card overflow-hidden group h-full flex flex-col"
  onClick={() => onCardClick(card)}
>
  {/* Image wrapper with aspect ratio */}
  <div className="card-image-wrapper aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
    {!imageLoaded && <LoadingSpinner />}
    <img
      src={card.image}
      loading="lazy"
      className="smart-crop w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
    />
  </div>

  {/* Text content */}
  <div className="card-content p-5 flex-1 flex flex-col">
    <h3 className="line-clamp-2 group-hover:text-saffron-600">{card.title}</h3>
    <p className="line-clamp-3 flex-1">{card.description}</p>
  </div>
</motion.div>
```

**Features:**
- View-based animations: Triggers when card enters viewport
- Staggered timing: Each card delays by `index * 0.05`
- Hover effects: 8px upward movement + 3% scale
- Smart image loading: Lazy loading with placeholder

### Floating Comment Modal
**File:** `src/components/CommentBox.tsx`

```typescript
<>
  {/* Floating action button */}
  <motion.button
    className="fixed bottom-6 right-6 bg-gradient-to-r from-saffron-500 to-marigold-500 rounded-full p-4"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {/* Message icon */}
  </motion.button>

  {/* Modal with AnimatePresence */}
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6"
        >
          {/* Form content */}
        </motion.div>
      </>
    )}
  </AnimatePresence>
</>
```

---

## 4. FROSTED GLASS & GLASSMORPHISM EFFECTS

### Glass Component Classes
**File:** `src/index.css` (lines 56-74)

```css
@layer components {
  /* Simple glass variant */
  .glass {
    @apply bg-white/80 dark:bg-gray-900/80 backdrop-blur-md;
  }

  /* Full card glass effect */
  .card {
    background-color: var(--glass-bg-light);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border-light);
    box-shadow: var(--glass-shadow-light);
    border-radius: 16px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 26px rgba(0, 0, 0, 0.15);
  }
}
```

**Properties:**
- **Blur:** 12px (medium strength)
- **Webkit Prefix:** Required for Safari/Chrome compatibility
- **Border Opacity:** 25% white in light mode, 15% in dark
- **Hover Effect:** 3px elevation with enhanced shadow

### Dynamic Navbar Glass Effect
**File:** `src/components/Navbar.tsx` (lines 40-47)

```typescript
<motion.nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'glass shadow-lg border-b border-gray-200/50 dark:border-gray-700/50'
      : 'bg-transparent'
  }`}
>
```

**Behavior:**
- No glass effect on page load
- Glass effect appears when `scrollY > 20`
- Smooth 300ms transition
- Border becomes visible when glass is active

### Search Bar with Glass Effect
**File:** `src/App.tsx` (lines 26-64)

```typescript
<div className="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
  <input
    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-saffron-500"
  />
</div>
```

**Features:**
- Sticky positioning at top
- Full glass effect container
- Non-glass input for clarity
- Saffron focus ring

### Modal Close Button Glass Effect
**File:** `src/components/CardModal.tsx` (lines 43-50)

```typescript
<button
  className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 transition-colors"
>
```

**Details:**
- Higher opacity: 90% (more visible than background)
- Subtle blur: `backdrop-blur-sm` (4px)
- Hover becomes fully opaque

### Browser Compatibility & Fallback
**File:** `src/index.css` (lines 212-224)

```css
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .card {
    background-color: rgba(255, 255, 255, 0.70);
  }
  .dark .card {
    background-color: rgba(32, 33, 42, 0.70);
  }
}
```

---

## 5. COLOR SCHEMES & TYPOGRAPHY

### Indian-Inspired Color Palette
**File:** `tailwind.config.js` (lines 10-72)

```javascript
colors: {
  saffron: {     // Primary - Traditional orange
    500: '#f97316',
    600: '#ea580c',
  },
  peacock: {     // Accent - Royal blue
    500: '#0ea5e9',
    400: '#38bdf8',
  },
  turmeric: {    // Golden - Spice color
    500: '#eab308',
    600: '#ca8a04',
  },
  marigold: {    // Orange - Festival color
    500: '#f97316',
  },
  indigo: {      // Purple - Depth
    500: '#6366f1',
    600: '#4f46e5',
  },
}
```

**Usage:**
- **Primary:** Saffron-500 for main brand elements
- **Hover:** Saffron-600 for interactive states
- **Accents:** Peacock blue for contrast
- **Dark Mode:** Lighter saffron (251 146 60) for readability

### Typography System
**File:** `tailwind.config.js` (lines 73-77)

```javascript
fontFamily: {
  serif: ['Playfair Display', 'Georgia', 'serif'],      // Headings
  sans: ['Inter', 'system-ui', 'sans-serif'],          // Body text
  display: ['Great Vibes', 'cursive'],                 // Special
},
```

**Font Imports:** `src/index.css` (line 1)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=Great+Vibes&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
```

**Font Weights:**
- Inter: 300, 400, 500, 600, 700
- Playfair Display: 400, 500, 600, 700, 800
- Cormorant Garamond: 300-700 (for special styling)

### Custom Typography Classes
**File:** `src/index.css` (lines 102-114)

```css
.hero-byline {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-size: 1.375rem;      /* 22px */
  letter-spacing: 0.025em;
  line-height: 1.6;
}

.section-tab {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}
```

### Gradient Text
**File:** `src/index.css` (lines 94-96)

```css
.gradient-text {
  @apply bg-gradient-to-r from-saffron-500 via-marigold-500 to-turmeric-500 
         bg-clip-text text-transparent;
}
```

---

## 6. SPACING & LAYOUT PATTERNS

### Responsive Section Padding
**File:** `src/index.css` (lines 98-100)

```css
.section-padding {
  @apply px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24;
}
```

**Breakpoints:**
- Mobile: `px-4 py-16`
- Tablet (sm): `px-6 py-20`
- Desktop (lg): `px-8 py-24`

### Container & Grid Layout
**Pattern used throughout:**

```typescript
{/* Container */}
<div className="max-w-7xl mx-auto px-4">
  
  {/* Card grid - responsive columns */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    {/* Cards */}
  </div>
</div>
```

**Layout Details:**
- Max width: 1280px (max-w-7xl)
- Responsive columns: 1 → 2 → 3 → 4
- Gap: 20px (gap-5)
- Horizontal padding: 16px responsive

### Aspect Ratios
**Used in components:**

```css
aspect-[4/3]      /* Card images - standard ratio */
aspect-[16/9]     /* Modal images - widescreen */
h-32              /* Hero thumbnails - 128px */
```

### Flexbox Patterns

```css
flex flex-col                 /* Column layout */
flex-1                        /* Grow to fill */
gap-2, gap-4, gap-8          /* Spacing */
items-center justify-center   /* Center content */
mt-auto                       /* Push to bottom */
flex-1 flex flex-col         /* Fill height with column layout */
```

---

## 7. ANIMATION & TRANSITION EFFECTS

### Tailwind Animation Configuration
**File:** `tailwind.config.js` (lines 78-96)

```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in',
  'slide-up': 'slideUp 0.5s ease-out',
  'scale-in': 'scaleIn 0.3s ease-out',
},
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  slideUp: {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  scaleIn: {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
},
```

### Card Entrance Animations
**File:** `src/components/Card.tsx` (lines 34-39)

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-50px' }}
  transition={{ duration: 0.4, delay: index * 0.05 }}
  whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
>
```

**Details:**
- **Initial:** Invisible, 20px below
- **Trigger:** When card enters viewport
- **Timing:** 0.4s per card
- **Stagger:** 50ms between cards (index * 0.05)
- **Hover:** Moves up 8px, scales to 1.03x

### Hero Section Progressive Reveal
**File:** `src/components/Hero.tsx` (lines 45-48, 65-68, 94-97)

```typescript
{/* Title - 0s delay */}
<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

{/* Buttons - 0.2s delay */}
<motion.div transition={{ duration: 0.8, delay: 0.2 }}>

{/* Thumbnails - 0.5s delay, then staggered */}
<motion.div transition={{ duration: 1, delay: 0.5 }}>
  {items.map((item, index) => (
    <motion.a transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }} />
  ))}
</motion.div>
```

### Hover Reveal Timing
**File:** `src/index.css` (lines 244-262)

```css
.hover-reveal-card img {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-reveal-card:hover img {
  transition-delay: 400ms;  /* Wait 400ms before effect */
  object-fit: contain;
  transform: scale(0.95);
}

.hover-reveal-card:not(:hover) img {
  transition-delay: 0ms;    /* Instant exit */
}
```

**Timing Strategy:**
- Entry: 400ms delay (poster reveal effect)
- Exit: No delay (instant reset)
- Duration: 300ms for the actual animation

### Modal Animations
**File:** `src/components/CardModal.tsx` (lines 18-40)

```typescript
{/* Backdrop - simple fade */}
<Transition.Child
  enter="ease-out duration-300"
  enterFrom="opacity-0"
  enterTo="opacity-100"
  leave="ease-in duration-200"
>
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
</Transition.Child>

{/* Panel - fade + scale */}
<Transition.Child
  enter="ease-out duration-300"
  enterFrom="opacity-0 scale-95"
  enterTo="opacity-100 scale-100"
  leave="ease-in duration-200"
>
  <Dialog.Panel />
</Transition.Child>
```

**Timing:**
- Entry: 300ms ease-out
- Exit: 200ms ease-in
- Scale: 95% → 100%

### Easing Functions

```javascript
cubic-bezier(0.4, 0, 0.2, 1)  /* Natural motion curve */
ease-in                        /* Accelerating */
ease-out                       /* Decelerating */
ease-in-out                    /* Smooth entry/exit */
linear                         /* Constant speed */
```

---

## 8. COMPONENT STYLING PATTERNS

### Button Styles
**File:** `src/index.css` (lines 76-92)

```css
.btn {
  @apply px-6 py-3 rounded-lg font-medium transition-all duration-200 
         focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-[rgb(var(--color-accent))] text-white 
         hover:bg-[rgb(var(--color-accent-hover))] 
         focus:ring-saffron-500;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.btn-secondary {
  @apply bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
         hover:bg-gray-300 dark:hover:bg-gray-600;
}
```

**Features:**
- CSS variables for accent color
- 2px focus ring with offset
- Custom font and letter-spacing
- Dark mode support

### Input Styling
**File:** `src/components/CommentBox.tsx` (lines 99-121)

```typescript
<input
  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
             focus:ring-2 focus:ring-saffron-500 focus:border-transparent 
             transition-all"
/>

<textarea
  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
             focus:ring-2 focus:ring-saffron-500 focus:border-transparent 
             transition-all resize-none"
/>
```

**Details:**
- Consistent padding: 4-2
- Border responsive to theme
- Focus ring: saffron with transparent border
- Textarea: `resize-none` to prevent user resizing

### Text Truncation
**Pattern used throughout:**

```css
line-clamp-2    /* Max 2 lines with ellipsis */
line-clamp-3    /* Max 3 lines with ellipsis */
```

**Used in:**
- Card titles (2 lines)
- Card descriptions (3 lines)

### Loading Skeleton
**File:** `src/components/Section.tsx` (lines 48-57)

```typescript
{[...Array(8)].map((_, i) => (
  <div key={i} className="card h-96 animate-pulse border-2 border-gray-200 dark:border-gray-700">
    <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
    <div className="p-5 space-y-3">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
    </div>
  </div>
))}
```

**Features:**
- Pulse animation for loading
- Placeholder shapes mimicking content
- Dark mode color adjustment
- 8 skeletons (shows grid pattern)

### Custom Scrollbar
**File:** `src/index.css` (lines 140-154)

```css
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-900;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-700 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-600;
}
```

---

## 9. CSS CONFIGURATION & SETUP

### Tailwind Configuration
**File:** `tailwind.config.js`

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',              // Class-based (not media query)
  theme: {
    extend: {
      colors: { /* Custom palette */ },
      fontFamily: { /* Custom fonts */ },
      animation: { /* Custom keyframes */ },
    },
  },
  plugins: [],
}
```

**Key Settings:**
- Content paths scan for class usage
- `darkMode: 'class'` enables manual toggle
- Extend preserves Tailwind defaults
- No plugins (pure Tailwind + custom CSS)

### PostCSS Configuration
**File:** `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},   // Generates utility classes
    autoprefixer: {},  // Adds vendor prefixes
  },
}
```

### CSS Layer Organization
**File:** `src/index.css`

```css
@import url('...');          /* Google Fonts */

@tailwind base;              /* Tailwind base */
@tailwind components;        /* Component classes */
@tailwind utilities;         /* Utility classes */

@layer base { /* ... */ }    /* Custom CSS variables */
@layer components { /* ... */ } /* Custom classes */
@layer utilities { /* ... */ }  /* Custom utilities */
```

**Specificity Order:**
1. Base (lowest)
2. Components
3. Utilities
4. Regular CSS (highest)

### Vite Configuration
**File:** `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

---

## IMPLEMENTATION CHECKLIST FOR REPLICATION

### To use these patterns in another project:

1. **Install Dependencies:**
   ```bash
   npm install tailwindcss postcss autoprefixer framer-motion @headlessui/react
   ```

2. **Copy Configuration:**
   - `tailwind.config.js` - Color palette and animations
   - `postcss.config.js` - PostCSS setup
   - `vite.config.ts` - Build configuration

3. **Copy Global Styles:**
   - `src/index.css` - All CSS variables and custom classes

4. **Create Theme Hook:**
   - `src/hooks/useTheme.ts` - Dark mode toggle logic

5. **Setup Components:**
   - Card component with hover effects
   - Modal with Headless UI
   - Navbar with dynamic glass effect
   - Hero with decorative backgrounds

6. **Key Files to Reference:**
   - `src/components/Card.tsx` - Card structure
   - `src/components/CardModal.tsx` - Modal pattern
   - `src/components/Hero.tsx` - Hero background
   - `src/components/Section.tsx` - Section with overlay

---

## SUMMARY OF UNIQUE PATTERNS

| Pattern | Location | Key Feature |
|---------|----------|------------|
| **Hover Reveal** | `index.css:231-305` | 400ms delay, object-fit transition |
| **Dark Mode** | `useTheme.ts` | localStorage + system preference fallback |
| **Glassmorphism** | `index.css:56-74` | CSS variables with fallback |
| **Card Animations** | `Card.tsx:34-39` | View-based with stagger |
| **Modal** | `CardModal.tsx` | Staggered backdrop + panel |
| **Hero Backgrounds** | `Hero.tsx:31-42` | Layered gradients + blend modes |
| **Section Overlay** | `Section.tsx:116-124` | Fixed background + semi-transparent overlay |
| **Color System** | `tailwind.config.js:10-72` | Indian-inspired palette with 10 shades |

All patterns are documented with line numbers for easy reference and modification.
