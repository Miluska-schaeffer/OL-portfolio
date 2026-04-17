# Mobile Tooltip Stuck Open Fix Plan

## Root Cause

On touch devices, CSS `:hover` is triggered on tap and **never dismissed** — there is no "mouse leave" equivalent. So when a user taps a social icon, the tooltip appears and stays visible indefinitely.

This affects all three social link tooltips (`.social-link::before`) since they are shown purely via `.social-link:hover::before { opacity: 1 }`.

The email tooltip is less of an issue since clicking it triggers a JS action (clipboard copy), but the same mechanism applies.

## Solution

Use the CSS media query `@media (hover: hover)` to scope all tooltip `:hover` styles **only to devices that support true hover** (mouse/trackpad). Touch-only devices report `hover: none` and will never see the tooltip.

This is the standard, library-free solution for this exact problem.

## Implementation

### File: `style.css` only

**Two hover rules need to be wrapped:**

---

### 1. Social link tooltip show rule (currently line ~643)

**Current:**
```css
.social-link:hover::before {
  opacity: 1;
}
```

**Updated:**
```css
@media (hover: hover) {
  .social-link:hover::before {
    opacity: 1;
  }
}
```

---

### 2. Email tooltip show rule (currently line ~591)

**Current:**
```css
.contact__email:hover::before {
  opacity: 1;
}
```

**Updated:**
```css
@media (hover: hover) {
  .contact__email:hover::before {
    opacity: 1;
  }
}
```

---

## What Changes

| Device | Before | After |
|--------|--------|-------|
| Desktop (mouse) | Tooltip shows on hover ✓ | Tooltip shows on hover ✓ (unchanged) |
| Mobile (touch) | Tooltip shows on tap and stays stuck | Tooltip never shows (clean tap behaviour) |
| Tablet with mouse | Tooltip shows on hover ✓ | Tooltip shows on hover ✓ (unchanged) |

## What Stays the Same

- Email clipboard copy on click still works on mobile (that's JS, not CSS hover)
- Social links still navigate to correct URLs on mobile tap
- All desktop hover behaviour is completely unchanged

## Files Changed

| File | Change |
|------|--------|
| `style.css` | Wrap 2 `:hover::before` rules in `@media (hover: hover)` |

## Risk: Very Low

- Standard CSS feature, supported in all modern browsers
- Purely additive — wrapping existing rules, not replacing them
- No JavaScript changes needed
- No HTML changes needed
