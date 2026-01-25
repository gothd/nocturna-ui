import styled from "styled-components";
import { Checkbox, Card, Button } from "nocturna-ui";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BasicUsage = () => {
  return (
    <Form>
      <Card title="Permissões de Acesso">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox label="Aceitar Termos de Ciber-Segurança" defaultChecked variant="primary" />
          <Checkbox label="Habilitar Criptografia Ponta-a-Ponta" variant="secondary" />
          <Checkbox label="Modo Furtivo (Accent)" variant="accent" />
        </div>
      </Card>

      <Card title="Zona de Perigo" variant="danger">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox label="Confirmar exclusão permanente" variant="danger" />
          <Checkbox label="Desabilitar protocolos de segurança" variant="warning" />
          <Button variant="danger" size="sm" style={{ marginTop: "1rem" }}>
            Executar Ação
          </Button>
        </div>
      </Card>
    </Form>
  );
};
