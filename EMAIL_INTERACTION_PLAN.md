# Email Interaction Enhancement Plan

## Current State Analysis

**Location:** `index.html:30` — Email link within contact section
```html
<p><a href="mailto:olympios.element@gmail.com" class="contact__email"> olympios.element@gmail.com</a></p>
```

**Current CSS:** `style.css:555-567`
- Has `display: inline-block`
- Font size: `var(--fs-h3)` 
- Color: `var(--color-link)` (#0E1AF5)
- Hover state: Changes color to `var(--color-link-hover)` (#0E1AE1) + adds `border-bottom: 2px solid var(--color-link-hover)`

**Current Behavior:**
- On hover: Text color changes, bottom border appears (not the target design)
- On click: Opens default mailto: handler
- No tooltip or clipboard functionality

---

## Target Behavior Breakdown

### On Hover
1. **Text color:** Change to #0E1AE1
2. **Background:** #ECECFF appears with zero padding (background hugs text tightly)
3. **Cursor:** Pointer (already exists via `cursor: pointer` in base `a` rule)
4. **Tooltip:** CSS-based tooltip reading "Copy to clipboard", appears above text, centered
5. **Transition:** Smooth 0.2s ease for color + background

### On Click
1. **Clipboard Copy:** Use `navigator.clipboard.writeText("olympios.element@gmail.com")`
2. **Tooltip Change:** "Copy to clipboard" → "Copied!" for 2 seconds
3. **Auto-revert:** Tooltip text reverts to "Copy to clipboard" after 2 seconds

### Additional Constraints
- No external tooltip libraries — pure CSS + minimal JS
- Negative margin or `box-decoration-break` to eliminate padding on background
- Don't break other links' hover color (#0E1AE1)
- Scoped changes only to `style.css` and `main.js`

---

## Implementation Strategy

### CSS Changes (style.css)

**1. Update `.contact__email` base styles**
- Remove the existing `border-bottom` hover state
- Add `position: relative` for tooltip positioning
- Add smooth transitions for color and background

**2. Create tooltip with `::before` pseudo-element**
- Use `content: attr(data-tooltip)` to pull dynamic text from attribute
- Position: `absolute`, above the element (`top: -2rem` or similar)
- Center horizontally using `left: 50%` + `transform: translateX(-50%)`
- Add subtle styling: background, text color, padding, border-radius, white-space control
- Initially `opacity: 0` / `pointer-events: none`
- On `.contact__email:hover::before`, show tooltip with `opacity: 1`

**3. Create background highlight**
- Add `::after` pseudo-element or use `background` property directly
- Apply on `.contact__email:hover`
- Color: #ECECFF (light purple)
- No padding (use negative margins or `box-decoration-break: clone` if needed)
- Transition: `background 0.2s ease`

**Approach for zero-padding background:**
- Option A: Add `padding: 0` explicitly (safe if inline-block)
- Option B: Use `background-clip: text` + separate overlay technique
- Option C: Use `box-decoration-break: clone` if text breaks across lines
- **Chosen:** Option A (simple, explicit padding: 0) + use `inline-block` display

**4. Revised `.contact__email` hover state**
- Color → #0E1AE1 ✓
- Background → #ECECFF ✓
- Show tooltip ✓
- Keep smooth transitions ✓

### JavaScript Changes (main.js)

**1. Add click handler to `.contact__email`**
```javascript
const emailLink = document.querySelector('.contact__email')
emailLink.addEventListener('click', async (e) => {
  e.preventDefault()  // Prevent default mailto behavior
  const email = 'olympios.element@gmail.com'
  
  try {
    await navigator.clipboard.writeText(email)
    
    // Change tooltip to "Copied!" for 2 seconds
    const originalTooltip = emailLink.getAttribute('data-tooltip')
    emailLink.setAttribute('data-tooltip', 'Copied!')
    emailLink.classList.add('copied-state')
    
    // Revert after 2 seconds
    setTimeout(() => {
      emailLink.setAttribute('data-tooltip', originalTooltip)
      emailLink.classList.remove('copied-state')
    }, 2000)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
})
```

**2. Optional: Add `.copied-state` class for styling variations**
- Could change background color briefly (green/success state)
- Current plan: Just change tooltip text, keep styling the same

---

## File-by-File Changes

### style.css

**Location:** Lines 555-567 (replace `.contact__email` and its `:hover` state)

**New rules:**
```css
.contact__email {
  display: inline-block;
  font-size: var(--fs-h3);
  font-weight: var(--fw-medium);
  color: var(--color-link);
  transition: color 0.2s ease, background 0.2s ease;
  border: none; /* Remove border-bottom from previous design */
  position: relative;
  padding: 0; /* Ensure no padding on background */
  data-tooltip: "Copy to clipboard"; /* Placeholder */
  cursor: pointer;
}

.contact__email::before {
  content: attr(data-tooltip);
  position: absolute;
  top: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background-color: rgba(44, 44, 44, 0.9);
  color: var(--color-white);
  padding: 0.5rem 0.75rem;
  border-radius: var(--br-soft);
  font-size: 0.75rem;
  font-weight: var(--fw-medium);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 10;
}

.contact__email:hover {
  color: var(--color-link-hover);
  background-color: #ECECFF;
}

.contact__email:hover::before {
  opacity: 1;
}
```

### main.js

**Location:** Append to end of file (after line 121)

**New code block:**
```javascript
// ================================
// Email Copy to Clipboard
// ================================

const emailLink = document.querySelector('.contact__email')
if (emailLink) {
  // Set initial tooltip text
  emailLink.setAttribute('data-tooltip', 'Copy to clipboard')

  emailLink.addEventListener('click', async (e) => {
    e.preventDefault()
    const email = 'olympios.element@gmail.com'

    try {
      await navigator.clipboard.writeText(email)

      // Show "Copied!" feedback
      const originalTooltip = emailLink.getAttribute('data-tooltip')
      emailLink.setAttribute('data-tooltip', 'Copied!')
      emailLink.classList.add('copied-state')

      // Revert tooltip after 2 seconds
      setTimeout(() => {
        emailLink.setAttribute('data-tooltip', originalTooltip)
        emailLink.classList.remove('copied-state')
      }, 2000)
    } catch (err) {
      console.error('Failed to copy email to clipboard:', err)
      // Fallback: show error state or keep default behavior
      emailLink.setAttribute('data-tooltip', 'Copy failed')
      setTimeout(() => {
        emailLink.setAttribute('data-tooltip', 'Copy to clipboard')
      }, 2000)
    }
  })
}
```

---

## Edge Cases & Handling

1. **Clipboard API not supported (older browsers)**
   - Error handling in try/catch logs to console
   - User sees "Copy failed" tooltip briefly
   - Default behavior could fallback to mailto, but current plan shows error only

2. **Rapid clicks**
   - Each click properly overwrites the timeout
   - No animation conflicts or competing states

3. **Text selection across line breaks** (unlikely for email)
   - Email is short, unlikely to wrap
   - Background color will apply correctly with `inline-block` display

4. **Touch devices**
   - Hover state won't trigger on touch (native behavior)
   - Click handler works fine on touch
   - Tooltip won't show before click on mobile (acceptable UX tradeoff)

5. **Accessibility**
   - Tooltip text conveyed via `data-tooltip` attribute
   - Consider adding `aria-label` or title attribute for screen readers
   - **Addition:** Could add `title="Copy email to clipboard"` as fallback

---

## Testing Checklist

- [ ] Hover over email shows tooltip with correct text and styling
- [ ] Hover background color is #ECECFF (light purple)
- [ ] Hover text color is #0E1AE1
- [ ] Transitions are smooth (0.2s ease)
- [ ] Click triggers clipboard copy (verify in console or paste elsewhere)
- [ ] Tooltip changes to "Copied!" after click
- [ ] Tooltip reverts to "Copy to clipboard" after 2 seconds
- [ ] Background color persists during tooltip revert (only text changes)
- [ ] Rapid clicks don't cause issues
- [ ] Mobile: Click works (hover tooltip won't show, which is acceptable)
- [ ] Other links on page are unaffected
- [ ] No console errors
- [ ] Tooltip is readable and positioned correctly (not cut off by viewport)

---

## Risk Assessment

**Low Risk:**
- Changes isolated to single element (`.contact__email`)
- No HTML changes needed (attribute-based tooltip)
- Minimal JavaScript, no library dependencies
- Fallback for clipboard failures included

**Moderate Consideration:**
- Tooltip positioning might need adjustment on smaller screens
- Could add `@media` query to adjust `top` value on mobile if needed

---

## Browser Compatibility Notes

- **Clipboard API:** Supported in modern browsers (Chrome 63+, Firefox 53+, Safari 13.1+, Edge 79+)
- **CSS `attr()`:** Used for dynamic tooltip text in `::before` content — widely supported
- **CSS transitions:** Widely supported
- **Fallback behavior:** Error handling in place if clipboard API unavailable

---

## Summary

This implementation uses:
1. **Pure CSS** for tooltip styling and hover states
2. **Minimal JavaScript** for clipboard interaction and tooltip text swapping
3. **No external libraries**
4. **Attribute-based dynamic content** via `data-tooltip` and `content: attr(data-tooltip)`
5. **Proper error handling** for clipboard API failures
6. **Smooth transitions** (0.2s ease) for visual polish
