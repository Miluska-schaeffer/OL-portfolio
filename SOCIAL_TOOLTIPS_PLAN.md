# Social Media Links Tooltip Plan

## Current State

**Social Links Structure** (`index.html:31-39`):
- Three social media links with class `.social-link`
- LinkedIn: `<a href="...linkedin..." aria-label="LinkedIn" class="social-link">in</a>`
- Instagram: `<a href="...instagram..." aria-label="Instagram" class="social-link">@</a>`
- SoundCloud: `<a href="...soundcloud..." class="social-link"><svg>...</svg></a>`

**Current Styling** (`style.css:602-617`):
- Circular buttons (50px × 50px)
- Border: 2px solid with link color
- Hover: Changes border color + transforms
- Flex layout in `.social-links` container
- Uses `--transition-base` for hover animations

**Existing Tooltip Pattern**:
- Email tooltip uses `::before` pseudo-element
- Positioned right-side, centered vertically
- Uses `content: attr(data-tooltip)` for dynamic text
- Consistent styling: dark background, white text, small font

## Target Behavior

**Tooltips on Hover:**
1. LinkedIn → "LinkedIn"
2. Instagram → "Instagram" (or "IG")
3. SoundCloud → "SoundCloud"

**Appearance:**
- Match email tooltip styling (dark background, white text, small font)
- Positioned on right side of icon, vertically centered
- Appears on hover, fades in smoothly
- Consistent visual language across page

## Implementation Strategy

### Changes Required: 2 files

---

### 1. HTML Changes (`index.html:32-38`)

**Add `data-tooltip` attribute to each social link:**

**Current:**
```html
<a href="https://www.linkedin.com/in/olympios-efstathios-tsiflidis-845a70246/" aria-label="LinkedIn" class="social-link" target="_blank" rel="noopener noreferrer">in</a>
<a href="https://www.instagram.com/_olympios_" aria-label="Instagram" class="social-link" target="_blank" rel="noopener noreferrer">@</a>
<a href="https://soundcloud.com/0lympios" aria-label="SoundCloud" class="social-link" target="_blank" rel="noopener noreferrer">
  <svg>...</svg>
</a>
```

**Updated:**
```html
<a href="https://www.linkedin.com/in/olympios-efstathios-tsiflidis-845a70246/" aria-label="LinkedIn" class="social-link" data-tooltip="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
<a href="https://www.instagram.com/_olympios_" aria-label="Instagram" class="social-link" data-tooltip="Instagram" target="_blank" rel="noopener noreferrer">@</a>
<a href="https://soundcloud.com/0lympios" aria-label="SoundCloud" class="social-link" data-tooltip="SoundCloud" target="_blank" rel="noopener noreferrer">
  <svg>...</svg>
</a>
```

**Change:** Add `data-tooltip="[Platform Name]"` to each link

---

### 2. CSS Changes (`style.css:602-620`)

**Add tooltip `::before` pseudo-element to `.social-link`:**

Insert new rule after `.social-link` base styles (around line 613):

```css
.social-link::before {
  content: attr(data-tooltip);
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: 0.75rem;
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

.social-link:hover::before {
  opacity: 1;
}
```

**Also Update `.social-link` base rule:**
- Add `position: relative;` (required for absolute positioning of `::before`)

**Updated `.social-link` rule:**
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
  position: relative;  /* ADD THIS */
}
```

---

### 3. No JavaScript Changes Required

- Tooltips will work purely with CSS
- `data-tooltip` attributes are picked up by CSS `content: attr(data-tooltip)`
- No dynamic behavior needed (unlike email's "Copied!" state)

---

## Visual Result

When hovering over social icons:
- Tooltip appears to the right of the icon
- Vertically centered with the icon
- Dark tooltip box with white text
- Smooth fade-in (0.2s ease)
- Matches email tooltip styling exactly

**Example layout:**
```
[LinkedIn Icon] ← "LinkedIn" tooltip appears here
[IG Icon] ← "Instagram" tooltip appears here
[SoundCloud Icon] ← "SoundCloud" tooltip appears here
```

---

## Consistency with Existing Tooltips

✓ Same pseudo-element technique (`::before`)
✓ Same positioning (right-side, vertically centered)
✓ Same styling (dark background, white text, small font)
✓ Same transitions (0.2s ease opacity)
✓ Same z-index (10)
✓ Same spacing (0.75rem margin-left)

---

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Add `data-tooltip` attribute to 3 social links (lines 32, 33, 34) |
| `style.css` | Add `position: relative` to `.social-link` + add `::before` tooltip styles |

---

## Testing Checklist

- [ ] Hover over LinkedIn icon → "LinkedIn" tooltip appears on right
- [ ] Hover over Instagram icon → "Instagram" tooltip appears on right
- [ ] Hover over SoundCloud icon → "SoundCloud" tooltip appears on right
- [ ] Tooltips are vertically centered with icons
- [ ] Tooltips fade in smoothly (0.2s)
- [ ] Tooltips match email tooltip styling
- [ ] Icons remain clickable with tooltip visible
- [ ] No layout shift when tooltip appears
- [ ] Works on mobile (tooltips won't show on hover, but no errors)

---

## Risk Assessment

**Risk Level: Very Low**

- Simple HTML attribute additions (no structure changes)
- Reuses existing tooltip CSS pattern from email
- No JavaScript complexity
- No impact on existing styles (only additions)
- Tested pattern (email tooltip already working)
- Minimal CSS additions with clear scoping

---

## Browser Compatibility

- CSS `attr()` in `content` property: Widely supported
- CSS `::before` pseudo-element: All modern browsers
- No new dependencies or polyfills needed
