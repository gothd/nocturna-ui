import { Skull, Zap } from "lucide-react";
import { Button, Card } from "nocturna-ui";
import styled from "styled-components";

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
      <Card title="Cyber Goth Palette">
        <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>
          Botões brutalistas com sombras rígidas que reagem à variante.
        </p>

        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
        </Row>
      </Card>

      <Card title="Tamanhos e Ícones" variant="secondary">
        <Row>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button size="md" variant="secondary">
            Medium (Default)
          </Button>
          <Button size="lg" variant="secondary">
            Large
          </Button>
        </Row>

        <div style={{ marginTop: "1rem" }} />

        <Row>
          <Button variant="accent" size="sm">
            <Zap size={16} style={{ marginRight: "0.5rem" }} />
            Action
          </Button>

          <Button variant="danger" disabled>
            <Skull size={18} style={{ marginRight: "0.5rem" }} />
            Disabled
          </Button>
        </Row>
      </Card>
    </Layout>
  );
};
