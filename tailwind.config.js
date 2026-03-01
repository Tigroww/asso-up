/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8A1538',
        'primary-dark': '#6d112d',
      }
    },
  },
  plugins: [],
}
