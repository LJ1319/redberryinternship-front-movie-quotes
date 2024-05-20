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
      borderRadius: {
        clg: '10px'
      },
      colors: {
        'light-mirage': '#222030',
        'dark-mirage': '#181624',
        gold: '#DDCCAA',
        red: {
          DEFAULT: '#E31221'
        },
        blue: {
          DEFAULT: '#0D6EFD'
        }
      }
    }
  },
  plugins: []
}
