import styled from "styled-components";
import { useToast, Button, Card } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const BasicUsage = () => {
  const { toast, dismissAll } = useToast();

  return (
    <Layout>
      <Card title="Central de Notificações">
        <p style={{ color: "#a1a1aa", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          Dispare notificações flutuantes. As cores reagem automaticamente ao <code>type</code>{" "}
          escolhido.
        </p>

        <ButtonGroup>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              toast({
                title: "Upload Concluído",
                description: "Dados transferidos para o servidor local.",
                type: "success", // Automático -> Secondary (Verde)
              })
            }
          >
            Success
          </Button>

          <Button
            size="sm"
            variant="warning"
            onClick={() =>
              toast({
                title: "Atenção",
                description: "Uso de memória acima de 80%.",
                type: "warning", // Automático -> Warning (Gold)
              })
            }
          >
            Warning
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() =>
              toast({
                title: "Falha Crítica",
                description: "Não foi possível conectar ao banco de dados.",
                type: "error", // Automático -> Danger (Vermelho)
              })
            }
          >
            Error
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={() =>
              toast({
                title: "Nova Mensagem",
                description: "Você recebeu um pacote de dados criptografado.",
                type: "info", // Automático -> Primary (Branco)
              })
            }
          >
            Info
          </Button>
        </ButtonGroup>
      </Card>

      <Card title="Controle Manual" variant="accent">
        <ButtonGroup>
          <Button variant="primary" size="sm" onClick={dismissAll}>
            Limpar Tudo
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={() =>
              toast({
                title: "Estilo Forçado",
                description: "Este toast usa variant='accent' explicitamente.",
                variant: "accent",
                type: "info",
              })
            }
          >
            Forçar Accent
          </Button>
        </ButtonGroup>
      </Card>
    </Layout>
  );
};
