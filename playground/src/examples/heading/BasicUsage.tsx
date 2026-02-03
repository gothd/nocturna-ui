import { VStack, Heading, Text } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <VStack gap={6} align="start">
      <div>
        <Heading level="h1" color="primary">
          Heading H1
        </Heading>
        <Text color="zinc-500">A maior hierarquia, serifada e uppercase.</Text>
      </div>

      <div>
        <Heading level="h2" color="accent" uppercase={false}>
          Heading H2 (Accent)
        </Heading>
        <Text color="zinc-500">Subtítulos de seção.</Text>
      </div>

      <div>
        <Heading level="h3" color="secondary" fontFamily="mono">
          Heading H3 (Mono Override)
        </Heading>
        <Text color="zinc-500">É possível sobrescrever a fonte padrão para casos técnicos.</Text>
      </div>
    </VStack>
  );
};
