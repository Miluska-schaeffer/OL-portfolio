# Social Tooltip Z-Index Problem - Investigation & Solution Plan

## Problem Statement

The social media link tooltips appear behind the icons even though:
- Z-index is set to 1000 (very high)
- Opacity is 0.9 (mostly opaque)
- Position is absolute with proper positioning

**Symptoms:**
- Icons are visible through the tooltip background
- Tooltips appear layered *behind* the circular icon elements
- This affects LinkedIn and Instagram icons specifically

## Root Cause Analysis

### Possible Causes (in order of likelihood):

1. **Stacking Context Issue** ⚠️ MOST LIKELY
   - The `.social-link` element with `display: inline-flex` might create a new stacking context
   - The `::before` pseudo-element's z-index is relative to `.social-link`'s stacking context
   - Even with `z-index: 1000`, if `.social-link` has `z-index: auto` or lower context, the tooltip stays behind

2. **Border/Icon Rendering**
   - The `.social-link` circular border (50px circle with 2px border) might be rendered on top
   - SVG content (SoundCloud icon) might have higher stacking order
   - The text content ("in", "@") might be layered above the `::before` pseudo-element

3. **Parent Container Overflow**
   - The `.social-links` container might have `overflow: hidden` or similar
   - The tooltip might be clipped by the parent container's bounds

4. **Display/Flex Context**
   - `display: inline-flex` might affect pseudo-element stacking
   - Flex children have special stacking rules

## Solution Strategy

### Option A: Create Explicit Stacking Context on .social-link ✅ RECOMMENDED

Add `z-index: 1` to `.social-link` to create a proper stacking context, ensuring the `::before` element with `z-index: 1000` respects that context:

```css
.social-link {
  /* existing styles... */
  position: relative;
  z-index: 1;  /* ADD THIS */
}
```

**Pros:**
- Minimal change
- Creates proper stacking context
- Ensures tooltip appears above the icon
- Doesn't affect other elements

**Cons:**
- None identified

---

### Option B: Use `::after` Instead of `::before` + Adjust Positioning

If Option A doesn't work, try using `::after` pseudo-element (rendered after the element's content):

```css
.social-link::after {
  /* same tooltip styles but with ::after */
}
```

**Pros:**
- Different rendering order (after vs. before)
- Might bypass the stacking issue

**Cons:**
- More significant change
- Might affect other styles

---

### Option C: Use JavaScript to Create Tooltip Element

Create actual DOM elements for tooltips instead of pseudo-elements:

```javascript
// Create tooltip div for each social link
document.querySelectorAll('.social-link').forEach(link => {
  const tooltip = document.createElement('div')
  tooltip.className = 'social-tooltip'
  tooltip.textContent = link.getAttribute('data-tooltip')
  link.appendChild(tooltip)
})
```

**Pros:**
- Full control over stacking and rendering
- No pseudo-element limitations
- Can be positioned outside parent container

**Cons:**
- Adds JavaScript (plan was CSS-only)
- HTML structure changes dynamically
- More complex

---

## Recommended Implementation: Option A

**Files to Change:** 1 file

### CSS Change (style.css:602-614)

Update `.social-link` rule:

```css
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 2px solid var(--color-link);
  border-radius: 50%;
  font-weight: var(--fw-medium);
  color: var(--color-link);
  transition: all var(--transition-base);
  position: relative;
  z-index: 1;  /* ADD THIS LINE */
}
```

**Change:** Add single line `z-index: 1;` to establish proper stacking context

### Why This Works

1. Creates a new stacking context on `.social-link`
2. All children of `.social-link` (including `::before` pseudo-element) respect this context
3. The `::before` element with `z-index: 1000` now correctly layers above the icon
4. The tooltip background and text are guaranteed to appear above the circular border and content

### Testing

- [ ] Hover over LinkedIn icon → tooltip fully visible, no icon bleeding through
- [ ] Hover over Instagram icon → tooltip fully visible, no icon bleeding through
- [ ] Hover over SoundCloud icon → tooltip fully visible, no icon bleeding through
- [ ] No visual regression on other page elements
- [ ] Tooltips still positioned correctly on the right side

---

## Fallback Plan

If Option A doesn't work:
1. Implement Option B (use `::after` instead)
2. If still failing, implement Option C (JavaScript DOM elements)

But Option A should resolve the stacking context issue completely.
