# 🦇 Nocturna UI

> **Primitivos góticos e brutalistas forjados para a web que não teme a escuridão.**

A **Nocturna UI** é uma biblioteca de componentes React focada em interfaces de alto contraste, tipografia serifada e estética minimalista.

Na **v0.0.5**, introduzimos o sistema de **Aliases**, permitindo importações mais limpas (ex: `Button` ao invés de `VoidButton`), e melhoramos a cobertura de testes.

[![NPM Version](https://img.shields.io/npm/v/nocturna-ui?color=000000&label=npm&style=flat-square)](https://www.npmjs.com/package/nocturna-ui)
[![Tests](https://github.com/gothd/nocturna-ui/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/gothd/nocturna-ui/actions)
[![Coverage](https://img.shields.io/codecov/c/github/gothd/nocturna-ui?style=flat-square&color=white)](https://codecov.io/gh/gothd/nocturna-ui)

---

## 🔮 Documentação Completa

Para ver os componentes em ação, tabelas de propriedades interativas e exemplos avançados, visite nosso Grimório Digital:

### [👉 Acessar Documentação (Playground)](https://gothd.github.io/nocturna-ui/)

---

## 🌑 Instalação

```bash
npm install nocturna-ui
```

### Dependências

A biblioteca requer React e Framer Motion.

```bash
npm install react react-dom framer-motion
```

---

## 🩸 Setup Inicial

Para que os componentes funcionem corretamente, você deve importar o CSS global e envolver sua aplicação no `OmenToastProvider` (mesmo que não use notificações imediatamente, ele configura contextos globais).

```tsx
// No seu arquivo raiz (main.tsx ou App.tsx)
import { OmenToastProvider } from "nocturna-ui";
import "nocturna-ui/style.css"; // ⚠️ Importação vital dos estilos

export default function App({ children }) {
  return <OmenToastProvider>{children}</OmenToastProvider>;
}
```

---

## 🕸️ Uso Básico (Aliases)

Você não precisa mais decorar nomes místicos como `VoidButton` ou `CryptModal`. Utilize os Aliases funcionais:

```tsx
import { Button, Card, Badge, useToast } from "nocturna-ui";

export const Ritual = () => {
  const { toast } = useToast();

  return (
    <Card title="Invocação">
      <div className="flex gap-4 mb-4">
        <Badge variant="blood">Status: Pendente</Badge>
      </div>

      <Button
        variant="void"
        onClick={() => toast({ title: "Pacto Realizado", type: "success" })}
      >
        Confirmar
      </Button>
    </Card>
  );
};
```

### Tabela de Aliases

| Alias      | Componente Original | Função               |
| ---------- | ------------------- | -------------------- |
| `Button`   | `VoidButton`        | Ações principais     |
| `Input`    | `VeinInput`         | Entrada de dados     |
| `Select`   | `RitualSelect`      | Seleção acessível    |
| `Modal`    | `CryptModal`        | Diálogos e alertas   |
| `Toast`    | `OmenToast`         | Notificações         |
| `Menu`     | `AltarMenu`         | Dropdowns            |
| `Tabs`     | `SoulTabs`          | Navegação em abas    |
| `Card`     | `NocturnaCard`      | Container estrutural |
| `Skeleton` | `SpectreSkeleton`   | Estados de loading   |

_Consulte a [documentação completa](https://gothd.github.io/nocturna-ui/) para a lista total de props e variantes._

---

## 📜 Uso via CDN (Vanilla JS)

A biblioteca injeta uma ponte global `window.NocturnaUI` para uso sem bundlers.

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/framer-motion@11/dist/framer-motion.js"></script>

<script src="https://unpkg.com/nocturna-ui@0.0.5/dist/index.umd.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/nocturna-ui@0.0.5/dist/style.css"
/>

<div id="root"></div>

<script>
  const { ToastProvider, Button } = window.NocturnaUI;

  // Renderização manual necessária em Vanilla JS
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(ToastProvider));
</script>
```

_Veja o [exemplo de uso completo pela CDN, com o ToastProvider](./examples/cdn/index.html)._

---

## 🧪 Desenvolvimento

```bash
npm test               # Roda testes unitários
npm run test:coverage  # Relatório de cobertura
```

Desenvolvido com 🖤 por **gothd**.
