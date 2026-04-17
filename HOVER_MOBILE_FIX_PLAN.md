# Mobile Hover State Fix Plan

## Problem

On mobile, CSS `:hover` activates on tap and stays active — there's no mouse-leave to dismiss it. This affects all interactive elements, not just tooltips.

The user reported `.social-link:hover` staying active after tap (background fill, border color, translateY transform remain visible).

## Full Audit of Hover States in style.css

| Selector | Visual Effect | Problematic on Mobile? |
|----------|---------------|------------------------|
| `a:hover` | Color change | Low — subtle |
| `.btn--primary:hover` | Background fill | Not present in current UI |
| `.card:hover` | Background + translateY(-4px) | Yes — card lifts and stays up |
| `.service-card:hover` | Background + translateX(4px) | Yes — card shifts and stays |
| `.portfolio-card:hover` | Background + translateY(-2px) | Yes — card lifts and stays |
| `.discography_link:hover::after` | Arrow opacity | Low — subtle |
| `.contact__email:hover` | Background + color change | Yes — background stays |
| `.social-link:hover` | Background + border + translateY(-4px) | Yes — reported by user |
| `.back-to-top:hover` | Color change | Low — subtle |

## Solution

Wrap all **visually significant** hover states in `@media (hover: hover)`. This is the correct comprehensive fix — rather than patching one at a time, fix all interactive elements at once.

Subtle color-only changes (`a:hover`, `.back-to-top:hover`, `.discography_link:hover::after`) are left unwrapped — they're barely noticeable on mobile and don't cause a jarring stuck state.

## Changes: style.css only

### 1. `.card:hover` (line ~259)
```css
@media (hover: hover) {
  .card:hover {
    background-color: rgba(255, 255, 255, 0.95);
    transform: translateY(-4px);
  }
}
```

### 2. `.service-card:hover` (line ~387)
```css
@media (hover: hover) {
  .service-card:hover {
    background-color: rgba(44, 44, 44, 0.08);
    transform: translateX(4px);
  }
}
```

### 3. `.portfolio-card:hover` + `.portfolio-card:hover img` (line ~435)
```css
@media (hover: hover) {
  .portfolio-card:hover {
    background-color: rgba(44, 44, 44, 0.06);
    transform: translateY(-2px);
  }
  .portfolio-card:hover img {
    transform: scale(1.02);
  }
}
```

### 4. `.contact__email:hover` (line ~586)
```css
@media (hover: hover) {
  .contact__email:hover {
    color: var(--color-link-hover);
    background-color: #ECECFF;
  }
}
```

### 5. `.social-link:hover` (line ~619)
```css
@media (hover: hover) {
  .social-link:hover {
    border-color: var(--color-link-hover);
    color: var(--color-link-hover);
    transform: translateY(-4px);
    background-color: var(--color-link-fill);
    z-index: 10;
  }
}
```

## What Stays the Same

- All hover effects work exactly as before on desktop
- Email clipboard copy on click still works on mobile
- Social links still navigate correctly on mobile tap
- Tooltip rules already wrapped from the previous fix — no changes needed there

## Files Changed

| File | Change |
|------|--------|
| `style.css` | Wrap 5 hover rules in `@media (hover: hover)` |

## Risk: Very Low

- Standard pattern for mobile-safe hover states
- Purely wrapping existing rules — no styles changed
- One comprehensive fix rather than patching one at a time
