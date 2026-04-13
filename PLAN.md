# Pedro Quispe Portfolio – Implementation Plan & Roadmap

## 1. File Structure

```
project-root/
├── package.json                 # Vite + dependencies
├── vite.config.js              # Vite configuration
├── index.html                  # Single-page entry point
├── style.css                   # All styles (no CSS frameworks)
├── main.js                     # Smooth scroll + interaction logic
└── public/
    └── assets/
        ├── backdrop.png        # Hero background (pre-existing)
        ├── profile.jpg         # About section photo
        ├── project-1.jpg       # Portfolio card images
        ├── project-2.jpg
        └── project-3.jpg
```

## 2. CSS Design Tokens

### Color Palette
```css
--color-bg: #202020           /* Main background */
--color-accent: #989898       /* Accent color for borders, hover states */
--color-text: #CCCCCC         /* Primary text */
--color-text-dim: #999999     /* Secondary/dimmed text */
--color-white: #FFFFFF        /* Highlights, pure white */
```

### Typography
```css
--font-primary: 'Mona Sans', sans-serif

/* Font weights */
--fw-regular: 400             /* Body text */
--fw-medium: 500              /* Headings */

/* Font sizes (responsive scale) */
--fs-h1: clamp(2.5rem, 5vw, 4rem)
--fs-h2: clamp(1.75rem, 4vw, 2.5rem)
--fs-h3: clamp(1.25rem, 3vw, 1.75rem)
--fs-body: clamp(0.95rem, 2vw, 1rem)
--fs-small: 0.875rem
```

### Spacing (8px base unit)
```css
--space-xs: 0.5rem            /* 8px */
--space-sm: 1rem              /* 16px */
--space-md: 1.5rem            /* 24px */
--space-lg: 2.5rem            /* 40px */
--space-xl: 4rem              /* 64px */
--space-2xl: 6rem             /* 96px */
```

### Layout
```css
--max-width: 1200px
--gutter: 2rem                /* Padding on sides */
```

### Transitions
```css
--transition-fast: 200ms ease-out
--transition-base: 300ms ease-out
```

## 3. Section-by-Section Layout & HTML Structure

### 3.1 Hero Section
**Layout:**
- Full viewport (100vh) background image (backdrop.png)
- Centered text overlay (name, role, tagline)
- CTA button below tagline
- Dark overlay on background for text readability

**HTML Structure:**
```html
<header class="hero" id="hero">
  <div class="hero__backdrop"></div>
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1 class="hero__name">Pedro Quispe</h1>
    <p class="hero__role">Event Coordinator / Music Industry</p>
    <p class="hero__tagline">Event and music operations assistant with hands-on experience in label management, artist relations and event coordination within the electronic music scene.</p>
    <a href="#contact" class="btn btn--primary">Let's Work Together</a>
  </div>
</header>
```

---

### 3.2 Two-Column Main Layout (After Hero)
**Overall Structure:**
After the hero, the page splits into two equal columns:
- **Left Column:** About section + What I Do section + Contact section
- **Right Column:** Work section

This creates a split-screen editorial aesthetic matching the `layout_inspo.png` reference.

**Responsive Behavior:**
- Desktop (1440px+): 50/50 split, side-by-side columns
- Tablet (768px–1439px): Columns stack vertically
- Mobile (0–767px): Full-width sections, stacked vertically

---

### 3.3 About Section (Left Column)
**Layout:**
- Large image as primary visual (400x500 or full-width on its column)
- Minimal text below/alongside image
- Image-focused, sparse copy

**HTML Structure:**
```html
<section class="about" id="about">
  <div class="about__image">
    <img src="/assets/profile.jpg" alt="Pedro Quispe">
  </div>
  <div class="about__content">
    <h2>About</h2>
    <p>Experienced in managing releases, coordinating with artists and promoters, and executing marketing campaigns across digital platforms. Actively seeking full-time entry roles in event production, music operations or artist/label management in Berlin.</p>
  </div>
</section>
```

---

### 3.4 What I Do Section (Left Column)
**Layout:**
- 3 cards stacked vertically in left column (not a grid)
- Each card: title + 1-line description
- Subtle border/hover animations

**HTML Structure:**
```html
<section class="services" id="services">
  <h2>What I Do</h2>
  <div class="services__list">
    <div class="service-card">
      <h3>Event Operations</h3>
      <p>Managing logistics, scheduling, and coordination for live music events and releases.</p>
    </div>
    <div class="service-card">
      <h3>Production Support</h3>
      <p>Supporting artists and labels through planning, execution, and post-event analysis.</p>
    </div>
    <div class="service-card">
      <h3>Artist Liaison</h3>
      <p>Building and maintaining relationships between artists, promoters, and industry partners.</p>
    </div>
  </div>
</section>
```

---

### 3.5 Work / Portfolio Section (Right Column)
**Layout:**
- 3 portfolio cards stacked vertically in right column
- Card layout: image on top, project name, short intro, bullet list of contributions
- Hover: subtle shadow/scale increase

