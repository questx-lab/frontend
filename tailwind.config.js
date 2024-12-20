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
      rubik: [
        'Rubik',
        {
          fontFeatureSettings: '"cv11", "cv04", "cv03", "cv02"',
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
          '2.25rem',
          {
            lineHeight: '2.5rem',
          },
        ],
        '8xl': [
          '3rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.02em',
          },
        ],
        54: [
          '54px',
          {
            fontWeight: '900',
            lineHeight: '43.6px',
            letterSpacing: '-2.725px',
          },
        ],
        100: [
          '100px',
          {
            fontWeight: '900',
            lineHeight: '80px',
            letterSpacing: '-5px',
          },
        ],
        109: [
          '109px',
          {
            fontWeight: '900',
            lineHeight: '87.2px',
            letterSpacing: '-5.45px',
          },
        ],
        163: [
          '163.5px',
          {
            fontWeight: '900',
            lineHeight: '130.8px',
            letterSpacing: '-8.175px',
          },
        ],
        216: [
          '216px',
          {
            fontWeight: '900',
            lineHeight: '172.8px',
            letterSpacing: '-10.8px',
          },
        ],
        218: [
          '218px',
          {
            fontWeight: '900',
            lineHeight: '174.4px',
            letterSpacing: '-10.9px',
          },
        ],
        200: [
          '200px',
          {
            fontWeight: '900',
            lineHeight: '160px',
            letterSpacing: '-10px',
          },
        ],
        300: [
          '300px',
          {
            fontWeight: '900',
            lineHeight: '240px',
            letterSpacing: '-15px',
          },
        ],
        400: [
          '400px',
          {
            fontWeight: '900',
            lineHeight: '320px',
            letterSpacing: '-20px',
          },
        ],
      },
      boxShadow: {
        lg: '0 0 12px 0 rgba(0, 0, 0, 0.10)',
      },
      animation: {
        blueToGreen: 'blueToGreen 7s ease-in-out infinite',
        greenToRed: 'greenToRed 7s ease-in-out infinite',
        orangeToYellow: 'orangeToYellow 7s ease-in-out infinite',
        slideBg: 'slideBg 7s ease-in-out infinite',
      },
      keyframes: {
        blueToGreen: {
          '0%, 100%': { color: '#0DA8FF' },
          '50%': { color: '#14CA74' },
        },
        greenToRed: {
          '0%, 100%': { color: '#14CA74' },
          '50%': { color: '#FF4755' },
        },
        orangeToYellow: {
          '0%, 100%': { color: '#FF9E45' },
          '50%': { color: '#FFCA28' },
        },
        slideBg: {
          '0%, 100%': {
            transform: 'translateY(-100px)',
            'animation-timing-function': 'cubic-bezier()',
          },
          '50%': { transform: 'translateY(0px)', 'animation-timing-function': 'cubic-bezier()' },
        },
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
      black: '#000000',
      white: {
        rgb5: 'rgba(255, 255, 255, 0.10)',
        rgb10: 'rgba(255, 255, 255, 0.20)',
        DEFAULT: '#ffffff',
      },
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        DEFAULT: '#64748b',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
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
        200: '#C6DAF5',
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
