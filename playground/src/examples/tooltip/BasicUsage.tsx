import styled from "styled-components";
import { RuneTooltip, VoidButton, NocturnaCard } from "nocturna-ui";
import { Info, AlertTriangle, HelpCircle, Shield } from "lucide-react";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  place-items: center;
  padding: 1rem;
`;

const Description = styled.p`
  color: #71717a; /* zinc-500 */
  margin-bottom: 2rem;
  font-size: 0.875rem; /* text-sm */
  text-align: center;
`;

const AuraContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 6rem; /* h-24 */
`;

const HelpText = styled.span`
  color: #a1a1aa; /* zinc-400 */
  border-bottom: 1px dotted #52525b; /* border-zinc-600 */
  cursor: help;
  font-size: 0.9rem;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      {/* 1. Posicionamento */}
      <NocturnaCard title="Orientação Rúnica">
        <Description>
          Passe o mouse ou foque nos ícones para revelar os segredos.
        </Description>

        <Grid>
          <RuneTooltip content="Norte (Top)" position="top">
            <VoidButton size="sm">
              <Shield size={18} />
            </VoidButton>
          </RuneTooltip>

          <RuneTooltip content="Sul (Bottom)" position="bottom">
            <VoidButton size="sm">
              <Info size={18} />
            </VoidButton>
          </RuneTooltip>

          <RuneTooltip content="Oeste (Left)" position="left">
            <VoidButton size="sm">
              <HelpCircle size={18} />
            </VoidButton>
          </RuneTooltip>

          <RuneTooltip content="Leste (Right)" position="right">
            <VoidButton size="sm">
              <AlertTriangle size={18} />
            </VoidButton>
          </RuneTooltip>
        </Grid>
      </NocturnaCard>

      {/* 2. Variantes */}
      <NocturnaCard title="Intenção da Aura" variant="blood">
        <AuraContainer>
          <RuneTooltip content="Informação segura" variant="void">
            <HelpText>Termos de Serviço</HelpText>
          </RuneTooltip>

          <RuneTooltip
            content="Risco de Corrupção"
            variant="blood"
            position="top"
          >
            <VoidButton variant="blood">Deletar Realidade</VoidButton>
          </RuneTooltip>
        </AuraContainer>
      </NocturnaCard>
    </Layout>
  );
};
