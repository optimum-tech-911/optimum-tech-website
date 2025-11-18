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

