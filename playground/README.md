# 🦇 Nocturna UI - Playground & Docs

Este é o ambiente de desenvolvimento e documentação oficial da biblioteca **Nocturna UI**. Ele serve tanto como um "Playground" para testar componentes isoladamente quanto como o site estático de documentação gerado via `react-docgen-typescript`.

## 🛠️ Setup Local

Como este playground está dentro do monorepo (ou estrutura de pastas) da biblioteca, certifique-se de que as dependências da raiz e da biblioteca estejam instaladas.

1. **Instalar Dependências**

```bash
npm install
```

2. **Rodar o Servidor de Desenvolvimento**

```bash
npm run dev
```

**Rode `npm run dev`, ou `npm run build` uma vez, na raiz para buildar o pacote nocturna-ui localmente. Que é consumido pelo playground no package.json.**

O playground estará acessível em `http://localhost:5173/nocturna-ui/`.

## 📦 Estrutura

- **`src/pages`**: Contém as páginas de exemplo para cada componente.
- **`src/examples`**: Exemplos de código limpos exibidos no `DocsViewer`.
- **`src/layout`**: Layout principal da documentação (Sidebar, Header).
- **`vite.config.ts`**: Configurado com um plugin customizado para extrair JSDocs dos componentes automaticamente.

## 🚀 Deploy (GitHub Pages)

O projeto está configurado para ser buildado e hospedado no GitHub Pages.

1. **Build**

```bash
npm run build
```

Isso gerará os arquivos estáticos na pasta `dist`. 2. **Configurações Importantes**

- **`vite.config.ts`**: A propriedade `base: "/nocturna-ui/"` garante que os assets (CSS/JS) sejam carregados corretamente no subdiretório do GitHub.
- **`App.tsx`**: Utilizamos `HashRouter` para evitar problemas de roteamento (erros 404) em servidores estáticos.

---

_Ambiente focado em Alta Entropia e Design Brutalista._
