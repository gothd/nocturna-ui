import { Button, Card, Grid, Select, VStack, Text } from "nocturna-ui";
import { useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BasicUsage = () => {
  const [server, setServer] = useState("sa-east-1");
  const [protocol, setProtocol] = useState("");

  const regions = [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "eu-west-1", label: "EU West (Ireland)" },
    { value: "sa-east-1", label: "SA East (São Paulo)" },
    { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
  ];

  const protocols = [
    { value: "aes", label: "AES-256 (Padrão)" },
    { value: "rsa", label: "RSA-4096 (Lento)" },
    { value: "chacha", label: "ChaCha20 (Rápido)" },
  ];

  return (
    <Layout>
      <Column>
        <Card title="Configuração de Rede">
          <VStack gap={6}>
            <Select
              label="Região do Servidor"
              options={regions}
              value={server}
              onChange={setServer}
              variant="secondary"
            />

            <Select
              label="Protocolo de Criptografia"
              placeholder="Selecione um método..."
              options={protocols}
              value={protocol}
              onChange={setProtocol}
              variant="accent"
            />

            <Button variant="secondary" w="full">
              Salvar Configuração
            </Button>
          </VStack>
        </Card>
      </Column>

      <Column>
        <Card title="Filtros Rápidos (Ghost)" variant="ghost">
          <Text fontSize="sm" mb={4} color="zinc-400">
            Variante ideal para barras de ferramentas e configurações secundárias.
          </Text>

          <VStack gap={4}>
            <Select
              placeholder="Filtrar por Status"
              variant="ghost"
              options={[
                { value: "all", label: "Todos" },
                { value: "active", label: "Ativos" },
                { value: "offline", label: "Offline" },
              ]}
            />

            <Grid templateColumns="1fr 1fr" gap={4}>
              <Select
                placeholder="Ano"
                variant="ghost"
                size="sm"
                options={[
                  { value: "2024", label: "2024" },
                  { value: "2023", label: "2023" },
                ]}
              />
              <Select
                placeholder="Mês"
                variant="ghost"
                size="sm"
                options={[
                  { value: "jan", label: "Jan" },
                  { value: "feb", label: "Fev" },
                ]}
              />
            </Grid>
          </VStack>
        </Card>
      </Column>
    </Layout>
  );
};
