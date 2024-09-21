/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    colors: {
      primary: '#3490dc',
      secondary: '#f1c40f',
      success: '#2ecc71',
      warning: '#e67e22',
      danger: '#e74c3c',
      info: '#34495e',
      light: '#ecf0f1',
      dark: '#34495e',
      rose: '#451a03',
      indigo: '#6610f2',
      violet: '#ad1457',
      emerald: '#2ecc71',
      amethyst: '#9b59b6',
      pink: '#e91e63',
      purple: '#470829',
      // poncho:''
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

