import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand core ──────────────────────────────────────────
        cream:  '#f6eadf',
        yellow: '#f8b114',
        dark:   '#320e10',
        orange: '#e8511b',
        // ── Interaction states ──────────────────────────────────
        'orange-hover': '#d0481a',
        'yellow-hover': '#e8a010',
        'dark-hover':   '#4a1518',
        // ── Surfaces ────────────────────────────────────────────
        'surface-dark': '#3b1315', // elevated dark surface (cards, inputs)
        // ── Utility ─────────────────────────────────────────────
        whatsapp:      '#25d366',
        'whatsapp-ink': '#128c7e',
        error:         '#e2564a', // warm, brand-aligned error red
      },
      fontFamily: {
        display: ['"Folkies Vantage Script"', 'Georgia', 'serif'],
        body:    ['"Beatrice"', 'Arial', 'sans-serif'],
        gulp:    ['"Gulp"', 'Georgia', 'serif'],
      },
      transitionDuration: {
        fast:    '160ms',
        DEFAULT: '200ms',
        base:    '200ms',
        slow:    '280ms',
      },
      borderRadius: {
        sm:    '12px', // chips, small surfaces
        md:    '14px', // buttons, inputs
        lg:    '20px', // medium cards
        xl:    '24px', // large cards
        '2xl': '32px', // XL surfaces (photo blocks)
      },
    },
  },
  plugins: [],
} satisfies Config
