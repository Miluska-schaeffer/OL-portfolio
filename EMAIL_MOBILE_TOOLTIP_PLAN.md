# Email Mobile Tap Tooltip Plan

## Problem

On mobile, the email tooltip is CSS-only (`::before` with opacity controlled by `:hover`). Since `:hover` is now disabled for touch devices via `@media (hover: hover)`, the tooltip is never visible on mobile — including the "Copied!" confirmation after tap.

The user wants "Copied!" to appear when tapping the email on mobile.

## Solution

Add a CSS class `.tooltip-visible` that forces the tooltip visible regardless of hover. Toggle this class in JavaScript inside the existing click handler — add it on click, remove it after 2 seconds.

This keeps the tooltip invisible on mobile by default (correct — no "Copy to clipboard" prompt needed since there's no hover), but shows "Copied!" explicitly via JS after a successful tap.

## Implementation

### 1. style.css — add one new rule

After the existing `.contact__email::before` block, add:

```css
.contact__email.tooltip-visible::before {
  opacity: 1;
}
```

This forces the tooltip visible when the class is present, independent of hover state or media query.

---

### 2. main.js — update the click handler

**Current (line ~141-153):**
```javascript
await navigator.clipboard.writeText(email)

const originalTooltip = emailLink.getAttribute('data-tooltip')
emailLink.setAttribute('data-tooltip', 'Copied!')
emailLink.classList.add('copied-state')

setTimeout(() => {
  emailLink.setAttribute('data-tooltip', originalTooltip)
  emailLink.classList.remove('copied-state')
}, 2000)
```

**Updated:**
```javascript
await navigator.clipboard.writeText(email)

emailLink.setAttribute('data-tooltip', 'Copied!')
emailLink.classList.add('tooltip-visible')

setTimeout(() => {
  emailLink.setAttribute('data-tooltip', 'Copy to clipboard')
  emailLink.classList.remove('tooltip-visible')
}, 2000)
```

Changes:
- Replace `copied-state` class with `tooltip-visible` (more descriptive, used in CSS)
- Remove `originalTooltip` variable — the original is always "Copy to clipboard", simpler to hardcode
- Same pattern applied to the error state (show "Copy failed" tooltip, then revert)

---

## Behaviour by Device

| Device | Before tap | On tap | After 2s |
|--------|-----------|--------|----------|
| Desktop | "Copy to clipboard" tooltip on hover | Clipboard copies, tooltip changes to "Copied!" | Tooltip reverts to "Copy to clipboard" |
| Mobile | No tooltip visible | Clipboard copies, "Copied!" tooltip appears | Tooltip hides |

## Files Changed

| File | Change |
|------|--------|
| `style.css` | Add `.contact__email.tooltip-visible::before { opacity: 1 }` |
| `main.js` | Update click handler to use `tooltip-visible` class instead of `copied-state` |

## Risk: Very Low

- One new CSS rule, small JS update
- Doesn't affect desktop behaviour
- Doesn't affect social link tooltips
