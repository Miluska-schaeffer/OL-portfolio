# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Development Workflow

### Commands
- **`npm run dev`** – Start Vite dev server (opens at `http://localhost:5173` by default, though vite.config.js specifies port 3000)
- **`npm run build`** – Build for production to `/dist` directory (uses Terser minification)
- **`npm run preview`** – Preview production build locally

### Build Details
- **Minification:** Terser (configured in vite.config.js)
- **Output:** `/dist` directory
- **Entry point:** `index.html`
- **Dev watches for changes:** `usePolling: true` in vite.config.js

---

## Architecture Overview

### Stack
- **HTML5:** Semantic structure, single-page layout
- **CSS3:** Mobile-first responsive, CSS variables for design tokens
- **JavaScript:** Vanilla (no frameworks), ~1KB of interaction logic
- **Build tool:** Vite 5.0
- **No external dependencies** except Google Fonts (Strait typeface)

### Core Files
- **`index.html`** – Single entry point; contains all page structure
- **`style.css`** – All styles (~20KB unminified); mobile-first approach
- **`main.js`** – Text animations, smooth scroll behavior, tooltip interactions
- **`vite.config.js`** – Build and dev server configuration

### Asset Structure
```
public/assets/
├── favicon.svg       # Black square with white initials
└── backdrop3.png     # Full-page background image (CSS `background-image`)
```

**Important:** SVG assets in `/public/assets/` must be explicitly `git add`'ed or Vercel deployments will fail to include them.

---

## Layout & Responsive Design

### Mobile-First Approach
Default (0–1199px): Single column, all content stacks vertically.
Desktop (1200px+): Two-column asymmetric grid.

### Responsive Breakpoints
- **Mobile:** 0–767px
- **Tablet:** 768px–1199px  
- **Desktop:** 1200px+ (`@media (min-width: 1200px)`)

The 1200px breakpoint is the only media query for layout changes.

### Grid Layout
**Mobile/Tablet:**
```css
.layout-wrapper {
  display: grid;
  grid-template-columns: 1fr;  /* Single column */
  gap: var(--space-md);
}
```

**Desktop:**
```css
.layout-wrapper {
  grid-template-columns: minmax(450px, 1fr) minmax(500px, 2fr);
}
.card-right {
  margin-top: var(--space-lg);  /* Aligns with left column */
}
```

See [RESPONSIVE.md](./RESPONSIVE.md) for detailed responsive design documentation.

---

## CSS Design System

### Color Palette (CSS Variables)
```css
--color-bg: #F5F5F5         /* Background */
--color-text: #2C2C2C       /* Primary text */
--color-accent: #BBBBBB     /* Accents & borders */
--color-white: #FFFFFF      /* Highlights */
```

### Typography (CSS Variables)
```css
--font-primary: 'Strait', sans-serif
--fs-h1: clamp(2.5rem, 5vw, 4rem)       /* Responsive H1 */
--fs-body: clamp(0.95rem, 2vw, 1rem)    /* Responsive body */
```

### Spacing Scale
Variables like `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl` define consistent padding/margins throughout.

---

## Interactive Features

### Text Animations
Located in `main.js`:
- **Letter-by-letter fade animations** on H1/H2 elements
- Uses `splitIntoLetters()` function with configurable stagger timing
- `LETTER_STAGGER` (65ms) and `LETTER_DURATION` (1000ms) control animation speed
- Each letter wrapped in `<span class="letter-wrapper">` with transition delays

### Smooth Scrolling
Anchor links trigger smooth scroll to target elements (excludes back-to-top link).

### Tooltips
- **Email & social links** have CSS `::before` tooltips
- Positioned on the right side (`top: -5px`, `left: calc(100% + 10px)`)
- Use `data-tooltip` attribute for content (e.g., `data-tooltip="LinkedIn"`)
- **Z-index handling:** Tooltips on social links use `z-index: 10` to appear above neighboring icons

---

## Common Tasks & Patterns

### Updating Content
Edit `index.html` directly—all content is in markup. No templating system.

### Adding New Links/Sections
1. Add HTML in `index.html`
2. Add CSS styling to `style.css` (use existing design tokens)
3. If interactive, add event listener in `main.js`

### Testing Responsive Design
- **Desktop (1200px+):** Two-column layout
- **Tablet (768px–1199px):** Single column, increased padding
- **Mobile (0–767px):** Single column, reduced padding

Use browser dev tools to test at breakpoints.

### Deployment
Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for pushing to GitHub and deploying to Vercel.

---

## Important Notes

### Git & Assets
- Always `git add` SVG/image files in `/public/assets/` explicitly, or Vercel won't include them
- Use `git status` to verify assets are staged before pushing

### Vite Config
- Dev server uses polling (`usePolling: true`) for better compatibility across systems
- Build uses Terser minification; no source maps in production

### Port Mismatch
- vite.config.js specifies port 3000, but Vite's default is 5173
- The actual dev server may run on 5173 unless configuration is strictly honored

### No Build or Test Step
This is a simple portfolio—no build tests or linting setup. Verify changes manually in the browser.
