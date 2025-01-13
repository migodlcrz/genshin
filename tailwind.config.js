/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        wenhei: ["Hanyi WenHei 85W", "sans-serif"],
      },
    },
  },
  plugins: [],
};
