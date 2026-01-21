import styled from "styled-components";
import { VoidButton } from "nocturna-ui";

// Container apenas para organização espacial (Layout)
const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      {/* O estilo padrão é 'void' (Monocromático) */}
      <VoidButton onClick={() => console.log("Ação executada")}>
        Padrão
      </VoidButton>

      {/* Use 'blood' para ações destrutivas ou de alta prioridade */}
      <VoidButton variant="blood">Perigo</VoidButton>

      {/* Suporte total a atributos HTML padrão como 'disabled' */}
      <VoidButton disabled>Desativado</VoidButton>

      {/* Propriedade 'size' controla padding e escala de fonte */}
      <VoidButton size="sm">Pequeno</VoidButton>
    </Layout>
  );
};
