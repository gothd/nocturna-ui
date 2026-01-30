import { Flex, Box, Badge } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <Flex direction="column" gap={6}>
      {/* Toolbar Pattern */}
      <Flex justify="between" align="center" bg="zinc-900" p={4} className="border border-zinc-800">
        <Box fontWeight="bold" fontSize="xl">
          Nocturna
        </Box>

        <Flex gap={4}>
          <Box as="a" href="#" color="zinc-400" style={{ textDecoration: "none" }}>
            Docs
          </Box>
          <Box as="a" href="#" color="accent" style={{ textDecoration: "none" }}>
            Login
          </Box>
        </Flex>
      </Flex>

      {/* Card Pattern with Flex */}
      <Flex gap={4} align="start">
        <Box w={16} h={16} bg="zinc-800" className="shrink-0" />

        <Flex direction="column" gap={2}>
          <Flex align="center" gap={2}>
            <Box fontWeight="bold">Título do Item</Box>
            <Badge variant="secondary" size="sm">
              Novo
            </Badge>
          </Flex>
          <Box color="zinc-500" fontSize="sm">
            Descrição flexível que se adapta ao espaço disponível ao lado da imagem.
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
