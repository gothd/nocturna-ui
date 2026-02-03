import { Separator, Card, Button, VStack, Text, HStack } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <VStack gap={8}>
      {/* Caso 1: Separador Horizontal Padrão */}
      <Card title="Divisores de Conteúdo">
        <VStack gap={4}>
          <Text color="zinc-400">Introdução ao capítulo 1.</Text>

          {/* Separador simples */}
          <Separator variant="primary" />

          <Text color="zinc-400">Conteúdo principal do texto sagrado.</Text>

          {/* Separador com Label e Margem via System Props */}
          <Separator variant="accent" label="Capítulo 2" my={8} />

          <Text color="zinc-400">Início da segunda parte da profecia.</Text>
        </VStack>
      </Card>

      {/* Caso 2: Separador Vertical */}
      <Card title="Toolbar (Vertical Separator)" variant="secondary">
        <HStack h={12} gap={4}>
          <Button size="sm" variant="ghost">
            Edit
          </Button>
          <Button size="sm" variant="ghost">
            View
          </Button>

          {/* Separador Vertical: Preenche a altura do pai */}
          <Separator orientation="vertical" variant="secondary" />

          <Button size="sm" variant="ghost">
            Copy
          </Button>
          <Button size="sm" variant="ghost">
            Paste
          </Button>

          <Separator orientation="vertical" variant="secondary" />

          <Text fontSize="xs" color="secondary" style={{ marginLeft: "auto" }}>
            v2.0.1
          </Text>
        </HStack>
      </Card>

      {/* Caso 3: Variantes */}
      <Card title="Zona Restrita" variant="danger">
        <HStack justify="between">
          <Text color="danger">Status: Comprometido</Text>
          <Button size="sm" variant="danger">
            Reportar
          </Button>
        </HStack>

        <Separator variant="danger" label="Classified" my={6} />

        <Text color="danger" style={{ opacity: 0.8, fontSize: "0.875rem" }}>
          Estas informações são visíveis apenas para nível 5 de acesso.
        </Text>
      </Card>
    </VStack>
  );
};
