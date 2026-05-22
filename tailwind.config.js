/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        navy: {
          950: '#0a1628',
          900: '#0f2044',
          800: '#162d5e',
          700: '#1d3a78',
          600: '#254892',
          500: '#2e57ac',
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #0a1628 0%, #162d5e 100%)',
        'gradient-red': 'linear-gradient(135deg, #cc2222, #991b1b)',
      },
    },
  },
  plugins: [],
}
