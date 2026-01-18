import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react({
      // Força o uso de React.createElement em vez de _jsx
      jsxRuntime: "classic",
    }),
    // Gera os arquivos .d.ts automaticamente (excluindo os testes)
    dts({
      insertTypesEntry: true,
      exclude: ["src/**/__tests__/**", "**/*.test.tsx", "**/*.spec.tsx"],
    }),
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"), // o CSS é gerado em production
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NocturnaUI", // Nome global para IIFE/UMD
      formats: ["es", "cjs", "umd"], // UMD funciona como IIFE e CJS ao mesmo tempo
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "framer-motion"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "framer-motion": "Motion",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names[0].endsWith(".css")) return "style.css";
          return assetInfo.names[0];
        },
      },
    },
  },
});
