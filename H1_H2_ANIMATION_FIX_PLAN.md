# H1/H2 Animation Repeat Fix Plan

## Root Cause

**On mobile, scrolling fires `resize` events.**

When a user scrolls on mobile, the browser's address bar hides/shows — this changes the viewport height, which triggers a `window.resize` event. The current resize handler at `main.js:104-120` responds to ANY resize event by:

1. Removing `.is-visible` from all `.anim-letters` elements (H1, Work H2, Skills H2)
2. Re-splitting the letters
3. Re-adding `.is-visible` — which **replays the full letter-by-letter animation**

This happens every time the address bar appears or disappears, causing animations to replay repeatedly during scrolling.

**On desktop:** The address bar doesn't hide/show on scroll, so `resize` is never fired during scrolling. This is why the bug doesn't occur on desktop.

## Why the resize handler exists

The resize handler was written to handle genuine screen resizes (e.g. rotating device, resizing browser window) where text may wrap differently and letter-spans need to be rebuilt. This is a valid concern — but the fix should only trigger when the **width** changes, not the **height**.

The address bar hide/show only changes viewport **height**, not width. Letter wrapping is only affected by width, so we can safely ignore height-only changes.

## Solution

**Track the previous viewport width and only re-run the animation logic if width actually changed.**

### main.js:103-120

**Current:**
```javascript
// Re-split letter elements on resize
let resizeDebounce
window.addEventListener('resize', () => {
  clearTimeout(resizeDebounce)
  resizeDebounce = setTimeout(() => {
    document.querySelectorAll('.anim-letters').forEach(el => {
      const wasVisible = el.classList.contains('is-visible')
      const baseDelay = parseInt(el.dataset.baseDelay || 0)
      el.classList.remove('is-visible')
      splitIntoLetters(el, baseDelay)
      if (wasVisible) {
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')))
      } else {
        textObserver.observe(el)
      }
    })
  }, 200)
})
```

**Updated:**
```javascript
// Re-split letter elements on resize — only if width changes (ignores mobile address bar height change)
let resizeDebounce
let lastWidth = window.innerWidth

window.addEventListener('resize', () => {
  clearTimeout(resizeDebounce)
  resizeDebounce = setTimeout(() => {
    const currentWidth = window.innerWidth
    if (currentWidth === lastWidth) return  // Height-only change (e.g. mobile address bar) — skip
    lastWidth = currentWidth

    document.querySelectorAll('.anim-letters').forEach(el => {
      const wasVisible = el.classList.contains('is-visible')
      const baseDelay = parseInt(el.dataset.baseDelay || 0)
      el.classList.remove('is-visible')
      splitIntoLetters(el, baseDelay)
      if (wasVisible) {
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')))
      } else {
        textObserver.observe(el)
      }
    })
  }, 200)
})
```

**Change:** Add `lastWidth` tracking. Early return if `window.innerWidth` hasn't changed. Only 3 lines added.

## Does this affect desktop?

No. On desktop, a genuine window resize changes the width, so `currentWidth !== lastWidth` and the logic runs as before. Behaviour on desktop is unchanged.

## Does this affect screen rotation on mobile?

Rotation changes the width, so `currentWidth !== lastWidth` and the letters re-split correctly. Behaviour on rotation is preserved.

## Files Changed

| File | Change |
|------|--------|
| `main.js` | Add `lastWidth` variable + early return if width unchanged (3 lines) |

## Risk Assessment

**Risk Level: Very Low**

- Minimal change, same logic preserved
- Only adds a guard condition — no structural changes
- Fixes mobile without touching desktop behaviour
- Rotation still works correctly
