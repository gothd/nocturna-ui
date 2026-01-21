import { Copy, Terminal } from "lucide-react";
import { SigilBadge } from "nocturna-ui";
import styled from "styled-components";

// --- Styled Components ---

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;

  /* Background Grid Effect */
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
`;

const BadgeWrapper = styled.div`
  margin-bottom: 2rem;
  animation: fadeInDown 1s ease-out;
`;

const Title = styled.h1`
  font-size: clamp(3.5rem, 12vw, 8rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
  background: linear-gradient(to bottom, #fff, #71717a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
    font-family: serif;
    font-style: italic;
    color: #ef4444; /* red-500 */
    -webkit-text-fill-color: #ef4444;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #a1a1aa;
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.6;
  text-wrap: pretty;
`;

const FakeTerminal = styled.div`
  background: #09090b;
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-family: monospace;
  color: #a1a1aa;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #52525b;
    color: #fff;
  }
`;

export const Home = () => {
  const copyInstall = () => {
    navigator.clipboard.writeText("npm install nocturna-ui");
    alert("Comando copiado para a área de transferência.");
  };

  return (
    <HeroSection>
      <BadgeWrapper>
        <SigilBadge variant="void" styleType="outline" size="sm">
          v0.0.5 Disponível • Aliases & Coverage
        </SigilBadge>
      </BadgeWrapper>

      <Title>
        Nocturna <span>UI</span>
      </Title>

      <Subtitle>
        Uma biblioteca de componentes React forjada na estética brutalista e
        gótica. Componentes acessíveis, tipados e prontos para a escuridão.
      </Subtitle>

      <FakeTerminal onClick={copyInstall} title="Clique para copiar">
        <Terminal size={16} />
        <span>npm install nocturna-ui</span>
        <Copy size={14} className="ml-2 opacity-50" />
      </FakeTerminal>
    </HeroSection>
  );
};