**HTML Structure:**
```html
<section class="portfolio" id="portfolio">
  <h2>Work</h2>
  <div class="portfolio__grid">
    <article class="portfolio-card">
      <img src="/assets/project-1.jpg" alt="Project 1">
      <div class="portfolio-card__content">
        <h3>Project / Artist Name 1</h3>
        <p>Brief intro describing the project scope and context.</p>
        <ul class="portfolio-card__list">
          <li>Key contribution or outcome 1</li>
          <li>Key contribution or outcome 2</li>
          <li>Key contribution or outcome 3</li>
        </ul>
      </div>
    </article>
    <!-- Repeat 2 more cards -->
  </div>
</section>
```

---

### 3.6 Contact Section (Left Column – After What I Do)
**Layout:**
- Email centered
- Social icon links below (LinkedIn, Instagram, SoundCloud)
- Simple, clean spacing
- Positioned at the end of left column

**HTML Structure:**
```html
<section class="contact" id="contact">
  <h2>Get In Touch</h2>
  <p><a href="mailto:Pedro.quispe@gmail.com">Pedro.quispe@gmail.com</a></p>
  <div class="social-links">
    <a href="https://linkedin.com/in/pedroquispe" aria-label="LinkedIn" class="social-link">in</a>
    <a href="https://instagram.com/pedroquispe" aria-label="Instagram" class="social-link">@</a>
    <a href="https://soundcloud.com/pedroquispe" aria-label="SoundCloud" class="social-link">☁</a>
  </div>
</section>
```

---

## 4. Responsive Design Strategy

### Breakpoints (mobile-first approach)
- **Mobile/Tablet:** 0–1199px (base/default layout)
- **Desktop:** 1200px and up

### Layout Structure

**Mobile-First Default (0–1199px):**
- Single column layout (`grid-template-columns: 1fr`)
- All content stacks vertically
- Full-width cards with responsive padding
- Left card (About + Skills + Contact) then Right card (Work)
- Font sizes scale responsively using `clamp()`
- Reduced padding: `var(--space-lg) var(--space-sm)` on mobile

**Desktop (1200px+):**
- Two-column split using CSS Grid: `minmax(400px, 1fr) minmax(500px, 2fr)`
  - Left column (narrower): About + Skills + Contact
  - Right column (wider): Work section
  - Asymmetric layout with breathing room
- Full padding: `var(--space-2xl) var(--space-xl)`
- Cards positioned explicitly with grid-column and grid-row

### Responsive Implementation
```css
/* Mobile-First (Default) */
.layout-wrapper {
  display: grid;
  grid-template-columns: 1fr;          /* Single column */
  gap: var(--space-md);
  padding: var(--space-2xl) var(--space-xl);
}

/* Desktop (1200px+) */
@media (min-width: 1200px) {
  .layout-wrapper {
    grid-template-columns: minmax(400px, 1fr) minmax(500px, 2fr);
    gap: var(--space-md);
  }
  
  .card-left {
    grid-column: 1;
    grid-row: 1;
  }
  
  .card-right {
    grid-column: 2;
    grid-row: 1;
    margin-top: var(--space-lg);
  }
}
```

### Font & Spacing Scaling
- **Typography:** Use `clamp()` for fluid scaling between viewport sizes
  - `--fs-h1: clamp(2.5rem, 5vw, 4rem)`
  - `--fs-body: clamp(0.95rem, 2vw, 1rem)`
- **Spacing:** CSS variables adjusted per breakpoint
  - Mobile: `--space-xl: 2rem`, `--space-2xl: 3rem`
  - Desktop: `--space-xl: 4rem`, `--space-2xl: 6rem`
- **Padding:** Responsive container padding
  - Mobile (0–767px): `var(--space-lg) var(--space-sm)` (40px 16px)
  - Desktop: `var(--space-2xl) var(--space-xl)` (96px 64px)

---

## 5. Animation & Transition Plan

### Hover States
- **Service cards:** Subtle border appear + light scale up (1.02x) on hover
- **Portfolio cards:** Box shadow increase + slight lift (transform: translateY(-4px))
- **Links (button, social, email):** Color transition to accent on hover, slight underline appear
- **All transitions:** Use `--transition-base` (300ms ease-out)

### Scroll Behavior
- `scroll-behavior: smooth` on `html` element for anchor links
- No parallax or complex scroll animations (keep it minimal per design brief)

### Load Time
- No animation on page load (keep it instant)
- Animations only triggered by interaction (hover)

---

## 6. HTML Structure (Overall Page)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pedro Quispe – Event Coordinator</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Full-width hero -->
  <header class="hero" id="hero">
    <!-- Hero content -->
  </header>

  <!-- Two-column layout wrapper (desktop split, mobile stack) -->
  <main class="layout-columns">
    <!-- Left Column -->
    <div class="column column-left">
      <section class="about" id="about"><!-- About + image --></section>
      <section class="services" id="services"><!-- What I Do --></section>
      <section class="contact" id="contact"><!-- Contact --></section>
    </div>

    <!-- Right Column -->
    <div class="column column-right">
      <section class="portfolio" id="portfolio"><!-- Work --></section>
    </div>
  </main>

  <script src="main.js"></script>
