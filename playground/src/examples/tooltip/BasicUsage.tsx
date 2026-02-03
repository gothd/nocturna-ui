import { HelpCircle, Info, ShieldAlert, Wifi } from "lucide-react";
import { Box, Button, Card, Flex, HStack, Text, Tooltip, VStack } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <VStack gap={4} w="full">
      <Card title="Dicas de Contexto">
        <Box textAlign="center" mb="2rem">
          <Text color="zinc-400" fontSize="sm">
            Passe o mouse ou foque nos botões para revelar informações adicionais.
          </Text>
        </Box>

        <Flex gap={4} justify="center" wrap="wrap">
          <Tooltip content="Conexão Estável (Top)" position="top" variant="secondary">
            <Button size="sm" variant="secondary" aria-label="Status da Rede">
              <Wifi size={18} />
            </Button>
          </Tooltip>

          <Tooltip content="Detalhes do Sistema (Bottom)" position="bottom" variant="primary">
            <Button size="sm" variant="primary" aria-label="Informações">
              <Info size={18} />
            </Button>
          </Tooltip>

          <Tooltip content="Ameaça Detectada (Right)" position="right" variant="danger">
            <Button size="sm" variant="danger" aria-label="Alerta de Segurança">
              <ShieldAlert size={18} />
            </Button>
          </Tooltip>

          <Tooltip content="Ajuda (Left)" position="left" variant="warning">
            <Button size="sm" variant="warning" aria-label="Ajuda">
              <HelpCircle size={18} />
            </Button>
          </Tooltip>
        </Flex>
      </Card>

      <Card title="Delay Customizado" variant="accent">
        <HStack justify="center" gap={4}>
          <Text fontSize="sm" color="accent">
            Instantâneo (0ms)
          </Text>
          <Tooltip content="Aparece na hora!" delay={0} variant="accent">
            <Button variant="accent" size="sm">
              Hover Rápido
            </Button>
          </Tooltip>

          <div style={{ width: "2rem" }} />

          <Text fontSize="sm" color="zinc-500">
            Lento (500ms)
          </Text>
          <Tooltip content="Espere por mim..." delay={500} variant="primary">
            <Button variant="ghost" size="sm">
              Hover Lento
            </Button>
          </Tooltip>
        </HStack>
      </Card>
    </VStack>
  );
};
