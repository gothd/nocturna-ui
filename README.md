# 🦇 Nocturna UI

> **Primitivos góticos e brutalistas forjados para a web que não teme a escuridão.**

A **Nocturna UI** é uma biblioteca de componentes React focada em interfaces de alto contraste, tipografia serifada e estética minimalista/gótica. Na **v0.0.4**, expandimos nosso arsenal com componentes de feedback, navegação e um sistema robusto de notificações (Toasts) desacoplado.

[Showcase (DEMO)](https://gothd.github.io/nocturna-ui/) | [NPM](https://www.npmjs.com/package/nocturna-ui) | [UNPKG](https://unpkg.com/nocturna-ui/)

---

## 🕸️ Arsenal de Componentes

| Primitivo                  | Descrição                                                     |
| :------------------------- | :------------------------------------------------------------ |
| **VoidButton**             | Botão brutalista com suporte a tamanhos sm/md/lg.             |
| **CryptModal**             | Modal com portal, trava de foco e suporte a tecla ESC.        |
| **RitualSelect**           | Select customizado com suporte total a navegação via teclado. |
| **AltarMenu** `Novo`       | Menu dropdown acessível para ações e navegação.               |
| **GrimoireAccordion**      | Acordeão com animação de altura dinâmica via Framer Motion.   |
| **SoulTabs**               | Sistema de abas para organização de conteúdos densos.         |
| **VeinInput**              | Input de texto com labels integrados e validação visual.      |
| **HexCheckbox**            | Checkbox temático com animação de escala e ícone custom.      |
| **OmenToast** `Novo`       | Sistema de notificações (Toasts) via Hook ou Global.          |
| **RuneTooltip** `Novo`     | Tooltips informativos com posicionamento automático.          |
| **VesselProgress** `Novo`  | Barras de progresso (Valor ou Timer/Indeterminate).           |
| **AbyssScroll** `Novo`     | Container com scrollbar customizada cross-browser.            |
| **SpectreSkeleton** `Novo` | Placeholders de carregamento (Avatar, Card).                  |
| **SigilBadge**             | Emblemas para status e tags em versões Solid ou Outline.      |
| **AbyssSeparator**         | Divisor de seção com suporte a labels e sigilos.              |
| **NocturnaCard**           | Container clássico com sombras rígidas (hard shadows).        |

---

## 🌑 Instalação

### 1. Instale o pacote

```bash
npm install nocturna-ui
```

### 2. Dependências (Peer Dependencies)

Para garantir animações fluidas e evitar conflitos de versão do React, certifique-se de ter instalado:

```bash
npm install react react-dom framer-motion
```

_(Nota: Os ícones internos utilizam Lucide React e já estão inclusos no pacote. Você não precisa instalá-lo separadamente, a menos que queira usar os mesmos ícones em sua aplicação)._

### 3. Setup do Provider

Para que o sistema de **Toasts** (OmenToast) funcione, você deve envolver sua aplicação com o `OmenToastProvider`:

```tsx
// src/App.tsx ou src/layout.tsx
import { OmenToastProvider } from "nocturna-ui";
import "nocturna-ui/dist/style.css"; // Importação vital dos estilos

export default function App({ children }) {
  return <OmenToastProvider>{children}</OmenToastProvider>;
}
```

---

## 🩸 Como Usar

### Componentes Básicos

```tsx
import { VoidButton, SigilBadge } from "nocturna-ui";

export const Ritual = () => (
  <div className="flex gap-4">
    <SigilBadge variant="blood">Status: Ativo</SigilBadge>
    <VoidButton variant="void" onClick={() => console.log("Invocado")}>
      Iniciar Ritual
    </VoidButton>
  </div>
);
```

### Hook de Toast (React)

Dentro de qualquer componente filho do Provider:

```tsx
import { useToast, VoidButton } from "nocturna-ui";

export const SummonToast = () => {
  const { toast } = useToast();

  return (
    <VoidButton
      onClick={() =>
        toast({
          title: "Oferenda Aceita",
          description: "Os dados foram salvos no grimório.",
          type: "success",
          variant: "void",
        })
      }
    >
      Salvar
    </VoidButton>
  );
};
```

---

## 📜 Uso via CDN (Vanilla JS / HTML)

A **Nocturna UI** injeta uma ponte global (`window.NocturnaUI`) quando carregada via script tag, permitindo o uso do sistema de Toasts mesmo fora do React.

**Ordem de Importação:**

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<script src="https://unpkg.com/framer-motion@11/dist/framer-motion.js"></script>

<script src="https://unpkg.com/nocturna-ui@0.0.4/dist/index.umd.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/nocturna-ui@0.0.4/dist/style.css"
/>
```

**Inicialização e Uso:**

```html
<div id="root"></div>

<script>
  // 1. Inicializa o Provider (Necessário para a Bridge funcionar)
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(window.NocturnaUI.OmenToastProvider));

  // 2. Dispara Toasts via JavaScript Puro
  function invocarMensagem() {
    if (window.NocturnaUI && window.NocturnaUI.toaster) {
      window.NocturnaUI.toaster.toast({
        title: "Vanilla JS",
        description: "O sistema de notificações funciona sem build steps.",
        variant: "blood",
        type: "warning",
      });
    }
  }
</script>

<button onclick="invocarMensagem()">Testar Toast</button>
```

---

## 🛠️ Tecnologias

- **TypeScript** - Tipagem estrita para rituais seguros.
- **Tailwind CSS** - Estilização atômica encapsulada (sem conflitos de classe).
- **Framer Motion** - Animações de entrada e saída (Accordions, Modais, Toasts).
- **Lucide React** - Iconografia leve e consistente.

---

Desenvolvido com 🖤 por **gothd**. ☕️
