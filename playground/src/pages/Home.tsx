import { Copy, Terminal } from "lucide-react";
import { Badge, useToast } from "nocturna-ui";
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

  /* Grid Cyber Goth */
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
    /* Accent: Phantom Pink */
    color: #ff007f;
    -webkit-text-fill-color: #ff007f;
    text-shadow: 0 0 20px rgba(255, 0, 127, 0.3);
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
  padding: 1rem 1.5rem;
  font-family: monospace;
  color: #a1a1aa;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    /* Secondary: Malware Green */
    border-color: #00ff41;
    color: #00ff41;
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.2);
  }
`;

export const Home = () => {
  const { toast } = useToast();

  const copyInstall = () => {
    navigator.clipboard.writeText("npm install nocturna-ui");
    toast({
      title: "Comando Copiado",
      description: "npm install nocturna-ui",
      type: "success",
      duration: 2000,
    });
  };

  return (
    <HeroSection>
      <BadgeWrapper>
        <Badge variant="accent" styleType="outline" size="sm">
          v0.0.6 • Cyber Goth Update
        </Badge>
      </BadgeWrapper>

      <Title>
        Nocturna <span>UI</span>
      </Title>

      <Subtitle>
        Primitivos góticos e brutalistas forjados para a web que não teme a escuridão. Agora com
        paleta Cyber e tokens semânticos.
      </Subtitle>

      <FakeTerminal onClick={copyInstall} title="Clique para copiar">
        <Terminal size={16} />
        <span>npm install nocturna-ui</span>
        <Copy size={14} className="ml-2 opacity-50" />
      </FakeTerminal>
    </HeroSection>
  );
};
