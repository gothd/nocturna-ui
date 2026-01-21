import styled from "styled-components";
import { HexCheckbox, NocturnaCard } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      <NocturnaCard title="Preferências do Vazio">
        <Group>
          {/* Uncontrolled (Gerenciado pelo DOM) */}
          <HexCheckbox label="Notificações Sombrias" defaultChecked />

          <HexCheckbox label="Modo Silencioso" />

          {/* Disabled State */}
          <HexCheckbox label="Acesso Root (Bloqueado)" disabled />
        </Group>
      </NocturnaCard>

      <NocturnaCard title="Zona de Perigo" variant="blood">
        <Group>
          {/* Variante Blood */}
          <HexCheckbox label="Confirmar Expurgo" variant="blood" />

          <HexCheckbox
            label="Protocolo de Emergência"
            variant="blood"
            defaultChecked
          />
        </Group>
      </NocturnaCard>
    </Layout>
  );
};
