import styled from "styled-components";
import { Card, Button, Badge, Box, Text, Flex } from "nocturna-ui";

// Grid responsivo manual (em breve será adicionado breakpoints ao system)
const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const BasicUsage = () => {
  return (
    <ResponsiveGrid>
      {/* Exemplo Primary */}
      <Card
        title="Sistema Neural"
        description="Conexão estável e monitorada."
        fontFamily="sans"
        footer={
          <Flex justify="between" align="center">
            <Badge variant="primary" styleType="solid">
              V 2.0
            </Badge>
            <Text fontSize="xs" color="zinc-500">
              Uptime: 99%
            </Text>
          </Flex>
        }
      >
        <Text color="zinc-400" fontSize="sm" mb={4}>
          O núcleo processa dados em velocidade quântica. Nenhuma anomalia detectada nos setores
          principais.
        </Text>
        <Button variant="primary" w="full">
          Acessar Logs
        </Button>
      </Card>

      {/* Exemplo Accent */}
      <Card
        title="Protocolo Phantom"
        description="Acesso Restrito detectado."
        descriptionFontFamily="serif"
        variant="accent"
      >
        <Text color="zinc-400" fontSize="sm" mb={4}>
          Tentativa de intrusão no setor 7. Medidas de contra-ataque foram iniciadas
          automaticamente.
        </Text>
        <Flex gap={2}>
          <Badge variant="accent">Crítico</Badge>
          <Badge variant="ghost">Sec 7</Badge>
        </Flex>
        <Button variant="accent" w="full" mt={6}>
          Neutralizar
        </Button>
      </Card>

      {/* Exemplo Ghost (Novo) */}
      <Card
        title="Arquivos Mortos"
        variant="ghost"
        h="full" // Garante altura igual aos outros cards no grid
      >
        <Text color="zinc-500" fontSize="sm" mb={4}>
          Registros antigos e dados corrompidos. Acesso apenas para leitura histórica.
        </Text>

        {/* Grid interno simples para os arquivos */}
        <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          <Box p={2} bg="zinc-900" rounded="sm">
            <Text fontSize="xs" fontFamily="mono" color="zinc-600">
              LOG_001.dat
            </Text>
          </Box>
          <Box p={2} bg="zinc-900" rounded="sm">
            <Text fontSize="xs" fontFamily="mono" color="zinc-600">
              LOG_002.dat
            </Text>
          </Box>
        </Box>
      </Card>
    </ResponsiveGrid>
  );
};
