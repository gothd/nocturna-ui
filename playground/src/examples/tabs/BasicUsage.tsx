import styled from "styled-components";
import { Tabs, Card, Badge } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #27272a;
  padding-bottom: 0.5rem;
`;

export const BasicUsage = () => {
  const items = [
    {
      id: "data",
      label: "Dados",
      content: (
        <ContentArea>
          <p style={{ color: "#a1a1aa" }}>
            Acesso direto ao banco de dados neural. Leitura apenas.
          </p>
          <StatRow>
            <span style={{ color: "#d4d4d8" }}>Integridade</span>
            <Badge variant="secondary" styleType="solid">
              98%
            </Badge>
          </StatRow>
          <StatRow>
            <span style={{ color: "#d4d4d8" }}>Latência</span>
            <Badge variant="primary">12ms</Badge>
          </StatRow>
        </ContentArea>
      ),
    },
    {
      id: "logs",
      label: "Registros",
      content: (
        <ContentArea>
          <p style={{ color: "#a1a1aa" }}>Últimas 24 horas de atividade do sistema.</p>
          <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#71717a" }}>
            <div>[08:00] Inicialização do Kernel... OK</div>
            <div>[08:05] Conexão remota estabelecida.</div>
            <div style={{ color: "#ef4444" }}>[10:42] Erro de paridade no setor 9.</div>
          </div>
        </ContentArea>
      ),
    },
  ];

  return (
    <Layout>
      <Card title="Terminal do Usuário">
        <Tabs tabs={items} variant="primary" />
      </Card>

      <Card title="Modo de Segurança (Warning)" variant="warning">
        <Tabs
          variant="warning"
          tabs={[
            { id: "warn", label: "Alertas", content: "3 Ameaças detectadas no perímetro." },
            { id: "fix", label: "Correção", content: "Execute o protocolo de limpeza." },
          ]}
        />
      </Card>
    </Layout>
  );
};
