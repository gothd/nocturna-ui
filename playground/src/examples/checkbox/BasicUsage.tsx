import styled from "styled-components";
import { Checkbox, Card, Button, Badge } from "nocturna-ui";

const FormLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BasicUsage = () => {
  return (
    <FormLayout>
      {/* Coluna 1: Configurações Principais */}
      <Column>
        <Card title="Permissões de Acesso">
          <CheckboxGroup>
            <Checkbox
              label="Aceitar Termos de Ciber-Segurança"
              defaultChecked
              variant="primary"
              fontFamily="serif"
              disabled
            />
            <Checkbox label="Habilitar Criptografia Ponta-a-Ponta" variant="secondary" />
            <Checkbox
              label="Modo Furtivo (Accent)"
              variant="accent"
              defaultChecked
              uppercase={false}
            />
          </CheckboxGroup>
        </Card>

        <Card title="Configurações Opcionais" variant="ghost">
          <CheckboxGroup>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Checkbox label="Logs Detalhados" variant="ghost" />
              <Badge variant="ghost" size="sm">
                DEBUG
              </Badge>
            </div>
            <Checkbox label="Notificações em Background" variant="ghost" defaultChecked />
            <Checkbox label="Enviar Relatórios Anônimos" variant="ghost" />
          </CheckboxGroup>
        </Card>
      </Column>

      {/* Coluna 2: Zona de Perigo */}
      <Column>
        <Card title="Zona de Perigo" variant="danger">
          <CheckboxGroup>
            <Checkbox label="Confirmar exclusão permanente" variant="danger" />
            <Checkbox label="Desabilitar protocolos de segurança" variant="warning" />
            <Button variant="danger" size="sm" style={{ marginTop: "1rem" }} w="full">
              Executar Ação Crítica
            </Button>
          </CheckboxGroup>
        </Card>
      </Column>
    </FormLayout>
  );
};
