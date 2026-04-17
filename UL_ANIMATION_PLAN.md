# List Element Animation Plan

## Current State

**Animation System:**
- `<h3>` and `<p>` elements receive the `.anim-lead` animation (fade-in + slide-up)
- Animation triggered via JavaScript at `main.js:98-101`
- Uses IntersectionObserver with 20% visibility threshold
- Animation CSS defined at `style.css:743-754`

**Current Animation Details (.anim-lead):**
- Initial state: `opacity: 0`, `transform: translateY(20px)`
- Animated state: `opacity: 1`, `transform: translateY(0)`
- Duration: 0.6s ease-out for both opacity and transform
- Delay: 0.15s before animation starts
- Triggered by: `.is-visible` class applied when element enters viewport

## Target: Add Same Animation to `<ul>` Elements

Apply the existing `.anim-lead` animation to all `<ul>` (unordered list) elements throughout the page, maintaining consistency with how paragraphs and headings animate.

## Implementation Strategy

### Changes Required: 1 file

**File: `main.js` (line 98)**

Current:
```javascript
document.querySelectorAll('h3, p').forEach(el => {
  animateText(el, 'lead')
  textObserver.observe(el)
})
```

Target:
```javascript
document.querySelectorAll('h3, p, ul').forEach(el => {
  animateText(el, 'lead')
  textObserver.observe(el)
})
```

**Change:** Add `ul` to the querySelector string (comma-separated, same as `h3, p`)

### No CSS Changes Required

- The `.anim-lead` animation classes already exist
- No style modifications needed
- The animation will apply automatically once `ul` elements are included in the selector

## How It Works

1. When page loads, all `<ul>` elements matching the selector are identified
2. The `animateText(el, 'lead')` function applies the `.anim-lead` class to each `<ul>`
3. IntersectionObserver monitors each `<ul>` element
4. When `<ul>` becomes 20% visible in viewport, the `.is-visible` class is added
5. CSS transition triggers: opacity 0→1, transform translateY(20px)→0 over 0.6s
6. Animation completes smoothly as user scrolls

## Affected Elements

This will animate all `<ul>` elements on the page:
- `.portfolio-card__list` (bullet lists in portfolio cards) — 3 instances on right column
- `<ul>` tags nested in paragraphs or other content sections

## Expected Visual Result

- Lists will fade in and slide up (20px) as they enter the viewport
- Same smooth 0.6s ease-out timing as paragraphs and headings
- 0.15s delay before animation starts
- Consistent animation language across all text content

## Testing

- [ ] Scroll to portfolio section and verify lists animate on entry
- [ ] Check that animation timing matches `<p>` and `<h3>` animations
- [ ] Verify no performance issues (IntersectionObserver handles multiple elements efficiently)
- [ ] Confirm animation respects `prefers-reduced-motion` media query (already built in)

## Risk Assessment

**Risk Level: Very Low**

- Single, minimal code change (one word added to selector)
- Uses existing animation infrastructure (no new code)
- No breaking changes to existing elements
- Animation already tested and working for `<p>` and `<h3>`
- Scoped to `main.js` only
