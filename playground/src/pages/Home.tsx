import { Accessibility, Box as BoxIcon, Copy, Cpu, Layers } from "lucide-react";
import { Badge, Box, Button, Card, Separator, SimpleGrid, Text, useToast } from "nocturna-ui";
import styled from "styled-components";

// --- Styled Components (Apenas para o Background) ---

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 4rem 2rem;

  /* Grid Cyber Goth */
  background-color: #050505;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(255, 0, 127, 0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Title = styled.h1`
  font-size: clamp(3.5rem, 10vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
  z-index: 1;
  background: linear-gradient(to bottom, #fff, #71717a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
    display: block;
    font-size: 0.4em;
    font-weight: 400;
    letter-spacing: 0.2em;
    color: #ff007f; /* Accent Phantom Pink */
    -webkit-text-fill-color: #ff007f;
    text-transform: uppercase;
    margin-top: 1rem;
    font-family: serif;
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
      variant: "secondary",
      duration: 2000,
    });
  };

  return (
    <Box>
      <HeroSection>
        <Box mb={8} className="animate-fade-in-down">
          <Badge variant="accent" styleType="outline" size="sm">
            v0.1.0 • System Props Engine
          </Badge>
        </Box>

        <Title className="animate-fade-in">
          Nocturna UI
          <span>Primitivos da Escuridão</span>
        </Title>

        <Text
          fontSize="lg"
          color="zinc-400"
          maxW="600px"
          textAlign="center"
          mb={10}
          lineHeight="relaxed"
          style={{ zIndex: 1 }}
        >
          Um sistema de design forjado para a web moderna. Agora com <b>Layout Primitives</b> e{" "}
          <b>Style Props</b> para um desenvolvimento brutalmente eficiente.
        </Text>

        <Button size="lg" variant="primary" onClick={copyInstall} className="group">
          <Copy size={18} style={{ marginRight: 8 }} />
          npm install nocturna-ui
        </Button>
      </HeroSection>

      <Separator label="Arquitetura v0.1.0" variant="accent" my={0} />

      <Box bg="black" py={20} px={6}>
        <Box maxW="1200px" mx="auto">
          <SimpleGrid minChildWidth="300px" spacing={8}>
            <Card variant="secondary" title="Layout Engine">
              <Box mb={4} color="secondary">
                <Layers size={24} />
              </Box>
              <Text color="zinc-400" fontSize="sm">
                Novos componentes primitivos como <code>Box</code>, <code>Stack</code> e{" "}
                <code>Grid</code> permitem construir layouts complexos sem escrever uma linha de
                CSS.
              </Text>
            </Card>

            <Card variant="accent" title="System Props">
              <Box mb={4} color="accent">
                <BoxIcon size={24} />
              </Box>
              <Text color="zinc-400" fontSize="sm">
                Estilize componentes diretamente nas props. Margens, cores, tipografia e
                responsividade injetadas via <code>style</code> inline otimizado.
              </Text>
            </Card>

            <Card variant="warning" title="Type Safe">
              <Box mb={4} color="warning">
                <Cpu size={24} />
              </Box>
              <Text color="zinc-400" fontSize="sm">
                Intellisense de primeira classe. Autocomplete para tokens de design e validação
                rigorosa de tipos TypeScript em todas as props.
              </Text>
            </Card>

            <Card variant="primary" title="Acessibilidade">
              <Box mb={4} color="white">
                <Accessibility size={24} />
              </Box>
              <Text color="zinc-400" fontSize="sm">
                Componentes como Modal, Tabs e Menu seguem os padrões WAI-ARIA rigorosamente,
                garantindo navegação por teclado e leitores de tela.
              </Text>
            </Card>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
