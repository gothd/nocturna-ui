import { Accordion, Badge, Box, Text } from "nocturna-ui";

export const BasicUsage = () => {
  const systemItems = [
    {
      title: "Terminal Root",
      content: (
        <Box>
          <Text fontSize="sm" color="zinc-300" mb={2}>
            Acesso de superusuário concedido. Logs de sistema disponíveis.
          </Text>
          <Box p={3} bg="zinc-900" rounded="sm" style={{ borderLeft: "2px solid #00FF41" }}>
            <Text fontFamily="mono" fontSize="xs" color="secondary">
              $ sudo apt-get install nocturna-ui --force-yes
            </Text>
          </Box>
        </Box>
      ),
    },
    {
      id: "cpu-stats",
      title: "Processamento Neural",
      content: (
        <Text fontSize="sm" color="zinc-400">
          Alocação de núcleos: 8/12. Temperatura estável em 45°C.
        </Text>
      ),
    },
  ];

  const securityItems = [
    {
      title: "Status do Firewall",
      content: (
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Text fontSize="sm" color="zinc-300">
            Tráfego de entrada bloqueado.
          </Text>
          <Badge variant="danger" size="sm">
            BLOCK
          </Badge>
        </Box>
      ),
    },
    {
      title: "Relatório de Intrusão",
      content: (
        <Text fontSize="sm" color="zinc-400" italic>
          Nenhuma tentativa de acesso não autorizado nas últimas 24h.
        </Text>
      ),
    },
  ];

  return (
    <Box w="full" maxW="600px">
      {/* Exemplo 1: Default (Primary) */}
      <Box mb={8}>
        <Text fontWeight="bold" color="primary" mb={4} fontSize="lg">
          Configurações do Sistema
        </Text>
        <Accordion items={systemItems} allowMultiple uppercase={false} w="full" />
      </Box>

      {/* Exemplo 2: Ghost Variant */}
      <Box>
        <Text fontWeight="bold" color="zinc-500" mb={4} fontSize="lg">
          Histórico (Ghost Variant)
        </Text>
        <Accordion items={securityItems} variant="ghost" fontFamily="mono" w="full" />
      </Box>
    </Box>
  );
};
