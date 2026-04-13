# Deployment Guide – Vercel

This guide walks you through deploying your portfolio to Vercel for free.

---

## Prerequisites

Before deploying, make sure you have:
- [ ] A GitHub account (free at github.com)
- [ ] Git installed locally
- [ ] Your code pushed to a GitHub repository

---

## Pre-Deployment Checklist

Before deploying, make sure to test locally:

- [ ] Run `npm run dev` and visit http://localhost:3001
- [ ] Test responsiveness on mobile (resize browser to ~375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1200px+ width)
- [ ] Verify all links work (contact links, social links, back-to-top)
- [ ] Check all text is readable and properly formatted
- [ ] Test smooth scrolling behavior
- [ ] Verify no console errors (F12 → Console tab)

---

## Step 1: Prepare Your GitHub Repository

### 1.1 Initialize Git (if not already done)
```bash
cd /Users/miluskaschaeffer/Documents/claude-website
git init
git add .
git commit -m "Initial portfolio commit"
```

### 1.2 Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name your repo (e.g., `portfolio` or `claude-website`)
3. Choose "Public" (Vercel needs access)
4. Click **Create repository**

### 1.3 Push Your Code to GitHub
Follow GitHub's instructions after creating the repo. Typically:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 2: Connect to Vercel

### 2.1 Sign Up / Log In to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (or **Log In** if you have an account)
3. Choose **Continue with GitHub** and authorize Vercel

### 2.2 Import Your Project
1. After logging in, click **Add New...** → **Project**
2. Select **Import Git Repository**
3. Find and select your GitHub repository
4. Click **Import**

---

## Step 3: Configure Build Settings

### 3.1 Framework Preset
- Vercel should auto-detect **Vite** as your framework
- If not, select it manually from the dropdown

### 3.2 Build Output Directory
- **Framework:** Vite (auto-configured)
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `dist` (auto-filled)
- **Install Command:** `npm install` (auto-filled)

### 3.3 Environment Variables
- Leave empty for now (no environment secrets needed)

### 3.4 Click **Deploy**
Vercel will:
1. Install dependencies (`npm install`)
2. Run your build (`npm run build`)
3. Deploy to their CDN
4. Give you a live URL

---

## Step 4: Get Your Live URL

After deployment completes:
1. You'll see a **Success** screen
2. Your site is live at: `https://YOUR_PROJECT_NAME.vercel.app`
3. Copy this URL and test it in your browser

---

## Step 5: Auto-Deploy on Every Push

From now on, whenever you push code to GitHub:
```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel automatically detects the push and redeploys your site. No manual steps needed.

---

## Step 6: Add a Custom Domain (Later)

When you're ready to use your own domain:

### 6.1 Purchase a Domain
- Use any registrar (Namecheap, GoDaddy, Google Domains, etc.)
- Choose your domain name

### 6.2 Connect to Vercel
1. In Vercel dashboard, go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your custom domain
4. Follow Vercel's DNS setup instructions
5. Update your registrar's DNS records (Vercel provides the values)

Your portfolio will be live at your custom domain in 24–48 hours.

---

## Troubleshooting

### Build Fails with "Module not found"
- Make sure all dependencies are in `package.json`
- Run `npm install` locally and commit `package-lock.json`

### Site shows 404 or blank page
- Check that `vite.config.js` exists
- Verify `index.html` is in the root directory
- Check build output: should be in `/dist` folder

### Custom domain not working
- Wait 24–48 hours for DNS propagation
- Verify DNS records in your registrar's settings
- Check Vercel dashboard under Domains for status

---

## Next Steps After Deployment

1. **Test the live site** – Visit your Vercel URL and test all links
2. **Share your portfolio** – Send the link to recruiters, collaborators, etc.
3. **Keep it updated** – Push changes to GitHub, Vercel auto-deploys
4. **Add analytics** (optional) – Enable Vercel Web Analytics in dashboard
5. **Monitor performance** – Use Vercel's analytics and Lighthouse scores

---

## Quick Reference

| Action | Command |
|--------|---------|
| Start local dev server | `npm run dev` |
| Build for production | `npm run build` |
| Preview production build | `npm run preview` |
| Push to GitHub | `git push` |
| Redeploy (auto) | Push to GitHub → Vercel redeploys |

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **GitHub Docs:** https://docs.github.com

