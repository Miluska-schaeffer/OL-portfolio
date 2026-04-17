# Footer Layout Plan: Left/Right Split

## Goal
Reposition footer elements to create a split layout: "feel free to reach out..." on the left, "back to top" link on the right, both on one line. Maintain responsiveness and apply the existing `softFadeIn` animation.

## Current State
- Footer is center-aligned with single `<p>` containing "Coded with &lt;3"
- Uses `softFadeIn` animation (2.5s ease-out, 1s delay)
- Font size: `--fs-small` (0.875rem)
- Color: `--color-accent` (#BBBBBB)

## Implementation Plan

### 1. HTML Changes
Update `/index.html` footer section:
- Replace single `<p>` with a flex container (`.footer__content`)
- Add left element: `<div class="footer__left"><p>Feel free to reach out</p></div>`
- Add right element: `<div class="footer__right"><a href="#top" class="footer__back-to-top">Back to top</a></div>`
- Keep "Coded with &lt;3" (add to left or center if needed)

### 2. CSS Changes in `style.css`

**A. Footer Container**
- Keep `.footer` styling but change `text-align: center` to `display: flex`
- Add `justify-content: space-between` for left/right spacing
- Add `align-items: center` for vertical centering
- Keep existing animation and padding

**B. New Classes**
- `.footer__content`: Flex container with `display: flex`, `justify-content: space-between`, `width: 100%`
- `.footer__left`: Left side paragraph(s), flex-grow handling
- `.footer__right`: Right side link, text-align right on mobile
- `.footer__back-to-top`: Link styling (inherit color, add hover state)

### 3. Responsiveness Strategy
- **Desktop (1200px+)**: Full flex layout, left and right elements opposite corners
- **Tablet (768px–1199px)**: Flex layout maintained, may adjust padding
- **Mobile (<768px)**: Stack vertically with flex-direction: column, center alignment, or adjust to fit

### 4. Animation
- Apply `softFadeIn` animation to new child elements (`.footer__left` and `.footer__right`)
- Stagger delays (e.g., left at 1s, right at 1.1s) for sequential reveal
- OR keep on parent `.footer` and children inherit

### 5. Styling Details
- Link hover state: use existing link color scheme (`--color-link`, `--color-link-hover`)
- Maintain consistency with existing font/spacing tokens
- Ensure touch targets are adequate on mobile

## Testing Checklist
- [ ] Desktop layout: elements positioned left/right with space between
- [ ] Tablet: layout adjusts properly, no overflow
- [ ] Mobile: readable layout (stack or adjust as needed)
- [ ] Animation plays on load
- [ ] "Back to top" link scrolls to page top (anchor to body or use JS)
- [ ] Hover states work on link
- [ ] No layout shift on animation completion
