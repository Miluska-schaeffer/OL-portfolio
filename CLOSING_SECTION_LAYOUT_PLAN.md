# Closing Section Layout Plan: Left/Right Split with Mobile Text Wrapping

## Goal
Reposition `.closing-section` elements to place "Feel free to reach out..." on the left and "Back to Top" link on the right, opposite to each other on one line. Text should wrap naturally on mobile with minimum 10px gap between elements. Apply `softFadeIn` animation and maintain responsiveness.

## Current State
- `.closing-section`: `display: flex` but lacks proper spacing/gap logic
- `.closing-text`: `text-align: left` 
- `.back-to-top-section`: `text-align: right`
- No animation applied
- No gap between elements

## P Element Animation Reference
- Animation: `softFadeIn` 
- Duration: 2.5s ease-out
- Delay: 1s (staggered with other page elements)

## Implementation Plan

### 1. HTML
No changes needed. Keep current structure:
```html
<div class="closing-section">
  <div class="closing-text">
    <p>Feel free to reach out, I'm happy to share more details about my experience.</p>
  </div>
  <div class="back-to-top-section">
    <a href="#" class="back-to-top" id="backToTop">↑ Back to Top</a>
  </div>
</div>
```

### 2. CSS Changes in `style.css`

**A. `.closing-section`**
- Keep: `display: flex` and `margin-top: var(--space-md)`
- Change: Remove any `justify-content: space-between` (use default flex-start)
- Add: `gap: 10px` for minimum spacing between elements
- Add: `align-items: flex-start` (allow text to wrap while link aligns to top)
- Add: `width: 100%`
- Add: `animation: softFadeIn 2.5s ease-out forwards`
- Add: `animation-delay: 1s`

**B. `.closing-text`**
- Keep: `text-align: left`
- Add: `flex: 1` (grows to fill available space, allows text to wrap)

**C. `.back-to-top-section`**
- Keep: `text-align: right`
- Add: `flex-shrink: 0` (prevents link from shrinking)
- Add: `white-space: nowrap` (keeps link on single line)

### 3. Responsive Behavior

**Desktop (1200px+):**
- Both elements visible horizontally
- Text wraps naturally as needed
- 10px gap maintained
- Link stays on right

**Tablet (768px–1199px):**
- Same as desktop
- Text wraps as viewport narrows

**Mobile (<768px):**
- Both elements on same line
- Text wraps to multiple lines: "Feel free to reach out, I'm happy to..." (wraps)
- Link stays on right: "↑ Back to Top"
- Minimum 10px gap prevents elements from touching
- Font sizes responsive via existing `--fs-body` and `--fs-small` tokens

### 4. Animation
- Apply `softFadeIn` animation to `.closing-section`
- Duration: 2.5s ease-out
- Delay: 1s (consistent with other page elements)
- Creates fade-in effect for both left and right elements together

## Layout Examples

**Desktop:**
```
Feel free to reach out, I'm happy to share more details    ↑ Back to Top
about my experience.
```

**Mobile (with wrapping):**
```
Feel free to reach out, I'm          ↑ Back to
happy to share more details about    Top
my experience.
```

## Testing Checklist
- [ ] Desktop: Text and link both visible, 10px gap maintained
- [ ] Mobile: Text wraps naturally, link stays on right, minimum 10px gap
- [ ] Text wrapping: Paragraph breaks at word boundaries (not mid-word)
- [ ] Animation: `softFadeIn` fades in the entire section on load
- [ ] No layout shifts during/after animation
- [ ] Link hover state works correctly
- [ ] "Back to Top" link functionality works (scroll to top)
- [ ] All breakpoints (tablet, mobile) tested
