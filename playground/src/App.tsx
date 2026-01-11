import { AbyssSeparator, OmenToastProvider } from "nocturna-ui";
import styled from "styled-components";
import { ShowcaseContent } from "./components/ShowcaseContent";

// --- Styled Components Globais do App ---

const ShowcaseContainer = styled.main`
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
  font-family: "Playfair Display", serif;
`;

const Header = styled.header`
  text-align: center;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 10vw, 5rem);
  letter-spacing: -4px;
  text-transform: uppercase;
  line-height: 0.9;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #a1a1aa;
  font-style: italic;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
`;

const TabContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-top: 2rem;
`;

const Footer = styled.div`
  margin-top: 5rem;
  width: 100%;
  max-width: 800px;
  text-align: center;

  p {
    color: #71717a;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    margin-top: 1rem;
  }
`;

function App() {
  return (
    <OmenToastProvider>
      <ShowcaseContainer>
        <Header>
          <Title>Nocturna UI</Title>
          <Subtitle>
            Componentes forjados no brutalismo e na estética gótica.
          </Subtitle>
        </Header>

        <AbyssSeparator label="♱" />

        <TabContentWrapper>
          <ShowcaseContent />
        </TabContentWrapper>

        <Footer>
          <AbyssSeparator label="Finis" variant="void" />
          <p>
            v0.0.4 • Desenvolvido com 🖤 por <b>gothd</b>
          </p>
        </Footer>
      </ShowcaseContainer>
    </OmenToastProvider>
  );
}

export default App;
