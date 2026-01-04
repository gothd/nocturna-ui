# 🦇 Nocturna UI

> **Primitivos góticos e brutalistas forjados para a web que não teme a escuridão.**

A **Nocturna UI** é uma biblioteca de componentes React focada em interfaces de alto contraste, tipografia serifada e estética minimalista/gótica. Na v0.0.2, expandimos nosso arsenal com componentes complexos e foco total em acessibilidade.

[Showcase (DEMO)](https://gothd.github.io/nocturna-ui/) | [NPM](https://www.npmjs.com/package/nocturna-ui) | [UNPKG](https://unpkg.com/nocturna-ui/)

---

## 🕸️ Componentes Disponíveis

| Primitivo             | Descrição                                                     |
| :-------------------- | :------------------------------------------------------------ |
| **VoidButton**        | Botão brutalista com suporte a tamanhos sm/md/lg.             |
| **CryptModal**        | Modal com portal e trava de foco para acessibilidade.         |
| **RitualSelect**      | Select customizado com suporte total a navegação via teclado. |
| **GrimoireAccordion** | Acordeão com animação de altura dinâmica via Framer Motion.   |
| **SoulTabs**          | Sistema de abas para organização de conteúdos densos.         |
| **VeinInput**         | Input de texto com estados de erro e animação de pulso.       |
| **HexCheckbox**       | Checkbox temático com animação de escala.                     |
| **AbyssSeparator**    | Divisor de seção com suporte a labels e sigilos.              |
| **SigilBadge**        | Emblemas para status e tags em versões Solid ou Outline.      |
| **NocturnaCard**      | Container clássico com sombras rígidas (hard shadows).        |

## 🌑 Requisitos de Instalação (Peer Dependencies)

Para evitar conflitos de instâncias do React (como o erro de `useState` nulo), a **Nocturna UI** utiliza `peerDependencies`. Certifique-se de que seu projeto possua:

- **React** (^18.0.0)
- **React-DOM** (^18.0.0)
- **Framer Motion** (^11.0.0)

```bash
npm install react react-dom framer-motion
```

## 📜 Uso via CDN (UMD)

Para utilizar a biblioteca diretamente no navegador, a ordem dos scripts é fundamental para que as globais sejam injetadas corretamente:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<script src="https://unpkg.com/framer-motion@11/dist/framer-motion.js"></script>

<script src="https://unpkg.com/nocturna-ui@0.0.3/dist/index.umd.js"></script>
```

## 🩸 Instalação e Uso

```bash
npm install nocturna-ui
```

```tsx
import "nocturna-ui/dist/style.css";
import { VoidButton, CryptModal } from "nocturna-ui";

export const Ritual = () => (
  <VoidButton variant="blood" size="lg">
    Iniciar Invocação
  </VoidButton>
);
```

---

Desenvolvido com 🖤 por **gothd**. ☕️
