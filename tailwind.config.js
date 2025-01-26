/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],

  theme: {
    extend: {
      colors: {
        darkBg: '#1a202c',  // Dark background color
        lightBg: '#ffffff', // Light background color
        darkText: '#ffffff', // Dark text color
        lightText: '#1a202c',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

