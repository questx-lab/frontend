/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/*.*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xs: [
          '0.6rem',
          {
            lineHeight: '1.2rem',
          },
        ],
        sm: [
          '0.8rem',
          {
            lineHeight: '1.4rem',
          },
        ],
        lg: [
          '1rem',
          {
            lineHeight: '1.6rem',
          },
        ],
        xl: [
          '1.25rem',
          {
            lineHeight: '1.8rem',
            letterSpacing: '-0.01em',
          },
        ],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '2rem',
            letterSpacing: '-0.01em',
          },
        ],
        '3xl': [
          '1.875rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        '4xl': [
          '2rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        '5xl': [
          '2.25rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        '6xl': [
          '2.5rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        '7xl': [
          '2.75rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        '8xl': [
          '3rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        '9xl': [
          '3.5rem',
          {
            lineHeight: '2.7rem',
            letterSpacing: '-0.035em',
          },
        ],
        '10xl': [
          '4rem',
          {
            lineHeight: '3rem',
            letterSpacing: '-0.05em',
          },
        ],
        '11xl': [
          '5rem',
          {
            lineHeight: '4rem',
            letterSpacing: '-0.07em',
          },
        ],
        '12xl': [
          '6rem',
          {
            lineHeight: '5rem',
            letterSpacing: '-0.02em',
          },
        ],
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
      'max-lg': { max: '1279px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: '1280px' },
      'max-xl': { max: '1535px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': { min: '1536px' },
      'max-2xl': { max: '2560px' },
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
      black: '#000000',
      white: '#ffffff',
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
    },
  },
  plugins: [
    'babel-plugin-twin',
    'babel-plugin-macros',
    require('@tailwindcss/line-clamp'),
  ],
}
