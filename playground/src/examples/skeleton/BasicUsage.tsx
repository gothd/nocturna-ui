import styled from "styled-components";
import {
  SpectreSkeleton,
  SpectreSkeletonAvatar,
  SpectreSkeletonLine,
  SpectreSkeletonCard,
  NocturnaCard,
} from "nocturna-ui";

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

const CardGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ErrorText = styled.p`
  color: #f87171; /* red-400 */
  font-size: 0.875rem; /* text-sm */
  margin-bottom: 1rem;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      {/* 1. Composição Manual (Perfil) */}
      <NocturnaCard title="Perfil de Usuário (Loading)">
        <Row>
          <SpectreSkeletonAvatar size="lg" />
          <Column>
            <SpectreSkeletonLine width="60%" height="1.2rem" />
            <SpectreSkeletonLine width="40%" />
          </Column>
        </Row>
        <SpectreSkeleton height="100px" style={{ marginTop: "1rem" }} />
      </NocturnaCard>

      {/* 2. Preset de Card */}
      <NocturnaCard title="Feed de Notícias">
        <CardGroup>
          <SpectreSkeletonCard />
          <SpectreSkeletonCard lines={2} hasTitle={false} />
        </CardGroup>
      </NocturnaCard>

      {/* 3. Variante Blood */}
      <NocturnaCard title="Erro de Carregamento" variant="blood">
        <ErrorText>
          Falha ao recuperar dados vitais. Tentando reconexão...
        </ErrorText>
        <Row>
          <SpectreSkeletonAvatar variant="blood" size="md" />
          <SpectreSkeletonLine variant="blood" />
        </Row>
        <SpectreSkeletonCard variant="blood" lines={4} />
      </NocturnaCard>
    </Layout>
  );
};
