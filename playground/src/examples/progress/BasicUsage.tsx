import styled from "styled-components";
import { Progress, Card, Button } from "nocturna-ui";
import { useState, useEffect } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const BasicUsage = () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <Card title="Monitoramento de Processos">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Progress value={progress} label="Download de Dados" showValue variant="secondary" />

          <Progress value={75} label="Integridade do Casco" variant="primary" />

          <Progress mode="indeterminate" label="Buscando Sinal..." variant="warning" />
        </div>
      </Card>

      <Card title="Modo Timer (Toast Style)" variant="accent">
        <p
          style={{
            color: "#71717a",
            marginBottom: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
          }}
        >
          Usado internamente nos Toasts, mas disponível para interfaces de tempo limitado.
        </p>
        <Progress mode="timer" duration={5000} variant="accent" />
        <Button
          size="sm"
          variant="accent"
          style={{ marginTop: "1rem" }}
          onClick={() => window.location.reload()} // Hack simples para reiniciar a demo
        >
          Reiniciar Timer
        </Button>
      </Card>
    </Layout>
  );
};
