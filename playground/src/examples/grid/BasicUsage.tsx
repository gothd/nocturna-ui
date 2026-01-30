import { Grid, Box, Text, Heading } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <Box w="full" color="zinc-200">
      <Heading level="h3" mb={6} color="primary">
        Cyber Dashboard Layout
      </Heading>

      <Text mb={4} color="zinc-400">
        Um layout de grade complexo usando <code>templateColumns</code> e <code>templateRows</code>.
        Observe como os itens filhos usam estilo inline para <code>gridColumn</code>/
        <code>gridRow</code> para se posicionarem.
      </Text>

      {/* Container Principal do Grid */}
      <Grid
        h="600px"
        templateRows="80px 1fr 150px" // Header, Content, Footer
        templateColumns="250px 1fr 300px" // Sidebar, Main, Widgets
        gap={4}
        bg="background"
        p={4}
        rounded="md"
        style={{ border: "1px solid #27272a" }} // Borda sutil zinc-800
      >
        {/* HEADER: Ocupa toda a largura (3 colunas) */}
        <Box
          bg="zinc-900"
          p={4}
          rounded="sm"
          style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center" }}
        >
          <Text fontWeight="bold" color="accent" fontSize="xl">
            NOCTURNA_OS v2.0
          </Text>
        </Box>

        {/* SIDEBAR: Coluna 1 */}
        <Box bg="zinc-900" p={4} rounded="sm">
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
        </Box>

        {/* MAIN CONTENT: Coluna 2 */}
        <Box bg="black" p={6} rounded="sm" style={{ border: "1px solid #3f3f46" }}>
          <Heading level="h4" mb={4}>
            Atividade do Sistema
          </Heading>
          <Text>
            O grid permite layouts assimétricos com facilidade. Este painel central se expande para
            preencher o espaço disponível (1fr).
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
        </Box>

        {/* WIDGETS: Coluna 3 */}
        <Box bg="zinc-900" p={4} rounded="sm">
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
        </Box>

        {/* FOOTER: Ocupa as duas últimas colunas */}
        <Box
          bg="zinc-950"
          p={4}
          rounded="sm"
          style={{
            gridColumn: "2 / -1", // Começa na coluna 2 e vai até o fim
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
        </Box>
      </Grid>
    </Box>
  );
};
