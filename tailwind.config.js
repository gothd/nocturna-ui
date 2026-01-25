/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta Cyber Goth
        primary: "#FFFFFF", // Bone White (Texto principal / Bordas padrão)
        secondary: "#00FF41", // Malware Green (Sucesso / Ações secundárias)
        accent: "#FF007F", // Phantom Pink (Destaque / Ações especiais)
        danger: "#DC2626", // Red-600 (Erro / Perigo)
        warning: "#FFD700", // Cyber Gold (Alerta / Atenção)

        // Fundos
        background: "#050505", // Abyss Black
        surface: "#101010", // Off-black (Ligeiramente mais claro que o fundo)
        muted: "#52525b", // Zinc-600 (Cinza para textos secundários)
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"], // Estilo tumblr/goth clássico
        sans: ["Inter", "system-ui", "sans-serif"],
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
