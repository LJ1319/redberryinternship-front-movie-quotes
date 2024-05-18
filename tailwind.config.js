const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '430px',
      lg: '1920px'
    },
    extend: {
      fontFamily: {
        'helvetica-neue': ['Helvetica Neue', ...defaultTheme.fontFamily.sans],
        'helvetica-neue-geo': ['Helvetica Neue GEO', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans]
      },
      margin: {
        18: '70px'
      },
      padding: {
        18: '70px'
      },
      colors: {
        gold: '#DDCCAA',
        red: {
          DEFAULT: '#E31221'
        },
        'dark-blue': '#181624',
        zinc: {
          DEFAULT: '#D9D9D9'
        }
      }
    }
  },
  plugins: []
}
