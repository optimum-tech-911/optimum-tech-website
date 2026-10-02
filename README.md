# Optimum Tech – Dev Setup

## Run locally

```bash
npm install
npm install framer-motion lucide-react react-router-dom
npm run dev
```

## Pages

- `/` → Home
- `/projects` → Projects (animated cards)
- `/contact` → Contact placeholder
- `/policy` → General Policy placeholder

## Stack

React + Vite + Tailwind + Framer Motion + React Router + Lucide React

## SEO build and rollout

`npm run build` generates prerendered HTML and a canonical sitemap, then runs the SEO audit. Use `npm run audit:seo` to check an existing build.

The [SEO rollout guide](docs/SEO-ROLLOUT.md) covers Montpellier and dentist targeting, deployment checks, Search Console, Google Business Profile and AI search discovery.

The [portfolio curation notes](docs/PORTFOLIO-CURATION.md) describe the ten selected projects, locally hosted previews and how to update the selection.

## Mobile Responsiveness

- Viewport: `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`
- Fluid typography: `html { font-size: clamp(14px, 1.5vw, 18px); }`
- Containers: `max-width: 100vw`, `overflow-x: hidden`; adaptive padding on mobile
- Overflow handling: `overflow-wrap: anywhere`, images `max-width: 100%`, tables scroll on mobile
- Touch targets: `.touch-target` ensures minimum `48x48px` on mobile
- Reduced motion: honors OS setting during card animations

### Tested Widths

- 320px, 360px, 390px, 414px, 480px, 640px, 768px
- Results: no horizontal scrolling, content fully visible, card titles readable, touch areas >= 48x48px

### Notes

- Expanded card clamps to `90vw/90vh` and centers; focused card clamps to `80vw/80vh`
- Use modern mobile Chrome/Safari for best performance; transforms and `will-change` applied
