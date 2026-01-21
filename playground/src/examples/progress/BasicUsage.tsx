import { useState, useEffect } from "react";
import styled from "styled-components";
import { VesselProgress, VoidButton, NocturnaCard } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const BasicUsage = () => {
  const [progress, setProgress] = useState(10);
  const [paused, setPaused] = useState(false);

  // Simula um upload
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* 1. Modo Valor (Upload) */}
      <NocturnaCard title="Transferência de Dados">
        <VesselProgress value={progress} label="Fazendo Upload..." showValue />
        <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#71717a" }}>
          Atualiza dinamicamente conforme a prop value muda.
        </p>
      </NocturnaCard>

      {/* 2. Modo Timer (Cooldown) */}
      <NocturnaCard title="Protocolo de Segurança" variant="blood">
        <VesselProgress
          mode="timer"
          duration={10000} // 10 segundos
          variant="blood"
          label="Autodestruição em:"
          paused={paused}
        />
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <VoidButton
            size="sm"
            variant="blood"
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Retomar" : "Pausar"} Contagem
          </VoidButton>
        </div>
      </NocturnaCard>

      {/* 3. Modo Indeterminado (Loading) */}
      <NocturnaCard title="Aguardando Servidor">
        <VesselProgress mode="indeterminate" label="Conectando ao Vazio..." />
      </NocturnaCard>
    </Layout>
  );
};
