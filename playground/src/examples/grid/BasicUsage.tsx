import styled from "styled-components";
import { Grid, Box, Text, Heading } from "nocturna-ui";

// 1. Grid Responsivo: Mobile First (1 coluna) -> Desktop (3 colunas)
const ResponsiveGrid = styled(Grid)`
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  height: auto;

  @media (min-width: 1024px) {
    grid-template-columns: 250px 1fr 300px;
    grid-template-rows: 80px 1fr 150px;
    height: 600px;
  }
`;

// 2. Componentes de Área para controlar o posicionamento (grid-column/row)
const HeaderArea = styled(Box)`
  grid-column: 1 / -1; // Ocupa tudo em qualquer tamanho
`;

const SidebarArea = styled(Box)`
  @media (min-width: 1024px) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }
`;

const MainArea = styled(Box)`
  @media (min-width: 1024px) {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }
`;

const WidgetsArea = styled(Box)`
  @media (min-width: 1024px) {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
  }
`;

const FooterArea = styled(Box)`
  grid-column: 1 / -1; // Mobile: largura total

  @media (min-width: 1024px) {
    grid-column: 2 / -1; // Desktop: começa após a sidebar
    grid-row: 3 / 4;
  }
`;

export const BasicUsage = () => {
  return (
    <Box w="full" color="zinc-200">
      <Heading level="h3" mb={6} color="primary">
        Cyber Dashboard Layout (Responsive)
      </Heading>

      <Text mb={4} color="zinc-400">
        Layout adaptativo: empilha os blocos em telas menores e expande para um dashboard complexo
        em desktop, prevenindo overflow horizontal.
      </Text>

      {/* Grid Wrapper */}
      <ResponsiveGrid
        gap={4}
        bg="background"
        p={4}
        rounded="md"
        style={{ border: "1px solid #27272a" }}
      >
        {/* HEADER */}
        <HeaderArea
          bg="zinc-900"
          p={4}
          rounded="sm"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Text fontWeight="bold" color="accent" fontSize="xl">
            NOCTURNA_OS v2.0
          </Text>
        </HeaderArea>

        {/* SIDEBAR */}
        <SidebarArea bg="zinc-900" p={4} rounded="sm">
          <Text color="zinc-500" mb={4} fontSize="sm">
            MENU
          </Text>
          <Box as="ul" style={{ listStyle: "none", padding: 0 }}>
            {["Dashboard", "Analytics", "Settings", "Logs"].map((item) => (
              <Box
                as="li"
                key={item}
                mb={2}
                p={2}
                bg="black"
                rounded="sm"
                style={{ cursor: "pointer" }}
              >
                <Text fontSize="sm">{item}</Text>
              </Box>
            ))}
          </Box>
        </SidebarArea>

        {/* MAIN CONTENT */}
        <MainArea bg="black" p={6} rounded="sm" style={{ border: "1px solid #3f3f46" }}>
          <Heading level="h4" mb={4}>
            Atividade do Sistema
          </Heading>
          <Text>
            Este painel central se expande para preencher o espaço disponível (1fr). Em mobile, ele
            flui naturalmente abaixo do menu.
          </Text>
          <Box
            mt={8}
            h="200px"
            bg="zinc-900"
            rounded="sm"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Text color="zinc-600" italic>
              Gráfico Placeholder
            </Text>
          </Box>
        </MainArea>

        {/* WIDGETS */}
        <WidgetsArea bg="zinc-900" p={4} rounded="sm">
          <Text color="warning" fontWeight="bold" mb={2}>
            ALERTAS
          </Text>
          <Box p={3} mb={2} bg="rgba(220, 38, 38, 0.1)" style={{ borderLeft: "2px solid #DC2626" }}>
            <Text fontSize="xs" color="danger">
              CPU Overload: 98%
            </Text>
          </Box>
          <Box p={3} bg="rgba(0, 255, 65, 0.1)" style={{ borderLeft: "2px solid #00FF41" }}>
            <Text fontSize="xs" color="secondary">
              Backup Complete
            </Text>
          </Box>
        </WidgetsArea>

        {/* FOOTER */}
        <FooterArea
          bg="zinc-950"
          p={4}
          rounded="sm"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text fontSize="xs" color="zinc-500">
            Status: ONLINE
          </Text>
          <Text fontSize="xs" fontFamily="mono" color="secondary">
            PING: 12ms
          </Text>
        </FooterArea>
      </ResponsiveGrid>
    </Box>
  );
};
