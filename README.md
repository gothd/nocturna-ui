# 🦇 Nocturna UI

> **Primitivos góticos e brutalistas forjados para a web que não teme a escuridão.**

A **Nocturna UI** é uma biblioteca de componentes React focada em interfaces de alto contraste e DX (Developer Experience) superior.

Na versão **v0.1.0**, apresentamos a **System Props Engine** e os **Layout Primitives**, eliminando a necessidade de arquivos CSS externos para a maioria dos casos de uso.

[![NPM Version](https://img.shields.io/npm/v/nocturna-ui?color=ff007f&label=v0.1.0&style=flat-square)](https://www.npmjs.com/package/nocturna-ui)
[![Tests](https://github.com/gothd/nocturna-ui/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/gothd/nocturna-ui/actions)
[![Coverage](https://img.shields.io/codecov/c/github/gothd/nocturna-ui?style=flat-square&color=white)](https://codecov.io/gh/gothd/nocturna-ui)

---

## ✨ Novidades da v0.1.0

- **System Props Engine:** Controle margens (`m`, `p`), cores (`bg`, `color`), tipografia e layout diretamente nas props dos componentes.
- **Layout Primitives:** Novos componentes `Box`, `Stack`, `HStack`, `VStack`, `Grid` e `SimpleGrid`.
- **Polymorphic Components:** Use a prop `as` para alterar a tag HTML semântica (ex: `as="section"`, `as="a"`) mantendo os estilos.
- **Engine de Design Tokens:** Integração profunda com tokens de espaçamento e cores do tema Cyber Goth.

---

## 🔮 Documentação & Playground

Explore o grimório digital com exemplos interativos:

### [👉 Acessar Documentação (Playground)](https://gothd.github.io/nocturna-ui/)

---

## 🌑 Instalação

```bash
npm install nocturna-ui
```

### Exemplo Rápido

```tsx
import { Button, Card, VStack, Text, Badge } from "nocturna-ui";

export const App = () => (
  <Card title="Status do Sistema" variant="secondary" w="350px">
    <VStack gap={4}>
      <Text color="zinc-400">Todos os sistemas operacionais.</Text>

      <HStack justify="between" w="full">
        <Badge variant="primary">v0.1.0</Badge>
        <Badge variant="secondary" styleType="solid">
          ONLINE
        </Badge>
      </HStack>

      <Button variant="accent" w="full" mt={4}>
        Executar Diagnóstico
      </Button>
    </VStack>
  </Card>
);
```

---

## 📜 Uso via CDN

Para prototipagem rápida sem bundlers:

```html
<script src="https://unpkg.com/nocturna-ui@0.1.0/dist/index.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/nocturna-ui@0.1.0/dist/style.css" />
```

## _Veja o [exemplo completo aqui](./examples/cdn/index.html)._

## 🤝 Contribuição

Forks e Pull Requests são bem-vindos. Consulte o guia de contribuição para começar.

**Licença ISC** • Criado por [Ruan Oliveira Sena](https://github.com/gothd)
