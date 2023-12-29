import { colors } from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-primary) / <alpha-value>',
      },
    },
  },
  plugins: [],
};
