# Pedro Quispe Portfolio Website

A modern, responsive one-page portfolio for an Event Coordinator in the music industry. Built with Vite, vanilla HTML/CSS/JavaScript, and designed with a clean, editorial aesthetic.

---

## Quick Start

### Local Development
```bash
npm install
npm run dev
```
Opens automatically at `http://localhost:3001`

### Build for Production
```bash
npm run build
```
Output: `/dist` directory ready for deployment

---

## Project Structure

```
claude-website/
├── index.html              # Single-page HTML structure
├── style.css              # All styles (responsive, mobile-first)
├── main.js               # JavaScript (smooth scroll, interactions)
├── vite.config.js        # Vite build configuration
├── package.json          # Dependencies and scripts
│
├── plan.md               # Implementation plan & roadmap
├── RESPONSIVE.md         # Responsive design documentation
├── DEPLOYMENT.md         # Step-by-step deployment guide
├── README.md             # This file
│
└── public/
    └── assets/
        ├── backdrop3.png  # Full-page background image
        └── favicon.svg    # Black square with "OL" initials
```

---

## Key Features

### Design
- **Mobile-First Responsive:** Works seamlessly on phone, tablet, and desktop
- **Clean Editorial Aesthetic:** Minimalist design with focus on content
- **Custom Typography:** Strait font (body) + Mona Sans (secondary)
- **Light Theme:** #F5F5F5 background, #2C2C2C text, #BBBBBB accents
- **Smooth Animations:** Fade-in effects and hover transitions
- **Custom Favicon:** Black square with white "OL" initials

### Technical
- **No Frameworks:** Vanilla HTML/CSS/JavaScript only
- **Vite Build Tool:** Fast development and optimized production builds
- **CSS Variables:** Design tokens for easy theming and maintenance
- **Semantic HTML5:** Proper structure for accessibility
- **Google Fonts Integration:** Optimized font loading with `font-display=swap`

### Layout
- **Two-Column Grid (Desktop):** Asymmetric layout with left sidebar + main content
- **Single Column (Mobile/Tablet):** All content stacks vertically
- **1200px Breakpoint:** Responsive grid transitions at 1200px width

---

## Sections

### 1. About
- Name, location, role, and bio
- Email contact and social links
- Integrated "Get in Touch" section

### 2. Skills
- Three service cards describing key expertise
- Event Operations, Production Support, Artist Liaison

### 3. Work / Portfolio
- Multiple project cards with details
- Renegade Methodz label work samples
- Release campaigns and collaboration highlights

### 4. Contact
- Email link
- Social media links (LinkedIn, Instagram, SoundCloud)

---

## Responsive Behavior

| Device | Width | Columns | Layout |
|--------|-------|---------|--------|
| Mobile | 0–767px | 1 | Stacked vertically |
| Tablet | 768px–1199px | 1 | Stacked vertically |
| Desktop | 1200px+ | 2 | Side-by-side (asymmetric) |

**Desktop Layout:**
- Left column (narrower): About + Skills + Contact
- Right column (wider): Work/Portfolio

See [RESPONSIVE.md](./RESPONSIVE.md) for detailed responsive design documentation.

---

## Colors & Typography

### Color Palette
```css
--color-bg: #F5F5F5         /* Background */
--color-text: #2C2C2C       /* Primary text */
--color-accent: #BBBBBB     /* Accents & borders */
--color-white: #FFFFFF      /* Highlights */
```

### Typography
```css
--font-primary: 'Strait', sans-serif      /* Body text */
--fs-h1: clamp(2.5rem, 5vw, 4rem)       /* Responsive H1 */
--fs-body: clamp(0.95rem, 2vw, 1rem)    /* Responsive body */
```

---

## Deployment

Ready to go live? Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide for:
- Pushing code to GitHub
- Connecting to Vercel
- Setting up automatic deployments
- Adding a custom domain

**Recommended hosting:** [Vercel](https://vercel.com) (free tier, optimized for Vite)

---

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server on port 3001 |
| `npm run build` | Build production-ready files to `/dist` |
| `npm run preview` | Preview production build locally |

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Tested down to **375px width** (iPhone SE) and up to **1920px** (Full HD).

---

## Accessibility

- Semantic HTML5 structure
- Proper heading hierarchy (H1 → H3)
- Color contrast meets WCAG AA standards
- Alt text on images
- Keyboard-accessible links
- Focus states on interactive elements

---

## Performance

- **Build:** Minified with Terser
- **Fonts:** Google Fonts with `font-display=swap` for fast rendering
- **Images:** Optimized background image
- **CSS:** Mobile-first approach reduces file size
- **JavaScript:** Minimal vanilla JS (no frameworks)

---

## File Sizes

- **HTML:** ~8 KB
- **CSS:** ~20 KB (unminified)
- **JavaScript:** ~1 KB (unminified)
- **Total (minified + gzipped):** ~15 KB

---

## Next Steps

After development, deployment roadmap:

### Phase 1: Pre-Deployment ✅
- [x] Build & design
- [x] Responsive testing
- [x] Code quality

### Phase 2: Deploy to Vercel
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Get live URL (*.vercel.app)

### Phase 3: Custom Domain (Optional)
- [ ] Purchase domain
- [ ] Point DNS to Vercel
- [ ] Test custom domain

### Phase 4: Enhancements (Later)
- [ ] Analytics
- [ ] SEO optimization
- [ ] Content updates

---

## Documentation

- **[plan.md](./plan.md)** – Original design plan & current implementation status
- **[RESPONSIVE.md](./RESPONSIVE.md)** – Detailed responsive design guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** – Step-by-step deployment instructions

---

## Support & Resources

- **Vite:** https://vitejs.dev
- **Google Fonts:** https://fonts.google.com
- **Responsive Design:** https://web.dev/responsive-web-design-basics/
- **Vercel Docs:** https://vercel.com/docs

---

## License

This portfolio is a custom design for Pedro Quispe. Feel free to use as reference or template for your own projects.

---

**Last Updated:** 2026-04-13  
**Status:** Ready for deployment ✅

