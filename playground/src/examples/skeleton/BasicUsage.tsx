import styled from "styled-components";
import { Skeleton, SkeletonAvatar, SkeletonLine, SkeletonCard, Card } from "nocturna-ui";

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      {/* 1. Composição Manual */}
      <Card title="Carregando Perfil...">
        <Row>
          <SkeletonAvatar size="lg" />
          <Column>
            <SkeletonLine width="60%" height="1.2rem" />
            <SkeletonLine width="40%" />
          </Column>
        </Row>
        <Skeleton height="100px" style={{ marginTop: "1rem" }} />
      </Card>

      {/* 2. Preset de Card (Secondary Theme) */}
      <Card title="Feed (Secondary)" variant="secondary">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SkeletonCard variant="secondary" />
          <SkeletonCard variant="secondary" lines={2} hasTitle={false} />
        </div>
      </Card>

      {/* 3. Variante Accent */}
      <Card title="Dados Críticos (Accent)" variant="accent">
        <Row>
          <SkeletonAvatar variant="accent" size="md" />
          <SkeletonLine variant="accent" />
        </Row>
        <SkeletonCard variant="accent" lines={4} />
      </Card>
    </Layout>
  );
};