</body>
</html>
```

---

## 7. Key Design Decisions

1. **Image as Hero Backdrop:** `background-image` with `background-size: cover`, centered overlay with semi-transparent `rgba()` for text readability
2. **Two-Column Editorial Layout:** CSS Grid on desktop (50/50 split), flexbox/block on mobile/tablet for stacking
3. **Services Cards in Left Column:** Stacked vertically (not a 3-column grid) to match editorial aesthetic
4. **Portfolio Cards in Right Column:** Stacked vertically, image-focused
5. **Semantic HTML:** `<header>`, `<main>`, `<section>`, `<article>`, proper heading hierarchy
6. **No JS Framework:** Vanilla JS only for smooth scroll (CSS `scroll-behavior: smooth` native support)
7. **Google Fonts Import:** Add `@import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500&display=swap');` to style.css
8. **Accessibility:** Proper alt text on images, semantic links, sufficient color contrast (WCAG AA)

---

## 8. Current Implementation Status (Actual vs. Plan)

### What Changed from Original Plan

**Layout & Structure:**
- **Plan:** Hero section + two equal-width 50/50 columns
- **Actual:** Full-page background with two-column card layout (asymmetric: narrower left, wider right)
- **Decision:** Better visual hierarchy and focus on work content

**Design & Styling:**
- **Plan:** Dark theme (#202020 bg, #CCCCCC text, #989898 accent)
- **Actual:** Light theme (#F5F5F5 bg, #2C2C2C text, #BBBBBB accent)
- **Decision:** Refined aesthetic, better contrast, more modern

**Typography:**
- **Plan:** Mona Sans primary font
- **Actual:** Strait font applied to body text, Mona Sans secondary
- **Decision:** Stronger typographic identity with editorial aesthetic

**Content Sections:**
- **Plan:** Large About image + minimal text
- **Actual:** About section merged with contact links in card format, no image
- **Decision:** Consolidated contact information for cleaner UX

**Portfolio Cards:**
- **Plan:** Images on top of each card
- **Actual:** Text-only cards without images
- **Decision:** Focus on written achievements and experience

**Responsive Design:**
- **Plan:** Hero + two-column split (Desktop) / Single column (Mobile)
- **Actual:** Mobile-first approach with single-column default (0–1199px) and two-column desktop layout (1200px+)
- **Decision:** More reliable responsive behavior using mobile-first CSS with min-width media queries

---

## 9. Deployment & Next Steps Roadmap

### Phase 1: Pre-Deployment (Current) ✅ Complete
- [x] Build HTML structure
- [x] Style with CSS variables & responsive design
- [x] Add JavaScript interactions (smooth scroll, back-to-top)
- [x] Code review & quality fixes
- [x] Fix responsive layout (mobile-first approach with 1200px breakpoint)
- [x] Adjust column widths for better spacing
- [x] Fine-tune footer padding
- [x] Add favicon (black square with "OL")
- [ ] Test on multiple devices/browsers (final check before deployment)
- [ ] Optimize images (if adding later)
- [ ] Add missing meta tags (SEO, social preview)

### Phase 2: Deployment to Vercel (Next)
- [ ] Push code to GitHub repository
- [ ] Connect GitHub repo to Vercel
- [ ] Configure build settings (Vite auto-detected)
- [ ] Deploy and test live site
- [ ] Get free *.vercel.app subdomain

### Phase 3: Custom Domain (When Ready)
- [ ] Purchase custom domain (optional)
- [ ] Update DNS to point to Vercel
- [ ] Test custom domain deployment

### Phase 4: Optional Enhancements (Later)
- [ ] Add analytics (Vercel Web Analytics or Google Analytics)
- [ ] SEO optimization (structured data, sitemap)
- [ ] Performance monitoring (Lighthouse CI)
- [ ] Content updates & project additions
- [ ] Additional animations/interactions

---

## Implementation Checklist (Completed)

- [x] Set up Vite project with package.json and vite.config.js
- [x] Create index.html with all sections
- [x] Define CSS tokens and base styles (colors, fonts, spacing)
- [x] Build two-column layout with card structure
- [x] Build About section with contact links
- [x] Build Skills section with 3-card grid
- [x] Build Portfolio section with 3 project cards
- [x] Build Contact section with email + social links
- [x] Add responsive styles with mobile-first approach (1200px breakpoint)
- [x] Add hover animations on cards and links
- [x] Add smooth scroll behavior
- [x] Add Google Fonts (Strait & Mona Sans)
- [x] Code quality review & fixes
- [x] Test on multiple viewport sizes
- [x] Fix responsive column stacking on mobile/tablet
- [x] Increase left column width (450px minimum for better spacing)
- [x] Adjust footer padding (0 top, var(--space-xl) bottom)
- [x] Add favicon (black square with white "OL" text)