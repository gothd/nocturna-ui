import { useState } from "react";
import styled from "styled-components";
import { CryptModal, VoidButton, SigilBadge } from "nocturna-ui";
import { ShieldAlert } from "lucide-react";

const Layout = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const CustomHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(127, 29, 29, 0.3);
`;

const Title = styled.h2`
  font-family: serif;
  font-size: 1.5rem;
  color: #ef4444;
  text-transform: uppercase;
  margin: 0;
`;

export const BasicUsage = () => {
  const [isStandardOpen, setStandardOpen] = useState(false);
  const [isCustomOpen, setCustomOpen] = useState(false);

  return (
    <Layout>
      {/* 1. Modal Padrão (Usa a prop Title) */}
      <VoidButton onClick={() => setStandardOpen(true)}>
        Modal Padrão
      </VoidButton>

      <CryptModal
        isOpen={isStandardOpen}
        onClose={() => setStandardOpen(false)}
        title="Juramento do Vazio"
        description="Este modal usa o título padrão estilizado pela lib."
      >
        <p>Conteúdo simples dentro da estrutura padrão.</p>
        <div className="mt-4 flex justify-end">
          <VoidButton size="sm" onClick={() => setStandardOpen(false)}>
            Fechar
          </VoidButton>
        </div>
      </CryptModal>

      {/* 2. Modal Customizado (Sem prop Title) */}
      <VoidButton variant="blood" onClick={() => setCustomOpen(true)}>
        Modal Customizado
      </VoidButton>

      <CryptModal
        variant="blood"
        isOpen={isCustomOpen}
        onClose={() => setCustomOpen(false)}
        // Nota: Sem prop 'title' ou 'description'
      >
        {/* Cabeçalho Totalmente Customizado inserido como children */}
        <CustomHeader>
          <ShieldAlert size={32} className="text-red-600" />
          <div>
            <Title>Acesso Restrito</Title>
            <SigilBadge variant="blood" size="sm">
              Admin Only
            </SigilBadge>
          </div>
        </CustomHeader>

        <p className="text-zinc-300 mb-4">
          Como omitimos a prop <code>title</code>, podemos desenhar qualquer
          layout de cabeçalho aqui dentro.
        </p>

        <VoidButton
          variant="blood"
          size="sm"
          onClick={() => setCustomOpen(false)}
          style={{ width: "100%" }}
        >
          Entendido
        </VoidButton>
      </CryptModal>
    </Layout>
  );
};
