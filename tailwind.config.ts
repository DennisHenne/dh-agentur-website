import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        // ── DH Agentur palette ────────────────────────────────────────────
        // #E8F1F2  #B3EFB2  #7A9E7E  #31493C  #001A23
        brand: {
          50:  '#f0faf0',
          100: '#d8f5d7',
          200: '#B3EFB2', // mint — badges, labels, highlights
          300: '#8fd48e',
          400: '#6ab469',
          500: '#7A9E7E', // sage — secondary accent, muted text
          600: '#31493C', // forest — CTA buttons, primary dark accent
          700: '#283d32',
          800: '#1e2e25',
          900: '#14201a',
          950: '#0a1210',
        },
        // Named aliases for direct use
        mint:   '#B3EFB2',
        sage:   '#7A9E7E',
        forest: '#31493C',
        light:  '#E8F1F2',
        // Page background layers
        dark: {
          DEFAULT: '#001A23',
          50:  '#051d26',
          100: '#0c2a35',
          200: '#132f3a',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config
