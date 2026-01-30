import { VStack, HStack, Button, Text, Box } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <VStack gap={10} w="full">
      {/* Exemplo 1: Stack Vertical com Dividers Automáticos */}
      <VStack variant="primary" align="stretch" gap={4} dividers>
        <Box p={2}>
          <Text fontWeight="bold" fontSize="lg" color="primary">
            Painel de Controle
          </Text>
          <Text fontSize="xs" color="zinc-500">
            dividers={`{true}`}
          </Text>
        </Box>

        <Box p={2}>
          <Text color="zinc-300">Configurações de Conta</Text>
        </Box>

        <Box p={2}>
          <Text color="zinc-300">Preferências de Sistema</Text>
        </Box>

        <HStack justify="end" w="full" gap={4} pt={2}>
          <Button size="sm" variant="danger">
            Cancelar
          </Button>
          <Button size="sm">Salvar</Button>
        </HStack>
      </VStack>

      {/* Exemplo 2: HStack com Dividers Verticais */}
      <Box>
        <Text mb={2} fontSize="sm" color="zinc-500">
          Breadcrumb simulado (HStack + Dividers):
        </Text>
        <HStack
          gap={4}
          dividers
          h="20px" // Altura fixa necessária para o separador vertical esticar
          align="center"
        >
          <Text fontSize="sm" color="zinc-400" style={{ cursor: "pointer" }}>
            Home
          </Text>
          <Text fontSize="sm" color="zinc-400" style={{ cursor: "pointer" }}>
            Produtos
          </Text>
          <Text fontSize="sm" color="accent" fontWeight="bold">
            Cyber Deck
          </Text>
        </HStack>
      </Box>

      {/* Exemplo 3: Variantes */}
      <HStack variant="danger" justify="between" align="center">
        <Text color="danger" fontWeight="bold">
          ZONA CRÍTICA
        </Text>
        <Button size="sm" variant="danger">
          Formatar Disco
        </Button>
      </HStack>
    </VStack>
  );
};
