import { Progress, Card, Button, VStack, Text } from "nocturna-ui";
import { useState, useEffect } from "react";

export const BasicUsage = () => {
  const [progress, setProgress] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);

  // Simula progresso contínuo
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <VStack gap={8} w="full">
      {/* Seção 1: Valor Controlado */}
      <Card title="Monitoramento de Processos">
        <VStack gap={6}>
          <Progress value={progress} label="Download de Dados" showValue variant="secondary" />

          <Progress value={75} label="Integridade do Casco" variant="primary" />

          <Progress mode="indeterminate" label="Buscando Sinal..." variant="warning" />
        </VStack>
      </Card>

      {/* Seção 2: Timer (Ex: Toast ou Cooldown) */}
      <Card title="Modo Timer" variant="accent">
        <Text color="zinc-400" fontSize="sm" mb={4}>
          Barra com animação decrescente baseada em CSS (duration). Ideal para notificações ou
          habilidades com tempo de recarga.
        </Text>

        {timerRunning ? (
          <Progress
            mode="timer"
            duration={5000}
            variant="accent"
            key="timer-active" // Force remount para reiniciar animação
          />
        ) : (
          <div style={{ height: "1rem", background: "#27272a" }} /> // Placeholder
        )}

        <Button
          size="sm"
          variant="accent"
          mt={4}
          onClick={() => {
            setTimerRunning(false);
            setTimeout(() => setTimerRunning(true), 50);
          }}
        >
          {timerRunning ? "Reiniciar Timer" : "Iniciar Timer (5s)"}
        </Button>
      </Card>
    </VStack>
  );
};
