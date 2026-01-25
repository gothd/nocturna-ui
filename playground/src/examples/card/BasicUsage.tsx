import styled from "styled-components";
import { Card, Button, Badge } from "nocturna-ui";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Content = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BasicUsage = () => {
  return (
    <Grid>
      {/* Exemplo Primary */}
      <Card title="Sistema Neural" description="Conexão estável.">
        <Content>
          <p style={{ color: "#71717a", fontSize: "0.9rem" }}>
            O núcleo processa dados em velocidade quântica. Nenhuma anomalia detectada.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Badge variant="primary">Online</Badge>
            <Badge variant="primary" styleType="solid">
              V 2.0
            </Badge>
          </div>
          <Button variant="primary" style={{ marginTop: "auto" }}>
            Acessar Logs
          </Button>
        </Content>
      </Card>

      {/* Exemplo Accent (Cyber Pink) */}
      <Card title="Protocolo Phantom" description="Acesso Restrito detectado." variant="accent">
        <Content>
          <p style={{ color: "#71717a", fontSize: "0.9rem" }}>
            Tentativa de intrusão no setor 7. Medidas de contra-ataque iniciadas.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Badge variant="accent">Crítico</Badge>
          </div>
          <Button variant="accent">Neutralizar</Button>
        </Content>
      </Card>

      {/* Exemplo Danger */}
      <Card title="Falha de Contenção" variant="danger">
        <Content>
          <p style={{ color: "#ef4444", fontSize: "0.9rem" }}>
            A integridade do firewall caiu para 12%. Evacuação de dados recomendada.
          </p>
          <Button variant="danger" size="sm">
            Executar Purga
          </Button>
        </Content>
      </Card>
    </Grid>
  );
};
