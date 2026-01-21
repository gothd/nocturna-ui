import { useState } from "react";
import styled from "styled-components";
import { RitualSelect, NocturnaCard } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const options = [
  { value: "void", label: "Caminho do Vazio" },
  { value: "shadow", label: "Manipulação de Sombras" },
  { value: "blood", label: "Magia de Sangue" },
  { value: "astral", label: "Projeção Astral" },
];

export const BasicUsage = () => {
  const [classValue, setClassValue] = useState("");
  const [serverValue, setServerValue] = useState("br");

  return (
    <Layout>
      {/* 1. Uso Padrão (Void) */}
      <NocturnaCard title="Seleção de Classe">
        <RitualSelect
          label="Especialização"
          placeholder="Escolha seu caminho..."
          options={options}
          value={classValue}
          onChange={setClassValue}
        />
      </NocturnaCard>

      {/* 2. Variante Blood e Tamanho Pequeno */}
      <NocturnaCard title="Configuração de Servidor" variant="blood">
        <RitualSelect
          variant="blood"
          size="sm"
          label="Região (Crítico)"
          value={serverValue}
          onChange={setServerValue}
          options={[
            { value: "br", label: "São Paulo (BR-1)" },
            { value: "us", label: "N. Virginia (US-East)" },
            { value: "eu", label: "Frankfurt (EU-Central)" },
          ]}
        />

        <div style={{ marginTop: "1rem" }}>
          <RitualSelect
            variant="blood"
            size="sm"
            label="Instância (Offline)"
            placeholder="Manutenção..."
            disabled
            options={[]}
          />
        </div>
      </NocturnaCard>
    </Layout>
  );
};
