import styled from "styled-components";
import { Separator, Card, Button } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      <Card title="Divisores de Seção">
        <Content>
          <p style={{ color: "#a1a1aa" }}>Introdução ao capítulo 1.</p>

          <Separator variant="primary" />

          <p style={{ color: "#a1a1aa" }}>Conteúdo principal do texto sagrado.</p>

          <Separator variant="accent" label="Capítulo 2" />

          <p style={{ color: "#a1a1aa" }}>Início da segunda parte da profecia.</p>
        </Content>
      </Card>

      <Card title="Zona Restrita" variant="danger">
        <Content>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Status: Comprometido</span>
            <Button size="sm" variant="danger">
              Reportar
            </Button>
          </div>

          <Separator variant="danger" label="Classified" />

          <p
            style={{
              color: "#dc2626",
              opacity: "0.8",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }}
          >
            Estas informações são visíveis apenas para nível 5 de acesso.
          </p>
        </Content>
      </Card>
    </Layout>
  );
};
