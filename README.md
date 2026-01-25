# 🦇 Nocturna UI

> **Primitivos góticos e brutalistas forjados para a web que não teme a escuridão.**

A **Nocturna UI** é uma biblioteca de componentes React focada em interfaces de alto contraste, tipografia serifada e estética minimalista.

Na **v0.0.6**, introduzimos a identidade visual **Cyber Goth**, nomes de componentes padronizados (API Limpa) e tokens semânticos de cor.

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

Importe o CSS global e envolva sua aplicação no `ToastProvider` para habilitar o sistema de notificações.

```tsx
// No seu arquivo raiz (main.tsx ou App.tsx)
import { ToastProvider } from "nocturna-ui";
import "nocturna-ui/style.css"; // ⚠️ Importação vital dos estilos

export default function App({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
```

---

## 🎨 Paleta Cyber Goth

A versão 0.0.6 introduz 5 variantes de cor principais que permeiam todos os componentes:

| Token       | Cor (Hex) | Significado Semântico | Estética      |
| ----------- | --------- | --------------------- | ------------- |
| `primary`   | `#FFFFFF` | Padrão / Neutro       | Bone White    |
| `secondary` | `#00FF41` | Sucesso               | Malware Green |
| `accent`    | `#FF007F` | Destaque              | Phantom Pink  |
| `danger`    | `#DC2626` | Erro / Perigo         | Sanguine Red  |
| `warning`   | `#FFD700` | Alerta                | Cyber Gold    |

---

## 🕸️ Uso Básico

Componentes padronizados e tipados:

```tsx
import { Button, Card, Badge, useToast } from "nocturna-ui";

export const Ritual = () => {
  const { toast } = useToast();

  return (
    <Card title="Protocolo de Rede" variant="secondary">
      <div className="flex gap-4 mb-4">
        <Badge variant="secondary">Online</Badge>
        <Badge variant="primary" styleType="solid">
          v2.4
        </Badge>
      </div>

      <Button
        variant="accent"
        onClick={() =>
          toast({
            title: "Upload Iniciado",
            type: "success", // Automático: Usa cor secondary
          })
        }
      >
        Transferir Dados
      </Button>
    </Card>
  );
};
```

---

## 📜 Uso via CDN (Vanilla JS)

A biblioteca injeta uma ponte global `window.NocturnaUI` para uso sem bundlers.

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/framer-motion@11/dist/framer-motion.js"></script>

<script src="https://unpkg.com/nocturna-ui@0.0.6/dist/index.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/nocturna-ui@0.0.6/dist/style.css" />

<div id="root"></div>

<script>
  const { ToastProvider, Button } = window.NocturnaUI;

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(ToastProvider));
</script>
```

_Veja o [exemplo completo aqui](./examples/cdn/index.html)._

---

## 🧪 Desenvolvimento

```bash
npm test               # Roda testes unitários
npm run test:coverage  # Relatório detalhado
```

Desenvolvido com 🖤 por **gothd**.
