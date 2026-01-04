# 🦇 Nocturna UI

> **Primitivos góticos e brutalistas forjados para a web que não teme a escuridão.**

A **Nocturna UI** é uma biblioteca de componentes React focada em interfaces de alto contraste, tipografia serifada e estética minimalista/gótica. Na v0.0.2, expandimos nosso arsenal com componentes complexos e foco total em acessibilidade.

[Showcase (DEMO)](https://gothd.github.io/nocturna-ui/) | [NPM](https://www.npmjs.com/package/nocturna-ui) | [UNPKG](https://unpkg.com/nocturna-ui/)

---

## 🌑 Novidades da v0.0.2

- **Acessibilidade**: Implementação de _Focus Trap_ em modais, navegação por teclado em selects e atributos ARIA completos.
- **Utilitário `cn`**: Integração de `tailwind-merge` e `clsx` para garantir que seus estilos customizados nunca conflitem com os da lib.
- **React Portals**: Diálogos e Modais agora são renderizados fora da árvore principal para evitar problemas de z-index.
- **Expansão do Grimório**: Adição de Accordion, Tabs, Badges, Separators e Checkboxes.

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
