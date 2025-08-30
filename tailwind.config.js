// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0059AB',
        white: '#FFFFFF',
        grey: '#CBCBCB',
        black: '#000000',
        lightGrey: '#F2F3F2',
      },
      fontFamily: {
        regular: 'UrbanistRegular',
        medium: 'UrbanistMedium',
        semiBold: 'UrbanistSemiBold',
        bold: 'UrbanistBold',
        light: 'UrbanistLight',
        italic: 'UrbanisItalic',
      },
    },
  },
  plugins: [],
};
