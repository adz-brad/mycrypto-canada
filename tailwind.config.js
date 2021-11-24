const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: false,
    content: ['./src/**/*.js'],
  },
  darkMode: 'class',
  theme: {
    screens:{
      sm: '600px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px'
    },
    colors: {
      primary: colors.blueGray,
      secondary: colors.trueGray,
      accent: colors.lightBlue,
      green: colors.green,
      red: colors.red,
      indigo: colors.indigo,
      yellow: colors.yellow,
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
    divideColors: {
      primary: colors.blue,
      black: colors.black,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
