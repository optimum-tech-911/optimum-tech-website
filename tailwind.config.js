/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0A84FF',
        secondary: '#050607',
        accent: '#0A84FF',
        'apple-bg': '#FFFFFF',
        'apple-surface': '#FFFFFF',
        'apple-text': '#050607',
        'apple-text-muted': '#050607',
        'apple-beige': '#FFFFFF',
        'brand': '#0A84FF',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'sans-serif'],
        pixelify: ['Roboto Condensed', 'sans-serif'],
        grotesk: ['Roboto Condensed', 'sans-serif'],
      },
      boxShadow: { glow: '0 0 25px rgba(10,132,255,0.35)' },
    },
  },
  plugins: [],
};
