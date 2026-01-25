import styled from "styled-components";
import { Badge, Card, Separator } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      <Card title="Badges de Status">
        <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
          Indicadores de estado com estilos <code>outline</code> (padrão) e <code>solid</code>.
        </p>

        <Row>
          <Badge variant="primary">Stable</Badge>
          <Badge variant="secondary">Online</Badge>
          <Badge variant="accent">New</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="danger">Offline</Badge>
        </Row>

        <Separator label="Estilo Sólido" variant="primary" />

        <Row>
          <Badge variant="primary" styleType="solid">
            v2.0.0
          </Badge>
          <Badge variant="secondary" styleType="solid">
            Success
          </Badge>
          <Badge variant="accent" styleType="solid">
            Hotfix
          </Badge>
          <Badge variant="warning" styleType="solid">
            Beta
          </Badge>
          <Badge variant="danger" styleType="solid">
            Error
          </Badge>
        </Row>
      </Card>

      <Card title="Tamanhos" variant="secondary">
        <Row>
          <Badge size="sm" variant="secondary">
            Small
          </Badge>
          <Badge size="md" variant="secondary">
            Medium
          </Badge>
        </Row>
      </Card>
    </Layout>
  );
};
