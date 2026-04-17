# Column Animation Timing Plan

## Current State

| Element | Duration | Delay |
|---------|----------|-------|
| `.card-left` | 2.5s | 0s |
| `.card-right` | 2.5s | 0.3s |

Left column starts immediately and finishes at ~2.5s.
Right column starts at 0.3s and finishes at ~2.8s.
They appear at slightly different times.

## Target State

| Element | Duration | Delay |
|---------|----------|-------|
| `.card-left` | 3s | 0s |
| `.card-right` | 3s | 0s |

Both columns start at the same time and finish together at ~3s.

## Changes: style.css only

**Current (lines 280–287):**
```css
.card-left {
  animation: softFadeIn 2.5s ease-out forwards;
}

.card-right {
  animation: softFadeIn 2.5s ease-out forwards;
  animation-delay: 0.3s;
}
```

**Updated:**
```css
.card-left {
  animation: softFadeIn 3s ease-out forwards;
}

.card-right {
  animation: softFadeIn 3s ease-out forwards;
}
```

## What Changes
- Both durations: 2.5s → 3s
- `.card-right` delay: 0.3s → removed (0s)

## What Stays the Same
- Footer animation: untouched
- `softFadeIn` keyframe: untouched
- All other card styles: untouched
