import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/nocturna-ui/",
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom", "framer-motion", "styled-components"], // Força instância única
    alias: {
      // 1. Alias ESPECÍFICO para o CSS (Aponta para a dist gerada)
      // Resolve tanto imports diretos (se houver exports no package.json)
      "nocturna-ui/dist/style.css": resolve(__dirname, "../dist/style.css"),
      "nocturna-ui/style.css": resolve(__dirname, "../dist/style.css"),

      // 2. Alias GERAL para a Lib (Aponta para o código fonte TypeScript)
      // Isso permite Hot Reload instantâneo
      "nocturna-ui": resolve(__dirname, "../src/index.ts"),

      // 3. Alias interno da Lib (para imports que usam @ dentro da lib funcionarem no playground)
      "@": resolve(__dirname, "../src"),
    },
  },
});
