# Animation Plan – OL Portfolio

Scroll-triggered text animations inspired by helga.ch editorial style.

---

## Animation 1 — Title Reveal
**Applied to:** `.about__name` (H1) + all `h2` elements

- Text is split into lines at runtime; each line wrapped in `overflow: hidden`
- Inner span starts at `translateY(105%)` and slides to `translateY(0)`
- **Duration:** 0.7s
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — fast in, smooth settle
- **Stagger:** 100ms per line

## Animation 2 — Lead Fade
**Applied to:** all `h3` + all `p` elements

- Starts at `opacity: 0` + `translateY(20px)`, transitions to `opacity: 1` + `translateY(0)`
- **Duration:** 0.6s
- **Easing:** `ease-out`
- **Delay:** 0.15s base

---

## Trigger
Both animations use `IntersectionObserver` at `threshold: 0.2`. They play once and unobserve after firing.

## Accessibility
- All title elements get `aria-label` set to their original text before line-splitting
- Wrapped in `@media (prefers-reduced-motion: no-preference)` — no animation for users who prefer reduced motion

---

## Tweaking

| What | Where | Effect |
|------|-------|--------|
| Title speed | `transition: transform 0.7s` in `.line-inner` | Lower = faster |
| Line stagger | `${i * 100}ms` in `main.js` | Lower = tighter |
| Title easing | `cubic-bezier(0.16, 1, 0.3, 1)` | First value → more/less initial settle |
| Lead speed | `transition: 0.6s` in `.anim-lead` | Lower = faster |
| Lead delay | `transition-delay: 0.15s` in `.anim-lead` | Increase to push lead further after title |
| Trigger point | `threshold: 0.2` in `main.js` | Lower = fires earlier on scroll |
