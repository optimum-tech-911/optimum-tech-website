/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0A84FF',
        secondary: '#0D1117',
        accent: '#00E0B8',
        'apple-bg': '#FBFBFD',
        'apple-surface': '#FFFFFF',
        'apple-text': '#1D1D1F',
        'apple-text-muted': '#86868B',
        'apple-beige': '#F5F5F7',
        'brand': '#5A2A82',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'sans-serif'],
        pixelify: ['Pixelify Sans', 'Inter', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: { glow: '0 0 25px rgba(10,132,255,0.35)' },
    },
  },
  plugins: [],
};
