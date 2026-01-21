import styled from "styled-components";
import { SoulTabs, NocturnaCard, VoidButton, SigilBadge } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
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
  border-bottom: 1px solid #27272a; /* zinc-800 */
  padding-bottom: 0.5rem;
`;

export const BasicUsage = () => {
  // Conteúdo para o exemplo Void
  const voidTabs = [
    {
      id: "lore",
      label: "Grimório",
      content: (
        <ContentArea>
          <p style={{ color: "#a1a1aa" }}>
            O Grimório contém os segredos antigos da interface do usuário. Cada
            componente é uma página de um livro esquecido.
          </p>
          <VoidButton size="sm">Ler Capítulo</VoidButton>
        </ContentArea>
      ),
    },
    {
      id: "stats",
      label: "Atributos",
      content: (
        <ContentArea>
          <StatRow>
            <span style={{ color: "#d4d4d8" }}>Inteligência</span>
            <SigilBadge size="sm">LVL 99</SigilBadge>
          </StatRow>
          <StatRow>
            <span style={{ color: "#d4d4d8" }}>Carisma</span>
            <SigilBadge size="sm">LVL 10</SigilBadge>
          </StatRow>
        </ContentArea>
      ),
    },
  ];

  // Conteúdo para o exemplo Blood
  const bloodTabs = [
    {
      id: "active",
      label: "Maldições Ativas",
      content: "Nenhuma maldição detectada no momento. O sistema está estável.",
    },
    {
      id: "history",
      label: "Histórico de Sangue",
      content: "Registro de erros críticos apagado pelo administrador.",
    },
  ];

  return (
    <Layout>
      {/* 1. Variante Padrão (Void) */}
      <NocturnaCard title="Painel do Personagem">
        <SoulTabs tabs={voidTabs} />
      </NocturnaCard>

      {/* 2. Variante Blood */}
      <NocturnaCard title="Status do Sistema" variant="blood">
        <SoulTabs variant="blood" tabs={bloodTabs} />
      </NocturnaCard>
    </Layout>
  );
};
