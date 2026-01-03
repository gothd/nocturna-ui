# 🦇 Nocturna UI

> **Primitivos góticos e brutalistas para a web que não teme a escuridão.**

A **Nocturna UI** é uma biblioteca de componentes React focada em interfaces de alto contraste, tipografia serifada e estética minimalista/gótica. Desenvolvida para ser leve, acessível e agnóstica de configuração.

[Showcase (DEMO)](https://gothd.github.io/nocturna-ui/) | [NPM](https://www.npmjs.com/) | [UNPKG](https://unpkg.com/nocturna-ui/)

---

## 🌑 Destaques Técnicos

- **React + TypeScript**: Tipagem estrita para uma experiência de desenvolvimento segura.
- **Tailwind CSS**: Estilização performática via utilitários.
- **Multi-distribuição**: Suporte nativo para ESM, CJS e UMD (CDN).
- **Zero Runtime CSS**: O usuário não precisa ter Tailwind instalado para usar a lib.
- **CI/CD**: Deploy automatizado para GitHub Pages e versionamento via Tags.

## 🕸️ Instalação

### Via NPM

```bash
npm install nocturna-ui
```

No seu arquivo principal:

```tsx
import "nocturna-ui/style.css";
import { VoidButton, NocturnaCard } from "nocturna-ui";
```

### Via CDN (UNPKG)

Ideal para prototipagem rápida ou uso sem build tools.

```html
<link
  rel="stylesheet"
  href="[https://unpkg.com/nocturna-ui/dist/style.css](https://unpkg.com/nocturna-ui/dist/style.css)"
/>
<script src="[https://unpkg.com/nocturna-ui/dist/index.umd.js](https://unpkg.com/nocturna-ui/dist/index.umd.js)"></script>
```

## 🩸 Componentes Atuais

- [x] **VoidButton**: Botão brutalista com variantes Ghost e Blood.
- [x] **NocturnaCard**: Container com sombras rígidas e foco tipográfico.
- [ ] **NocturnaInput**: (Em breve)
- [ ] **ShadowOverlay**: (Em breve)

---

## 🛠️ Desenvolvimento local

1. Clone o repositório.
2. `npm install` na raiz para a biblioteca.
3. `cd playground && npm install` para o showcase.
4. `npm run dev` na raiz para buildar em tempo real.

---

Desevolvido com 🖤 por **gothd**.
