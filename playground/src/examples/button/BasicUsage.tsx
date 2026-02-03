import { Button, Card, VStack, HStack, Text } from "nocturna-ui";
import { Zap, Trash2, Ghost } from "lucide-react"; // Assumindo lucide-react disponível ou ícones similares

export const BasicUsage = () => {
  return (
    <VStack gap={8} w="full">
      {/* Variantes Padrão */}
      <Card title="Cyber Goth Palette">
        <Text color="zinc-400" mb={6}>
          Botões brutalistas com sombras rígidas que reagem à variante.
        </Text>

        <HStack gap={4} wrap="wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </HStack>
      </Card>

      {/* Tamanhos e Ícones */}
      <Card title="Tamanhos e Ícones" variant="secondary">
        <VStack gap={6} align="start">
          <HStack gap={4} align="center">
            <Button size="sm" variant="secondary">
              Small
            </Button>
            <Button size="md" variant="secondary">
              Medium (Default)
            </Button>
            <Button size="lg" variant="secondary">
              Large
            </Button>
          </HStack>

          <HStack gap={4}>
            <Button variant="accent" size="sm">
              <Zap size={16} style={{ marginRight: "0.5rem" }} />
              Action
            </Button>

            <Button variant="danger" size="sm">
              <Trash2 size={16} style={{ marginRight: "0.5rem" }} />
              Delete
            </Button>

            <Button variant="ghost" size="sm">
              <Ghost size={16} style={{ marginRight: "0.5rem" }} />
              Invisible
            </Button>
          </HStack>
        </VStack>
      </Card>

      {/* Estados e System Props */}
      <Card title="Estados & Customização">
        <HStack gap={4} mb={4}>
          <Button isLoading variant="primary">
            Processando
          </Button>
          <Button disabled variant="danger">
            Desabilitado
          </Button>
        </HStack>

        <Text fontSize="sm" color="zinc-500" mb={2} mt={4}>
          Botão expandido via System Props (w="full"):
        </Text>
        <Button variant="accent" w="full" onClick={() => alert("Full Width!")}>
          COMPRAR AGORA
        </Button>
      </Card>
    </VStack>
  );
};
