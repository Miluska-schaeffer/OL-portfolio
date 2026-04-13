# Responsive Design Documentation

This document explains how the portfolio website is structured for responsive behavior across all device sizes.

---

## Overview

The website uses a **mobile-first approach** with CSS Grid and media queries. This means:

- **Default layout (0–1199px):** Single column, all content stacks vertically
- **Desktop layout (1200px+):** Two-column grid with asymmetric columns
- **No separate mobile/tablet frameworks** – pure CSS with responsive utilities

---

## Breakpoints

| Breakpoint | Size | Description |
|-----------|------|-------------|
| Mobile | 0–767px | Phones, compact devices |
| Tablet | 768px–1199px | Tablets, small laptops |
| Desktop | 1200px+ | Large screens, monitors |

---

## Layout: Mobile (Default)

### CSS Grid Structure
```css
.layout-wrapper {
  display: grid;
  grid-template-columns: 1fr;  /* Single column */
  gap: var(--space-md);         /* 24px gap */
  padding: var(--space-2xl) var(--space-xl);
}
```

### Behavior
- All cards stack vertically: **Left Card** → **Right Card**
- Cards take full viewport width (minus padding)
- Padding reduces on smaller screens for better spacing

### Padding by Size
- **0–767px (Mobile):** `var(--space-lg) var(--space-sm)` = 40px 16px
- **768px–1199px (Tablet):** `var(--space-2xl) var(--space-xl)` = 96px 64px

---

## Layout: Desktop (1200px+)

### CSS Grid Structure
```css
@media (min-width: 1200px) {
  .layout-wrapper {
    grid-template-columns: minmax(450px, 1fr) minmax(500px, 2fr);
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

### Behavior
- Two-column layout with **asymmetric** column widths
- **Left column** (narrower): `minmax(450px, 1fr)` – can shrink to 450px, grows to proportional size
- **Right column** (wider): `minmax(500px, 2fr)` – can shrink to 500px, grows at 2x the left column's ratio
- Right card has `margin-top` to align content with left column

### Example Widths at Different Desktop Sizes
| Viewport | Left Col | Right Col | Total |
|----------|----------|----------|-------|
| 1200px | ~450px | ~600px | 1050px + padding |
| 1400px | ~500px | ~700px | 1200px + padding |
| 1600px | ~560px | ~800px | 1360px + padding |

---

## Responsive Typography

The website uses CSS `clamp()` for fluid typography that scales smoothly between viewports:

```css
--fs-h1: clamp(2.5rem, 5vw, 4rem)
--fs-h2: clamp(1.5rem, 3.5vw, 2rem)
--fs-h3: clamp(1.1rem, 2.5vw, 1.5rem)
--fs-body: clamp(0.95rem, 2vw, 1rem)
```

**How it works:**
- `clamp(minimum, preferred, maximum)`
- Text scales between min and max based on viewport width
- No hard breakpoints – smooth scaling on all sizes
- Prevents text from getting too small or too large

---

## Responsive Spacing

Spacing variables scale with media queries:

```css
/* Default (Desktop) */
:root {
  --space-xl: 4rem;      /* 64px */
  --space-2xl: 6rem;     /* 96px */
}

/* Tablet & Mobile */
@media (max-width: 767px) {
  :root {
    --space-xl: 2rem;    /* 32px */
    --space-2xl: 3rem;   /* 48px */
  }
}
```

This ensures consistent visual hierarchy across all device sizes.

---

## Card Responsiveness

### Left Card (About + Skills + Contact)
- **Mobile (0–1199px):** Full width, single column
- **Desktop (1200px+):** ~35% width (1fr in asymmetric grid)
- Cards inside: Skills cards always stack vertically
- Content always readable, no overflow

### Right Card (Portfolio/Work)
- **Mobile (0–1199px):** Full width, appears below left card
- **Desktop (1200px+):** ~65% width (2fr in asymmetric grid)
- Portfolio cards always stack vertically (no image columns)
- Content adapts based on available width

---

## Testing Responsiveness

### Browser DevTools
1. Open DevTools (F12 or Cmd+Option+I)
2. Click **Toggle Device Toolbar** (Ctrl+Shift+M or Cmd+Shift+M)
3. Test at different breakpoints:
   - iPhone SE (375px)
   - iPad (768px)
   - iPad Pro (1024px)
   - Desktop (1400px+)

### Manual Testing
Resize browser window and watch layout transition:
- **Below 1200px:** Columns stack vertically
- **1200px and above:** Two-column layout appears

### No Layout Breaks
- Minimum width: ~320px (iPhone SE)
- Maximum tested: 1920px (Full HD monitors)
- Layout remains readable and properly proportioned at all sizes

---

## Common Responsive Patterns Used

### 1. Mobile-First Media Queries
```css
/* Default: mobile */
.element { /* mobile styles */ }

/* Desktop override */
@media (min-width: 1200px) {
  .element { /* desktop styles */ }
}
```

**Advantage:** Simpler CSS, smaller file size, clearer intent

### 2. CSS Custom Properties for Responsive Values
```css
:root { --spacing: 1rem; }

@media (max-width: 767px) {
  :root { --spacing: 0.75rem; }
}

.element { padding: var(--spacing); }
```

**Advantage:** Centralized responsive values, easy updates

### 3. Fluid Typography with `clamp()`
```css
font-size: clamp(1rem, 2vw, 2rem);
```

**Advantage:** Smooth scaling without multiple breakpoints

### 4. Asymmetric Grid Columns
```css
grid-template-columns: minmax(400px, 1fr) minmax(500px, 2fr);
```

**Advantage:** Flexible sizing that respects minimums and growth ratios

---

## Accessibility & Responsiveness

- **Color contrast:** Maintained across all sizes
- **Touch targets:** Social/interactive links are 50px (mobile-friendly)
- **Font sizing:** Never drops below 0.95rem for readability
- **Padding:** Adequate spacing on all viewports
- **Semantic HTML:** Proper heading hierarchy helps screen readers

---

## Future Enhancements

- [ ] Add tablet-specific optimizations (768px–1199px fine-tuning)
- [ ] Add landscape orientation handling for mobile
- [ ] Test on foldable devices
- [ ] Add print styles (print media query)
- [ ] Monitor Core Web Vitals (LCP, CLS) on different devices

