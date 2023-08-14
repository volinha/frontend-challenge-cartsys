/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./src/pages/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    minHeight: {
      navbar: 'calc(100vh - 210px)',
    },
    extend: {},
  },
  plugins: [],
}

