import styled from "styled-components";
import { useToast, VoidButton, NocturnaCard } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
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
      <NocturnaCard title="Invocações (Toasts)">
        <p
          style={{
            color: "#a1a1aa",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          Utilize o hook <code>useToast()</code> para disparar notificações.
          Elas persistem por 5 segundos por padrão ou até serem dispensadas.
        </p>

        <ButtonGroup>
          <VoidButton
            size="sm"
            onClick={() =>
              toast({
                title: "Sincronização",
                description: "Dados enviados para o abismo com sucesso.",
                type: "success",
              })
            }
          >
            Success
          </VoidButton>

          <VoidButton
            size="sm"
            onClick={() =>
              toast({
                title: "Nova Mensagem",
                description: "O sistema recebeu um sinal criptografado.",
                type: "info",
              })
            }
          >
            Info
          </VoidButton>

          <VoidButton
            size="sm"
            onClick={() =>
              toast({
                title: "Atenção",
                description: "Níveis de entropia aumentando.",
                type: "warning",
              })
            }
          >
            Warning
          </VoidButton>
        </ButtonGroup>
      </NocturnaCard>

      <NocturnaCard title="Protocolos de Sangue" variant="blood">
        <ButtonGroup>
          <VoidButton
            variant="blood"
            size="sm"
            onClick={() =>
              toast({
                title: "Erro Crítico",
                description: "Falha catastrófica no núcleo.",
                variant: "blood",
                type: "error",
                duration: 0, // Persistente
              })
            }
          >
            Erro Persistente
          </VoidButton>

          <VoidButton variant="void" size="sm" onClick={dismissAll}>
            Limpar Tudo
          </VoidButton>
        </ButtonGroup>
      </NocturnaCard>
    </Layout>
  );
};
