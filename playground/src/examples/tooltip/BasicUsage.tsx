import styled from "styled-components";
import { Tooltip, Button, Card } from "nocturna-ui";
import { Info, ShieldAlert, Wifi } from "lucide-react";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      <Card title="Tooltips Informativos">
        <p style={{ textAlign: "center", color: "#a1a1aa", marginBottom: "2rem" }}>
          Passe o mouse ou foque nos botões.
        </p>

        <Row>
          <Tooltip content="Conexão Segura (Top)" position="top" variant="secondary">
            <Button size="sm" variant="secondary">
              <Wifi size={18} />
            </Button>
          </Tooltip>

          <Tooltip content="Informações do Sistema (Bottom)" position="bottom" variant="primary">
            <Button size="sm" variant="primary">
              <Info size={18} />
            </Button>
          </Tooltip>

          <Tooltip content="Risco de Segurança (Right)" position="right" variant="danger">
            <Button size="sm" variant="danger">
              <ShieldAlert size={18} />
            </Button>
          </Tooltip>
        </Row>
      </Card>
    </Layout>
  );
};
