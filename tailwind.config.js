/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A84FF',
        secondary: '#0D1117',
        accent: '#00E0B8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        pixelify: ['Pixelify Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: { glow: '0 0 25px rgba(10,132,255,0.35)' },
    },
  },
  plugins: [],
};
