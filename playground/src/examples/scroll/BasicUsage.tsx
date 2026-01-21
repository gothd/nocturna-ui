import styled from "styled-components";
import { AbyssScroll, NocturnaCard, SigilBadge } from "nocturna-ui";

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const LogEntry = styled.div`
  font-family: monospace;
  font-size: 0.8rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #27272a;
  color: #a1a1aa;

  &:last-child {
    border-bottom: none;
  }
`;

const SpellItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: rgba(127, 29, 29, 0.1);
  border-left: 2px solid #7f1d1d;
  color: #fca5a5;
`;

export const BasicUsage = () => {
  // Gera dados falsos para scroll
  const logs = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    timestamp: new Date().toISOString(),
    message: `System.Core: Evento de sincronização #${i + 4000} iniciado.`,
  }));

  const spells = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    name: `Maldição de Nível ${i + 1}`,
    desc: "Causa dano contínuo e reduz a visibilidade.",
  }));

  return (
    <Layout>
      {/* 1. Scroll Padrão (Logs) */}
      <NocturnaCard title="Logs do Servidor">
        <AbyssScroll maxHeight="200px">
          {logs.map((log) => (
            <LogEntry key={log.id}>
              <span style={{ color: "#52525b" }}>[{log.timestamp}]</span>{" "}
              {log.message}
            </LogEntry>
          ))}
        </AbyssScroll>
      </NocturnaCard>

      {/* 2. Scroll Blood (Lista Visual) */}
      <NocturnaCard title="Grimório Proibido" variant="blood">
        <AbyssScroll variant="blood" maxHeight="200px">
          {spells.map((spell) => (
            <SpellItem key={spell.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <strong>{spell.name}</strong>
                <SigilBadge size="sm" variant="blood">
                  Perigoso
                </SigilBadge>
              </div>
              <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>{spell.desc}</p>
            </SpellItem>
          ))}
        </AbyssScroll>
      </NocturnaCard>
    </Layout>
  );
};
