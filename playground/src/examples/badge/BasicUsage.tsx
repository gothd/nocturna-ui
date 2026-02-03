import { Badge, Box, Text, HStack } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <Box w="full">
      {/* Seção 1: Variantes de Status */}
      <Box mb={8}>
        <Text fontSize="sm" color="zinc-500" mb={4} fontWeight="bold">
          Variantes
        </Text>
        <HStack gap={4} wrap="wrap">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </HStack>
      </Box>

      {/* Seção 2: Tamanhos */}
      <Box mb={8}>
        <Text fontSize="sm" color="zinc-500" mb={4} fontWeight="bold">
          Tamanhos
        </Text>
        <HStack gap={4} align="center">
          <Badge size="sm" styleType="outline">
            Small (sm)
          </Badge>
          <Badge size="md" variant="primary">
            Medium (md)
          </Badge>
        </HStack>
      </Box>

      {/* Seção 3: Customização com System Props */}
      <Box>
        <Text fontSize="sm" color="zinc-500" mb={4} fontWeight="bold">
          Customização (System Props)
        </Text>
        <Box p={4} bg="zinc-900" rounded="md" style={{ display: "inline-flex", gap: "1rem" }}>
          {/* Exemplo de Badge customizado visualmente */}
          <Badge bg="white" color="black" px={4} py={1} rounded="md" style={{ border: "none" }}>
            CUSTOM_SOLID
          </Badge>

          {/* Exemplo de Badge com margem customizada */}
          <Badge variant="accent" mt={2}>
            Margin Top
          </Badge>
        </Box>
      </Box>
    </Box>
  );
};
