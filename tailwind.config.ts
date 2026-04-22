import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:  '#f6eadf',
        yellow: '#f8b114',
        dark:   '#320e10',
        orange: '#e8511b',
      },
      fontFamily: {
        display: ['"Folkies Vantage Script"', 'Georgia', 'serif'],
        body:    ['"Beatrice"', 'Arial', 'sans-serif'],
        gulp:    ['"Gulp"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
