/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        applications: 'repeat(auto-fill, minmax(120px, 1fr))',
      },
      backgroundImage: {
        login:
          "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url('./assets/bg/login_bg.jpg')",
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          dark: 'hsl(var(--color-primary-dark))',
          bg: 'hsl(var(--color-primary-bg))',
          fg: 'hsl(var(--color-primary-fg))',
          hover: 'hsl(var(--color-primary-bg-hover))',
        },
        error: {
          DEFAULT: 'hsl(var(--color-error))',
          bg: 'hsl(var(--color-error-bg))',
          fg: 'rgba(var(--color-error-fg))',
          hover: 'hsl(var(--color-error-bg-hover))',
        },
        success: {
          DEFAULT: 'hsl(var(--color-success))',
          bg: 'hsl(var(--color-success-bg))',
          fg: 'rgba(var(--color-success-fg))',
          hover: 'hsl(var(--color-success-bg-hover))',
        },
        warning: {
          DEFAULT: 'hsl(var(--color-warning))',
          bg: 'hsl(var(--color-warning-bg))',
          fg: 'rgba(var(--color-warning-fg))',
          hover: 'hsl(var(--color-warning-bg-hover))',
        },
        dark: {
          DEFAULT: 'hsl(var(--color-dark))',
          bg: 'hsl(var(--color-dark-bg))',
          fg: 'rgba(var(--color-dark-fg))',
          hover: 'hsl(var(--color-dark-bg-hover))',
        },
        window: {
          bg: 'hsl(var(--color-window-bg))',
          fg: 'rgba(var(--color-window-fg))',
        },
        sidebar: {
          bg: 'hsl(var(--color-sidebar-bg))',
          fg: 'rgba(var(--color-sidebar-fg))',
          shade: 'rgba(var(--color-sidebar-shade))',
          active: 'hsl(var(--color-sidebar-active-bg))',
        },
        card: {
          bg: 'rgba(var(--color-card-bg))',
          fg: 'rgba(var(--color-card-fg))',
          shade: 'rgba(var(--color-card-shade))',
        },
        text: {
          primary: 'rgba(var(--color-text-primary))',
          secondary: 'rgba(var(--color-text-secondary))',
          disabled: 'rgba(var(--color-text-disabled))',
        },
        divider: {
          light: 'hsl(var(--color-divider-light))',
          dark: 'hsl(var(--color-divider-dark))',
        },
        backgroundColor: 'rgb(var(--color-background))',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(text|border|bg|outline)-(primary|error|success|warning|dark|window|sidebar|card|text|divider)(-(hover|dark|bg|fg|active|shade|light))/,
      variants: [
        'hover',
        'focus',
        'active',
        'group-hover',
        'focus-within',
        'sm',
        'md',
        'lg',
        'xl',
        'first',
        'last',
        'odd',
        'even',
        'focus-visible',
        'focus-within',
        'motion-safe',
        'motion-reduce',
      ],
    },
  ],
};
