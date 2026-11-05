/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        sanskrit: ['"Tiro Devanagari Sanskrit"', 'serif'],
      },
      colors: {
        ink: '#08060F',
        night: '#0B0712',
        royal: '#15101F',
        parchment: '#F5E8C9',
        gold: '#D4AF37',
        goldlight: '#F5D061',
        saffron: '#FF8C42',
        crimson: '#B91C1C',
        sapphire: '#3B82F6',
        lotus: '#E879F9',
        jade: '#10B981',
      },
    },
  },
  plugins: [],
};
