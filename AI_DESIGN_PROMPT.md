# Design System & Aesthetic Guide: "Apple-Inspired Premium Minimalist"

This document serves as a comprehensive guide to the design language, UI patterns, and animation principles used in this project. **Provide this file to any AI agent to replicate this exact aesthetic and feel in future web projects.**

## 1. Core Philosophy
The design is heavily inspired by Apple's modern web aesthetic. It relies on three main pillars:
1. **Simplicity & Whitespace:** Let the content breathe. Avoid clutter. Use generous padding and margins.
2. **Depth & Layers:** Use soft shadows, glassmorphism (background blur), and overlapping elements to create a sense of physical depth.
3. **Fluidity:** Nothing should appear instantly. Every entrance, exit, and interaction must be animated with smooth, physics-based transitions (springs) or gentle easing.

## 2. Color Palette
The color scheme is highly constrained to maintain a premium feel:
*   **Background (`apple-bg`):** `#FBFBFD` (A very light, warm off-white. Never use pure `#FFFFFF` for the main background).
*   **Surface (`apple-surface`):** `#FFFFFF` (Pure white, used for cards and elevated elements to contrast with the off-white background).
*   **Primary Text (`apple-text`):** `#1D1D1F` (Deep gray/soft black. Never use pure `#000000`).
*   **Secondary Text (`apple-text-muted`):** `#86868B` (Muted gray for descriptions and subtitles).
*   **Brand/Accent (`brand`):** `#5A2A82` (Deep purple in this specific project, but can be swapped. Used sparingly for primary buttons, active states, and subtle glowing shadows).

## 3. Typography
*   **Font Family:** Clean Sans-Serif (Inter, SF Pro, or similar).
*   **Headings:** Large, bold (`font-bold` or `font-semibold`), with tight letter spacing (`tracking-tighter` or `tracking-tight`).
*   **Body Text:** Medium to large text (`text-lg` or `text-xl`), light font weight (`font-light`), and relaxed line height (`leading-relaxed`).

## 4. UI Components & Styling
*   **Border Radius:** Extremely rounded corners. Use `rounded-2xl` (1rem), `rounded-3xl` (1.5rem), or `rounded-[2rem]` to `rounded-[3rem]` for large cards and sections.
*   **Shadows:** Soft, diffused shadows. 
    *   Standard: `shadow-lg` or `shadow-xl` with very low opacity (e.g., `shadow-gray-200/50`).
    *   Accent: Colored shadows for brand elements (e.g., `shadow-brand/20`).
*   **Borders:** Very subtle borders on cards to define edges (`border border-gray-100` or `border-white/50`).
*   **Glassmorphism:** Used for sticky navbars or floating overlays. Tailwind classes: `bg-white/70 backdrop-blur-xl` or `bg-apple-bg/95 backdrop-blur-xl`.

## 5. Animation & Interaction Patterns (Framer Motion)
This is the most critical part of the aesthetic. All animations should use `framer-motion`.

### A. Scroll Reveals ("Stuff that pops up")
Elements should not be visible immediately. As the user scrolls down, elements should gently fade in and slide up.
*   **Initial state:** `opacity: 0, y: 50` (or `y: 20` for smaller elements).
*   **Animate state:** `opacity: 1, y: 0`.
*   **Transition:** `duration: 0.8, ease: [0.16, 1, 0.3, 1]` (a custom cubic-bezier that starts fast and slows down smoothly).
*   *Implementation:* Use a reusable `<ScrollSection>` component wrapping `framer-motion`'s `useInView`.

### B. 3D Parallax Scrolling
To create depth, elements should move at different speeds relative to the scroll position.
*   *Implementation:* Use `useScroll` and `useTransform` from `framer-motion`.
*   Map `scrollYProgress` to `y` values (e.g., `[0, 1]` maps to `[100, -50]`).
*   For 3D tilting, map scroll progress to `rotateX` and `rotateY` (e.g., `rotateX: [20, 0]`). Apply `transformStyle: "preserve-3d"` to the container.

### C. Micro-interactions (Hover & Focus)
*   **Buttons/Cards Hover:** Subtle scale up (`scale: 1.05` or `scale: 1.02`), slight shadow increase.
*   **Form Inputs Focus:** When an input is focused, it should scale up microscopically (`scale: 1.02`), the background should turn pure white, and a soft colored shadow should appear (`boxShadow: "0px 4px 20px rgba(BrandColor, 0.08)"`).

### D. Shared Layout Transitions (Expanding Elements)
When clicking a card to view details (like a portfolio project), it should not just open a sudden modal. The card should physically expand into the modal.
*   *Implementation:* Use `AnimatePresence` and `layoutId` in `framer-motion`.
*   Match the `layoutId` of the thumbnail image to the `layoutId` of the hero image in the modal.

## 6. Prompting Instructions for AI Agents
To use this guide with an AI, use the following prompt:

> "I want to build a [Type of App/Website]. Please read the `AI_DESIGN_PROMPT.md` file in the root directory. I want you to strictly follow the 'Apple-Inspired Premium Minimalist' design system described there. Use Tailwind CSS for styling and Framer Motion for all animations. Ensure you implement the Scroll Reveals, Glassmorphism, and Micro-interactions exactly as described."
