/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/*.*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
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
        DEFAULT: '#343A3F',
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
      },
    },
  },
  plugins: [
    'babel-plugin-twin',
    'babel-plugin-macros',
    require('@tailwindcss/line-clamp'),
  ],
}
