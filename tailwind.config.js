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
        'helvetica-neue': ['Helvetica Neue'],
        'helvetica-neue-geo': ['Helvetica Neue GEO'],
        montserrat: ['Montserrat']
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
        mirage: '#24222f',
        'mirage-light': '#222030',
        'mirage-medium': '#181624',
        'mirage-dark': '#11101A',
        'mirage-black': '#12101A',
        'neutral-light': '#9C9A9A',
        'neutral-dark': '#373740',
        gold: '#DDCCAA',
        red: {
          DEFAULT: '#E31221'
        },
        blue: {
          DEFAULT: '#0D6EFD'
        },
        purple: {
          DEFAULT: '#9747FF'
        },
        rose: {
          DEFAULT: '#F3426C'
        }
      }
    }
  },
  plugins: []
}
