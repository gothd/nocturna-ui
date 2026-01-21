import styled from "styled-components";
import { VeinInput } from "nocturna-ui";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      {/* Input Padrão */}
      <VeinInput label="Nome de Usuário" placeholder="Digite seu codinome..." />

      {/* Input com Erro */}
      <VeinInput
        label="Senha do Cofre"
        type="password"
        defaultValue="12345"
        error="Senha muito fraca. O abismo exige mais complexidade."
      />

      {/* Variante Blood + Tamanho Small */}
      <VeinInput
        variant="blood"
        size="sm"
        label="Protocolo de Emergência"
        placeholder="EX: CODE-RED"
      />
    </Layout>
  );
};
