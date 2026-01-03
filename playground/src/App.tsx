import { NocturnaCard, VoidButton } from "nocturna-ui";
import styled from "styled-components";

// Styled Component para o container principal
const ShowcaseContainer = styled.main`
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  font-family: "Playfair Display", serif; /* Tipografia Goth */
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  margin-top: 3rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  letter-spacing: -3px;
  text-transform: uppercase;
  border-bottom: 1px solid #333;
  margin-bottom: 1rem;
`;

function App() {
  return (
    <ShowcaseContainer>
      <Title>Nocturna UI</Title>
      <p style={{ color: "#666", fontStyle: "italic" }}>
        Primitivos góticos para a web moderna.
      </p>

      <Section>
        {/* Testando o Card em versão Blood */}
        <NocturnaCard
          title="Componente: Card"
          description="Testando compatibilidade com Styled Components no wrapper externo."
          variant="blood"
        >
          <VoidButton variant="blood">Action</VoidButton>
        </NocturnaCard>

        {/* Testando o Card em versão Void */}
        <NocturnaCard
          title="Componente: Button"
          description="Bordas brutalistas e tipografia serifada."
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <VoidButton>Ghost</VoidButton>
          </div>
        </NocturnaCard>
      </Section>
    </ShowcaseContainer>
  );
}

export default App;
