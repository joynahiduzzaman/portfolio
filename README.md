<div align="center">

# 🚀 Premium Portfolio — Production Build

**A world-class full stack software engineer portfolio**
Built with React 18 · Vite 5 · Tailwind CSS · Framer Motion

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)

</div>

---

## ✨ Features

| Category | What's included |
|---|---|
| **Design** | Dark/light mode, glassmorphism, fluid typography, design tokens |
| **Animations** | Framer Motion stagger, spring physics, canvas starfield, spotlight beams |
| **Performance** | Lazy loading, code splitting, canvas RAF, `content-visibility` |
| **Accessibility** | WCAG 2.1 AA focus rings, skip-link, ARIA labels, `prefers-reduced-motion` |
| **SEO** | JSON-LD, Open Graph, Twitter Card, sitemap, robots.txt |
| **DevEx** | Path aliases, ESLint a11y, centralized config, custom hooks library |
| **Deployment** | Vercel-ready, GitHub Actions CI/CD, security headers |

---

## 🏁 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Start dev server
npm run dev          # → http://localhost:5173
```

---

## 🔧 Personalization (5 minutes)

All personal data lives in **one file**:

```
src/config/site.js
```

Update these fields:
- `name`, `initials`, `title`, `bio`, `location`, `email`
- `social.github/linkedin/twitter`
- `seo.title/description/siteUrl`
- `emailjs.serviceId/templateId/publicKey`

Then update the data files in `src/data/`:
- `projects.js` — your projects with real URLs
- `experience.js` — your work history
- `skills.js` — your skill levels
- `testimonials.js` — client testimonials

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg          # SVG favicon (auto-scales)
│   ├── resume.pdf           # ← DROP YOUR RESUME HERE
│   ├── og-image.png         # ← 1200×630 social preview image
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
│
├── src/
│   ├── config/
│   │   └── site.js          # ← SINGLE SOURCE OF TRUTH
│   │
│   ├── components/          # UI components (one per file)
│   │   ├── ui/index.jsx     # Shared primitives (SectionTitle, Button, GlowBlob…)
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx     # SaaS showcase with canvas previews + modal
│   │   ├── Experience.jsx
│   │   ├── Services.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── CursorGlow.jsx
│   │   └── ParticleBackground.jsx
│   │
│   ├── hooks/
│   │   └── index.js         # useReducedMotion, useTilt, useMagnetic, useMouseParallax…
│   │
│   ├── lib/
│   │   └── utils.js         # cn, clamp, debounce, throttle, hexToRgba…
│   │
│   ├── design/
│   │   └── tokens.js        # Colors, gradients, shadows, easing constants
│   │
│   ├── utils/
│   │   └── animations.js    # Framer Motion variant library
│   │
│   ├── data/                # Content data — edit to personalize
│   │   ├── projects.js
│   │   ├── experience.js
│   │   ├── skills.js
│   │   ├── services.js
│   │   └── testimonials.js
│   │
│   ├── context/
│   │   └── ThemeContext.jsx
│   │
│   ├── styles/
│   │   └── globals.css      # Tailwind base + custom utilities + a11y
│   │
│   ├── App.jsx
│   └── main.jsx             # Error boundary + StrictMode mount
│
├── .env.example             # Environment variable template
├── .eslintrc.cjs            # ESLint with jsx-a11y rules
├── .gitignore
├── vercel.json              # Vercel deployment + security headers
├── tailwind.config.js
└── vite.config.js           # Path aliases + code splitting
```

---

## 🚀 Deployment

### Vercel (Recommended — 1 click)

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables (from `.env.example`)
4. Deploy → done

### Manual

```bash
npm run build     # outputs to /dist
# Upload /dist to any static host (Netlify, GitHub Pages, S3+CloudFront)
```

### Environment Variables

Set these in Vercel dashboard → Settings → Environment Variables:

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

---

## 📧 EmailJS Setup

1. Create account at [emailjs.com](https://emailjs.com)
2. Add an **Email Service** (Gmail, Outlook, etc.)
3. Create an **Email Template** with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Copy Service ID, Template ID, and Public Key into `.env.local`

---

## 🔮 Future Integration Points

### Backend API
```js
// src/config/site.js — uncomment and set:
// VITE_API_BASE_URL=https://api.yourportfolio.dev
```

A REST API stub lives in `src/lib/` — add `api.js` with:
```js
const API = import.meta.env.VITE_API_BASE_URL;
export const fetchProjects = () => fetch(`${API}/projects`).then(r => r.json());
```

### CMS Integration (Contentful / Sanity / Strapi)
Replace static `src/data/*.js` files with async fetchers:
```js
// src/data/projects.js → src/lib/cms.js
export const getProjects = async () => {
  const res = await fetch(`${CMS_URL}/projects`);
  return res.json();
};
```

### Analytics
Uncomment in `src/config/site.js`:
```js
analytics: { googleId: 'G-XXXXXXXXXX' }
```
Then add `@analytics/google-analytics` or use Vercel Analytics.

---

## 🏆 Lighthouse Score Targets

| Metric | Target |
|---|---|
| Performance | 90+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Run locally: `npm run build && npm run preview` then open Chrome DevTools → Lighthouse.

---

## 📝 License

MIT — free to use and modify. Attribution appreciated but not required.
