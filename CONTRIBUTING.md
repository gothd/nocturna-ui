# 🌑 Contribuindo para a Nocturna UI

Obrigado pelo interesse em contribuir com a **Nocturna UI**. Estamos construindo um sistema de design brutalista e acessível, e sua ajuda é bem-vinda nas sombras.

## 🛠️ Setup do Ambiente

O projeto é um monorepo simples contendo a biblioteca (`src`) e a documentação (`playground`).

1. **Clone o repositório:**

   ```bash
   git clone [https://github.com/gothd/nocturna-ui.git](https://github.com/gothd/nocturna-ui.git)
   cd nocturna-ui
   ```

2. **Instale as dependências (Raiz):**

```bash
npm install
```

3. **Execute o Build (Raiz):**

```bash
npm run build
```

ou para visualizar as alterações em tempo real no playground em desenvolvimento:

```bash
npm run dev
```

3. **Inicie o Playground (Documentação):**

```bash
npm run dev
```

---

## 🏗️ Estrutura do Projeto

- `src/components`: Componentes da biblioteca.
- `src/utils`: Tokens, helpers e a engine de System Props.
- `playground`: Aplicação React (Vite) que serve como documentação.

## 📐 Padrões de Código

### 1. System Props

Todos os novos componentes devem estender a interface `SystemProps` e utilizar o hook `extractSystemStyles` para garantir consistência de margens, cores e responsividade.

### 2. Estilo

Utilizamos **Tailwind CSS** classes para estrutura interna e **CSS Variables** para tokens. Mantenha a estética "Cyber Goth" (alto contraste, bordas definidas, cores neon sutis).

### 3. Commits

Seguimos o padrão **Conventional Commits**. Exemplos:

- `feat: add Grid component`
- `fix: adjust modal z-index`
- `docs: update readme usage`
- `refactor: migrate button to system props`

---

## 🧪 Testes

Antes de abrir um Pull Request, garanta que os testes estão passando:

```bash
npm run test
```

Se criar um novo componente, adicione um arquivo `.test.tsx` correspondente com cobertura de:

1. Renderização básica.
2. Aplicação de variantes.
3. Comportamento de acessibilidade (ARIA).
4. Aplicação de System Props.

---

## 🤝 Abrindo um Pull Request

1. Faça um Fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feat/nova-feature`).
3. Comite suas mudanças.
4. Faça o Push (`git push origin feat/nova-feature`).
5. Abra o PR descrevendo o que foi alterado.

**Bem-vindo à escuridão.** 🦇
