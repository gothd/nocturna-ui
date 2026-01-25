import { Accordion, Badge, Card } from "nocturna-ui";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const BasicUsage = () => {
  const systemItems = [
    {
      id: "term",
      title: "Terminal Root",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <p>Acesso de superusuário concedido.</p>
          <code style={{ fontSize: "0.75rem", lineHeight: "1rem", color: "#71717a" }}>
            $ sudo apt-get install nocturna-ui
          </code>
        </div>
      ),
    },
    {
      id: "cpu",
      title: "Processamento Neural",
      content: "Alocação de núcleos: 8/12. Temperatura estável em 45°C.",
    },
  ];

  const securityItems = [
    {
      id: "firewall",
      title: "Status do Firewall",
      content: (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Tráfego de entrada bloqueado.</span>
          <Badge variant="danger" size="sm" styleType="solid">
            BLOCK
          </Badge>
        </div>
      ),
    },
    {
      id: "breach",
      title: "Relatório de Intrusão",
      content: "Nenhuma tentativa de acesso não autorizado nas últimas 24h.",
    },
  ];

  return (
    <Layout>
      <Card title="Documentação do Sistema">
        <Accordion items={systemItems} variant="primary" />
      </Card>

      <Card title="Protocolos de Segurança" variant="danger">
        <Accordion items={securityItems} variant="danger" />
      </Card>
    </Layout>
  );
};
