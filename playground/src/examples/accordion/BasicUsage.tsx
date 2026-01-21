import styled from "styled-components";
import { GrimoireAccordion } from "nocturna-ui";

// Layout apenas para limitar a largura do exemplo
const Layout = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const BasicUsage = () => {
  // A estrutura de dados deve seguir o padrão: id, title, content
  const faqItems = [
    {
      id: "q1",
      title: "O que é o Vazio?",
      content:
        "O Vazio é a ausência de cor e a presença de estrutura. Nossa UI prioriza contraste e forma sobre ornamentos desnecessários.",
    },
    {
      id: "q2",
      title: "Como instalar?",
      content: (
        <span>
          Execute{" "}
          <code style={{ color: "#ef4444" }}>npm install nocturna-ui</code> no
          seu terminal.
        </span>
      ),
    },
    {
      id: "q3",
      title: "Suporte a Animações?",
      content:
        "Utilizamos Framer Motion internamente para transições suaves de altura e opacidade.",
    },
  ];

  return (
    <Layout>
      {/* Exemplo Padrão (Void) */}
      <GrimoireAccordion items={faqItems} />

      {/* Exemplo Variante Blood */}
      <GrimoireAccordion
        variant="blood"
        items={[
          {
            id: "alert",
            title: "Zona de Perigo",
            content:
              "Este acordeão utiliza o tema 'blood' para indicar ações destrutivas ou avisos críticos.",
          },
        ]}
      />
    </Layout>
  );
};
