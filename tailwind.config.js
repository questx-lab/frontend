/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/*.*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        {
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
        },
      ],
    },
    extend: {
      fontSize: {
        xs: [
          '0.75rem',
          {
            lineHeight: '1rem',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
          },
        ],
        lg: [
          '1rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        xl: [
          '1.25rem',
          {
            letterSpacing: '-0.01em',
          },
        ],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '2rem',
          },
        ],
        '4xl': [
          '18px',
          {
            lineHeight: '28px',
          },
        ],
        '8xl': [
          '4.5rem',
          {
            lineHeight: '79.2px',
            letterSpacing: '-1.44px',
          },
        ],
      },
      boxShadow: {
        lg: '0 0 12px 0 rgba(0, 0, 0, 0.10)',
      },
    },
    screens: {
      sm: { min: '640px' },
      'max-sm': { max: '767px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: '768px' },
      'max-md': { max: '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: '1024px' },
      'max-lg': { max: '1439px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: '1440px' },
      'max-xl': { max: '1919px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': { min: '1920px' },
      'max-2xl': { max: '2559px' },
      // => @media (min-width: 1536px) { ... }

      '3xl': { min: '2560px' },
      'max-3xl': { max: '3840px' },
      // => @media (min-width: 2560px) { ... }

      '4xl': { min: '3840px' },
      'max-4xl': { max: '7680px' },
      // => @media (min-width: 2560px) { ... }
    },
    colors: {
      transparent: '#F5F6FF00',
      primary: {
        50: '#f5f6ff',
        100: '#ECEDFF',
        200: '#c8ccf5',
        300: '#a1abef',
        400: '#7580e5',
        500: '#565add',
        600: '#4540d0',
        700: '#4236bf',
        800: '#3f329b',
        900: '#342d7b',
        DEFAULT: '#565add',
      },
      black: {
        DEFAULT: '#000000',
      },
      white: {
        rgb5: 'rgba(255, 255, 255, 0.05)',
        rgb10: 'rgba(255, 255, 255, 0.1)',
        DEFAULT: '#ffffff',
      },
      gray: {
        50: '#f9fafb',
        100: '#F1F5F9',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        DEFAULT: '#6b7280',
      },
      danger: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        300: '#FECACA',
        400: '#FCA5A5',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        DEFAULT: '#EF4444',
      },
      success: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        300: '#86EFAC',
        500: '#22C55E',
        700: '#15803D',
        DEFAULT: '#22C55E',
      },
      warning: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        500: '#F59E0B',
        700: '#B45309',
        DEFAULT: '#F59E0B',
      },
      info: {
        100: '#DBEAFE',
        500: '#3B82F6',
        700: '#1D4ED8',
        DEFAULT: '#3B82F6',
      },
      teal: {
        500: '#14B8A6',
        DEFAULT: '#14B8A6',
      },
      orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        500: '#f97316',
        900: '#78350f',
        DEFAULT: '#FF7B05',
      },
      yellow: '#FFCC00',
      green: '#30D158',
      emerald: {
        50: '#ECFDF5',
        100: '#d1fae5',
        200: '#A7F3D0',
        500: '#10b981',
        900: '#064E3B',
        DEFAULT: '#10b981',
      },
      cyan: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        500: '#06b6d4',
        900: '#0C4A6E',
        DEFAULT: '#06b6d4',
      },
      pink: {
        50: '#FDF2F8',
        100: '#fce7f3',
        200: '#FBCFE8',
        500: '#ec4899',
        900: '#831843',
        DEFAULT: '#ec4899',
      },
      indigo: {
        50: '#EEF2FF',
        100: '#e0e7ff',
        200: '#C7D2FE',
        500: '#6366f1',
        900: '#312e81',
        DEFAULT: '#6366f1',
      },
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      bold: '600',
    },
  },
  plugins: ['babel-plugin-twin', 'babel-plugin-macros', require('@tailwindcss/line-clamp')],
})
