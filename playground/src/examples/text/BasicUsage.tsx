import { Text, Box, VStack, Heading, Grid } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <Box w="full">
      <Heading level="h2" mb={2}>
        Tipografia
      </Heading>
      <Text color="zinc-400" mb={8}>
        O sistema de tipografia da Nocturna UI gerencia 3 famílias de fontes distintas para criar
        hierarquia visual.
      </Text>

      <VStack gap={8} align="start">
        {/* Seção Serifada (Identidade Gótica) */}
        <Box w="full" p={6} bg="zinc-900" rounded="md" style={{ borderLeft: "4px solid #fff" }}>
          <Text fontSize="sm" color="zinc-500" mb={2} fontWeight="bold">
            fontFamily="serif" (Playfair Display)
          </Text>
          <Text fontFamily="serif" fontSize="4xl" color="primary" mb={2}>
            The Elegance of Darkness.
          </Text>
          <Text fontFamily="serif" fontSize="xl" italic color="zinc-300">
            "Usado principalmente para Títulos e frases de impacto que exigem a estética gótica."
          </Text>
        </Box>

        {/* Seção Sans-Serif (Interface/Leitura) */}
        <Box w="full" p={6} bg="zinc-900" rounded="md" style={{ borderLeft: "4px solid #52525b" }}>
          <Text fontSize="sm" color="zinc-500" mb={2} fontWeight="bold">
            fontFamily="sans" (Inter / System UI) - Padrão
          </Text>
          <Text fontFamily="sans" fontSize="lg" color="white" mb={2} lineHeight="1.6">
            A tipografia Sans é utilizada para o corpo do texto, interfaces de usuário e componentes
            densos. Ela oferece alta legibilidade em tamanhos pequenos.
          </Text>
          <Text fontSize="sm" color="zinc-400">
            Este parágrafo usa a fonte padrão sem serifa. O contraste é ajustado para leitura
            prolongada.
          </Text>
        </Box>

        {/* Seção Monospace (Código/Dados) */}
        <Box w="full" p={6} bg="black" rounded="md" style={{ border: "1px solid #3f3f46" }}>
          <Text fontSize="sm" color="zinc-500" mb={4} fontWeight="bold">
            fontFamily="mono" (JetBrains Mono)
          </Text>

          <Box p={4} bg="zinc-950" rounded="sm">
            <Text fontFamily="mono" color="accent" fontSize="sm">
              const
              <Text as="span" color="primary" mx={2}>
                summonEntity
              </Text>
              = async () ={">"} {"{"}
            </Text>
            <Text fontFamily="mono" color="zinc-400" fontSize="sm" ml={4}>
              await{" "}
              <Text as="span" color="secondary">
                void.connect()
              </Text>
              ;
            </Text>
            <Text fontFamily="mono" color="zinc-400" fontSize="sm" ml={4}>
              return{" "}
              <Text as="span" color="warning">
                "Entity Summoned"
              </Text>
              ;
            </Text>
            <Text fontFamily="mono" color="accent" fontSize="sm">
              {"}"}
            </Text>
          </Box>
        </Box>

        {/* Demonstração de Pesos e Cores */}
        <Box w="full" mt={4}>
          <Heading level="h4" mb={4}>
            Pesos & Cores
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Text fontWeight="normal" color="zinc-400">
              Normal (400)
            </Text>
            <Text fontWeight="medium" color="zinc-300">
              Medium (500)
            </Text>
            <Text fontWeight="semibold" color="white">
              Semibold (600)
            </Text>
            <Text fontWeight="bold" color="accent">
              Bold (700)
            </Text>
            <Text fontWeight="extrabold" color="secondary">
              Extrabold (800)
            </Text>
            <Text fontWeight="black" color="danger" fontSize="xl">
              BLACK (900)
            </Text>
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};
