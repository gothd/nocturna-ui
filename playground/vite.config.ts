import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import * as docgen from "react-docgen-typescript";

// Configuração do Parser
const docgenOptions = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propFilter: (prop: any) => {
    if (prop.parent) {
      // Retorna false se a prop vier de node_modules (ex: @types/react)
      return !prop.parent.fileName.includes("node_modules");
    }
    // Se não tiver pai (definida no próprio arquivo), mantém.
    return true;
  },
};

// Plugin Customizado
const reactDocgenTypescript = () => {
  return {
    name: "vite-plugin-react-docgen-typescript",
    // Executa apenas em arquivos .tsx
    transform(code: string, id: string) {
      if (!id.endsWith(".tsx")) {
        return;
      }

      // Filtra apenas componentes da biblioteca
      if (!id.includes("src/components")) {
        return;
      }

      try {
        // Usa o parser para extrair as informações
        // Aponta para o tsconfig da raiz do projeto principal
        const componentDocs = docgen
          .withCustomConfig(
            resolve(__dirname, "../tsconfig.json"),
            docgenOptions,
          )
          .parse(id);

        if (!componentDocs.length) return;

        // Injeta a propriedade __docgenInfo no código do componente
        const docInfo = componentDocs[0];
        const docgenInfoString = JSON.stringify(docInfo);

        // Adiciona o código JS para anexar os dados ao componente
        return {
          code: `${code}\n;try{ ${docInfo.displayName}.__docgenInfo = ${docgenInfoString}; } catch(e) {}`,
          map: null,
        };
      } catch {
        // Silencia erros de parse para não quebrar o build
        return;
      }
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  base: "/nocturna-ui/",
  plugins: [react(), reactDocgenTypescript()],
  resolve: {
    dedupe: ["react", "react-dom", "framer-motion", "styled-components"], // Força instância única
    alias: {
      // Alias ESPECÍFICO para o CSS (Aponta para a dist gerada)
      // Resolve também imports diretos
      "nocturna-ui/dist/style.css": resolve(__dirname, "../dist/style.css"),
      "nocturna-ui/style.css": resolve(__dirname, "../dist/style.css"),

      // Alias GERAL para a Lib (Aponta para o código fonte TypeScript)
      // Isso permite Hot Reload instantâneo
      "nocturna-ui": resolve(__dirname, "../src/index.ts"),

      // Alias interno da Lib (para imports que usam @ dentro da lib funcionarem no playground)
      "@": resolve(__dirname, "../src"),
    },
  },
});
