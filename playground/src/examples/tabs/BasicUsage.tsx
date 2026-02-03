import { Tabs, Card, Badge, Box, Text, VStack, HStack } from "nocturna-ui";

export const BasicUsage = () => {
  const items = [
    {
      id: "data",
      label: "Dados",
      content: (
        <VStack gap={4}>
          <Text color="zinc-400">Acesso direto ao banco de dados neural. Leitura apenas.</Text>
          <HStack justify="between" pb="0.5rem" style={{ borderBottom: "1px solid #27272a" }}>
            <Text color="zinc-300" fontSize="sm">
              Integridade
            </Text>
            <Badge variant="secondary" styleType="solid">
              98%
            </Badge>
          </HStack>
          <HStack justify="between" pb="0.5rem" style={{ borderBottom: "1px solid #27272a" }}>
            <Text color="zinc-300" fontSize="sm">
              Latência
            </Text>
            <Badge variant="primary">12ms</Badge>
          </HStack>
        </VStack>
      ),
    },
    {
      id: "logs",
      label: "Registros",
      content: (
        <VStack gap={4}>
          <Text color="zinc-400">Últimas 24 horas de atividade do sistema.</Text>
          <Box fontFamily="mono" fontSize="0.8rem" color="zinc-500">
            <div>[08:00] Inicialização do Kernel... OK</div>
            <div>[08:05] Conexão remota estabelecida.</div>
            <Text color="danger">[10:42] Erro de paridade no setor 9.</Text>
          </Box>
        </VStack>
      ),
    },
  ];

  const ghostItems = [
    {
      id: "profile",
      label: "Perfil",
      content: <Text color="zinc-500">Configurações de usuário.</Text>,
    },
    {
      id: "account",
      label: "Conta",
      content: <Text color="zinc-500">Detalhes de faturamento e plano.</Text>,
    },
    {
      id: "api",
      label: "API Keys",
      content: <Text color="zinc-500">Gerenciamento de chaves de acesso.</Text>,
    },
  ];

  return (
    <VStack gap={12} w="full">
      {/* Exemplo Principal */}
      <Card title="Terminal do Usuário">
        <Tabs tabs={items} variant="primary" fontWeight="semibold" />
      </Card>

      {/* Exemplo Ghost */}
      <Card title="Configurações (Ghost)" variant="ghost">
        <Box mb="1rem">
          <Text fontSize="sm" color="zinc-500">
            Variante ideal para menus internos ou navegação secundária.
          </Text>
        </Box>
        <Tabs tabs={ghostItems} variant="ghost" />
      </Card>

      {/* Exemplo Warning */}
      <Card title="Modo de Segurança" variant="warning">
        <Tabs
          variant="warning"
          uppercase={false}
          fontFamily="mono"
          fontSize="lg"
          fontWeight="bold"
          tabs={[
            {
              id: "alert",
              label: "Alertas",
              content: <Text color="warning">3 Ameaças detectadas.</Text>,
            },
            {
              id: "quarantine",
              label: "Quarentena",
              content: <Text color="zinc-500">Nenhum arquivo isolado.</Text>,
            },
          ]}
        />
      </Card>
    </VStack>
  );
};
