import styled from "styled-components";
import { Select, Card } from "nocturna-ui";
import { useState } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 500px;
`;

export const BasicUsage = () => {
  const [server, setServer] = useState("sa-east-1");

  const options = [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "eu-west-1", label: "EU West (Ireland)" },
    { value: "sa-east-1", label: "SA East (São Paulo)" },
    { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
  ];

  return (
    <Layout>
      <Card title="Configuração de Rede">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Select
            label="Região do Servidor"
            options={options}
            value={server}
            onChange={setServer}
            variant="secondary"
          />

          <Select
            label="Protocolo de Criptografia"
            placeholder="Selecione um método..."
            options={[
              { value: "aes", label: "AES-256 (Padrão)" },
              { value: "rsa", label: "RSA-4096 (Lento)" },
              { value: "chacha", label: "ChaCha20 (Rápido)" },
            ]}
            variant="accent"
          />

          <Select
            label="Nível de Acesso (Disabled)"
            placeholder="Root"
            disabled
            options={[]}
            variant="primary"
          />
        </div>
      </Card>
    </Layout>
  );
};
