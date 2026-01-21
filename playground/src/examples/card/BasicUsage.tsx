import styled from "styled-components";
import { NocturnaCard, VoidButton } from "nocturna-ui";

// Grid layout para organizar os cards lado a lado
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

export const BasicUsage = () => {
  return (
    <Grid>
      {/* 1. Card Simples (Apenas Children) */}
      <NocturnaCard>
        <p style={{ color: "#a1a1aa" }}>
          Um card básico sem título. O conteúdo interno é livre e o container
          aplica o padding e as bordas padrão.
        </p>
      </NocturnaCard>

      {/* 2. Card Completo (Título + Descrição + Ação) */}
      <NocturnaCard
        title="O Ritual"
        description="Iniciação dos novos membros do círculo interno."
        headingLevel="h2" // Semanticamente é um H2
      >
        <div style={{ marginTop: "1rem" }}>
          <VoidButton size="sm" style={{ width: "100%" }}>
            Confirmar Presença
          </VoidButton>
        </div>
      </NocturnaCard>

      {/* 3. Variante Blood (Alerta/Perigo) */}
      <NocturnaCard
        variant="blood"
        title="Violação de Contrato"
        description="Acesso negado ao servidor central."
      >
        <code style={{ color: "#ef4444", fontSize: "0.8rem" }}>
          Error: 0x500 Internal Server Error
        </code>
      </NocturnaCard>

      {/* 4. Polimorfismo (Renderizando como <article>) */}
      <NocturnaCard
        as="article"
        title="Artigo Semântico"
        description="Este card é renderizado como uma tag <article> no DOM."
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "#71717a",
            textTransform: "uppercase",
          }}
        >
          SEO Friendly
        </span>
      </NocturnaCard>
    </Grid>
  );
};
