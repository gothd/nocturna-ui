/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class", // Goth UI é focada em Dark Mode
  theme: {
    extend: {
      colors: {
        "nocturna-void": "#050505",
        "nocturna-blood": "#660000",
        "nocturna-ghost": "#e0e0e0",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"], // Estilo tumblr/goth clássico
      },
      keyframes: {
        progress: {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
      },
      animation: {
        progress: "progress linear forwards",
      },
    },
  },
  plugins: [],
};
