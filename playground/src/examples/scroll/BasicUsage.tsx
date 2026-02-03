import { Box, Card, Scroll, Separator, Text, SimpleGrid, VStack, Flex } from "nocturna-ui";

const MockText = () => (
  <VStack gap={4} p={2}>
    <Text color="zinc-400" fontSize="sm">
      O céu sobre o porto tinha a cor de uma televisão sintonizada num canal morto. Nesta era de
      silício e aço, a carne é apenas um hospedeiro para a interface.
    </Text>
    <Separator variant="primary" label="Log #42" />
    <Text color="zinc-400" fontSize="sm">
      A cidade nunca dorme, ela apenas entra em modo de espera. As luzes de neon refletem nas poças
      de chuva ácida.
    </Text>
    {Array.from({ length: 5 }).map((_, i) => (
      <Text key={i} color="zinc-500" fontSize="xs" fontFamily="mono">
        &gt; Setor {i + 10} corrompido. Tentando re-alocação...
      </Text>
    ))}
  </VStack>
);

export const BasicUsage = () => {
  return (
    <VStack w="full" gap={8}>
      {/* Grid Responsivo via SimpleGrid (minChildWidth ativa o modo auto-fit) */}
      <SimpleGrid minChildWidth="350px" spacing={8} w="full">
        <Card title="Logs Verticais (Accent)">
          <Scroll maxH="250px" variant="accent">
            <MockText />
          </Scroll>
        </Card>

        <Card title="Terminal de Erros (Danger)" variant="danger">
          <Scroll maxH="250px" variant="danger">
            <VStack gap={2} p={2}>
              {Array.from({ length: 20 }).map((_, i) => (
                <Text key={i} fontFamily="mono" fontSize="xs" color="danger">
                  [CRITICAL] Error at 0x{i}00F... Stack overflow.
                </Text>
              ))}
            </VStack>
          </Scroll>
        </Card>
      </SimpleGrid>

      <Card title="Scroll Horizontal (Timeline)" variant="secondary">
        <Scroll orientation="horizontal" variant="secondary" pb={4}>
          <Flex gap={4} w="max-content" p={2}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Box
                key={i}
                w="12rem"
                h="8rem"
                className="border-2 border-secondary/30 bg-secondary/5 flex items-center justify-center shrink-0"
                // Fallback de estilo caso as classes de opacidade não funcionem sem tailwind
                style={{ flexShrink: 0 }}
              >
                <Text color="secondary">Evento {i + 1}</Text>
              </Box>
            ))}
          </Flex>
        </Scroll>
      </Card>
    </VStack>
  );
};
