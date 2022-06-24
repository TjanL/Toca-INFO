/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      'background': '#0082bc',
      'map': '#0a68a0',
      'map-border': '#1a8fc3',
      'low': colors.yellow[500],
      'medium': colors.orange[500],
      'high': colors.red[500],
      'text': colors.slate[100],
      'text-second': colors.slate[300],
      'text-footer': colors.slate[600]
    }
  },
  plugins: [],
}
