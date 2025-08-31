// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ee3a43 ',
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
