import { Button, Card, Flex, Text, useToast } from "nocturna-ui";

export const BasicUsage = () => {
  const { toast, dismissAll } = useToast();

  return (
    <Flex direction="column" gap={8} w="full" maxW="600px">
      <Card title="Central de Notificações">
        <Text color="zinc-400" mb="1.5rem" fontSize="sm">
          Dispare notificações flutuantes. As cores reagem automaticamente ao <code>type</code>{" "}
          escolhido.
        </Text>

        <Flex wrap="wrap" gap={4}>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              toast({
                title: "Upload Concluído",
                description: "Dados transferidos para o servidor local.",
                type: "success", // Automático -> Secondary (Verde)
              })
            }
          >
            Success
          </Button>

          <Button
            size="sm"
            variant="warning"
            onClick={() =>
              toast({
                title: "Atenção",
                description: "Uso de memória acima de 80%.",
                type: "warning", // Automático -> Warning (Gold)
              })
            }
          >
            Warning
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() =>
              toast({
                title: "Falha Crítica",
                description: "Não foi possível conectar ao banco de dados.",
                type: "error", // Automático -> Danger (Vermelho)
              })
            }
          >
            Error
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={() =>
              toast({
                title: "Nova Mensagem",
                description: "Você recebeu um pacote de dados criptografado.",
                type: "info", // Automático -> Primary (Branco)
              })
            }
          >
            Info
          </Button>
        </Flex>
      </Card>

      <Card title="Controle Manual (Accent)" variant="accent">
        <Flex gap={4}>
          <Button variant="primary" size="sm" onClick={dismissAll}>
            Limpar Tudo
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={() =>
              toast({
                title: "Estilo Forçado",
                description: "Este toast usa variant='accent' explicitamente, ignorando o type.",
                variant: "accent",
                type: "info",
              })
            }
          >
            Forçar Accent
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};
