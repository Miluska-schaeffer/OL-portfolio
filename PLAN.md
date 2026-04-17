# Portfolio Development Plan & Documentation

## Recent Updates & Implementations

### 1. Sticky Left Column (Desktop Only)
**Status:** ✅ Complete  
**Viewport:** 1200px and above

- Left column (`.card-left`) uses `position: sticky; top: 0;`
- Automatically contained by grid parent (`.layout-wrapper`)
- Prevents overlap with footer
- Does NOT apply on mobile/tablet (uses normal flow)

**Key Implementation:**
```css
@media (min-width: 1200px) {
  .card-left {
    position: sticky;
    top: 0;
  }
}
```

---

### 2. Mobile & Tablet Responsiveness (Below 1200px)
**Status:** ✅ Complete  
**Viewports:** Mobile (<768px) and Tablet (768-1199px)

#### Responsive Padding Strategy
- Uses percentage-based padding instead of hardcoded pixels
- **Mobile:** `padding: var(--space-lg) 3%` → scales from ~300px to 768px
- **Tablet:** `padding: var(--space-lg) 4%` → scales from 768px to 1199px
- Ensures content always fits viewport without horizontal overflow

#### Layout & Sizing
- `width: 100%` + `max-width: 100%` on layout-wrapper
- Full-width responsive design
- No corner alignment issues at any viewport size

#### Card Padding Optimization
- **Mobile:** `padding: var(--space-sm)` (16px) on cards
- Reduced from 24px to accommodate tight mobile widths
- Ensures content space at smallest viewports

#### Gap Management
- **Between cards:** `gap: var(--space-md)` (24px)
- Vertical spacing on single-column layouts
- Consistent with desktop visual hierarchy

---

### 3. Flex Gap Reductions (Mobile)
**Status:** ✅ Complete  
**Affects:** `.about__header` and `.portfolio-header`

- **Desktop:** `gap: var(--space-lg)` (40px) - maintains visual spacing
- **Mobile:** `gap: var(--space-sm)` (16px) - prevents flex overflow
- `.portfolio-intro` has `padding-right: 0` on mobile

**Why:** Large gaps on mobile force flex items to overflow on narrow screens.

---

### 4. Overflow Containment & Tooltip Visibility
**Status:** ✅ Complete

#### Card Overflow Handling
- `overflow: hidden` applied ONLY on mobile (`@media (max-width: 767px)`)
- **Desktop:** No overflow constraint → tooltips fully visible
- **Mobile:** Contains content overflow, prevents layout shift

#### Tooltip Behavior
- **CSS hover tooltip** (`.contact__email::before`): Uses `z-index: 10000`
- **JavaScript click tooltip** (`.email-tooltip`): Uses `z-index: 99999`
- On desktop, cards don't clip tooltips (no `overflow: hidden`)
- On mobile, tooltips contained within card bounds (has `overflow: hidden`)

**Important:** Sticky positioning requires parent to have `overflow: visible`. That's why `overflow-x: hidden` is NOT on `.layout-wrapper`.

---

## Responsive Breakpoints Reference

| Viewport | Layout | Padding | Gap | Card Padding | Notes |
|----------|--------|---------|-----|--------------|-------|
| <768px (Mobile) | Single column | 3% horizontal | 24px | 16px | Optimized spacing, contained overflow |
| 768-1199px (Tablet) | Single column | 4% horizontal | 24px | 24px | More breathing room, scales smoothly |
| 1200px+ (Desktop) | Two column | Default (64px) | 24px | 24px | Sticky left column, tooltips visible |

---

## CSS Implementation Details

### Box Sizing
- Global `box-sizing: border-box` ensures padding/border included in width calculations
- Safe to use percentages and fixed values together

### Overflow Strategy
- **Body:** `overflow-x: hidden` (suppresses scrollbar, prevents viewport overflow)
- **Layout-wrapper:** NO overflow property (allows sticky positioning to work)
- **Cards (mobile only):** `overflow: hidden` (contains content, prevents layout shift)
- **Cards (desktop):** NO overflow (allows tooltips to be fully visible)

### Positioning Stacking
- `.card-left` (desktop): `position: sticky` creates stacking context
- `.card-left` (mobile/tablet): `position: relative`
- Sticky positioning NOT constrained by parent overflow

---

## Known Constraints & Decisions

### Why Percentage Padding?
- Fixed pixel values create empty space on very small screens
- Percentages scale fluidly with viewport
- `3%` and `4%` values chosen to prevent overflow while maximizing content space

### Why No Overflow on Layout-Wrapper?
- Sticky positioning requires parent with `overflow: visible`
- Prevents content from sticking properly

### Why Overflow: Hidden Only on Mobile?
- Desktop tooltips need to escape card bounds
- Mobile has single-column layout where overflow doesn't affect adjacent content
- Mobile overflow containment prevents layout shift when cards have tight padding

### Card Padding Values
- Mobile (16px): Minimal space for text content on narrowest viewports
- Tablet/Desktop (24px): Matches responsive design scale

---

## Testing Checklist

- [ ] Mobile (300px-767px): No horizontal scrolling, responsive padding
- [ ] Tablet (768px-1199px): Responsive gap, no overflow
- [ ] Desktop (1200px+): Sticky left column works, tooltips visible
- [ ] Tooltips: Always on top of content, not clipped
- [ ] Font sizing: Responsive via clamp() values
- [ ] All breakpoints: Smooth transitions, no layout shifts

---

## Future Considerations

- If adding new fixed-width elements, ensure they fit within calculated content space
- Test new tooltips/overlays with the established z-index hierarchy
- Any changes to card structure should preserve overflow containment strategy
- Monitor font scaling at edge breakpoints (around 768px, 1200px)
