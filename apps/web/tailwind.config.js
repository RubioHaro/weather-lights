/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        palmetto: {
          green: '#2ecc71',
          yellow: '#f1c40f',
          red: '#e74c3c',
          dark: '#1a1a1a',
          primary: '#F9593B'
        }
      }
    },
  },
  plugins: [],
}