/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          dark: "#1b4332",
          primary: "#2d6a4f",
          medium: "#40916c",
          light: "#52b788",
          accent: "#74c69d",
          pale: "#d8f3dc",
          bg: "#f8faf8",
          card: "#ffffff"
        }
      }
    },
  },
  plugins: [],
}
