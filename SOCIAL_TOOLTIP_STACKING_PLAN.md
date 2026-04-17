# Social Tooltip Stacking Order Plan

## Problem

Current behavior:
- LinkedIn tooltip appears *behind* Instagram icon
- Instagram tooltip appears *behind* SoundCloud icon

Desired behavior:
- LinkedIn tooltip should layer *above* Instagram button
- Instagram tooltip should layer *above* SoundCloud button

## Root Cause

All `.social-link` elements are siblings with equal `z-index: 1`. When LinkedIn's tooltip extends to the right, it's positioned behind the Instagram icon because:
- Instagram's `.social-link` has `z-index: 1` (same as LinkedIn)
- Stacking is determined by DOM order when z-index is equal
- Instagram appears later in DOM, so it's on top

## Solution

Add `z-index: 10` to `.social-link:hover` so the **hovered icon** rises above its neighboring icons.

This way:
- When hovering LinkedIn → LinkedIn's `.social-link:hover` gets `z-index: 10`, so its tooltip (with `z-index: 1000` inside) appears above all neighbors
- When hovering Instagram → Instagram's `.social-link:hover` gets `z-index: 10`, so its tooltip appears above all neighbors
- When hovering SoundCloud → SoundCloud's `.social-link:hover` gets `z-index: 10`, so its tooltip appears above all neighbors

## Implementation

### File: style.css (line 616-621)

**Current:**
```css
.social-link:hover {
  border-color: var(--color-link-hover);
  color: var(--color-link-hover);
  transform: translateY(-4px);
  background-color: var(--color-link-fill);
}
```

**Updated:**
```css
.social-link:hover {
  border-color: var(--color-link-hover);
  color: var(--color-link-hover);
  transform: translateY(-4px);
  background-color: var(--color-link-fill);
  z-index: 10;  /* ADD THIS */
}
```

## Why This Works

1. Base `.social-link` has `z-index: 1`
2. When hovered, `.social-link:hover` gets `z-index: 10` (higher than siblings)
3. The hovered link rises above all neighbors
4. The tooltip (`::before` with `z-index: 1000` inside) now appears above neighboring icons
5. Non-hovered links stay at `z-index: 1`, allowing other links to be hovered and layer on top

## Testing

- [ ] Hover over LinkedIn → tooltip appears above Instagram button
- [ ] Hover over Instagram → tooltip appears above SoundCloud button
- [ ] Hover over SoundCloud → tooltip appears (no neighbor to block it)
- [ ] Tooltips fade in/out smoothly
- [ ] No visual regression on other elements

## Risk Assessment

**Risk Level: Very Low**

- Single line addition to existing rule
- Only affects hovered state (temporary)
- Limited scope to social links only
- No impact on other page elements
