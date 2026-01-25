import styled from "styled-components";
import { Input, Card, Button } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      <Card title="Credenciais de Acesso">
        <FormGroup>
          <Input label="Usuário" placeholder="Digite seu codinome..." variant="primary" />

          <Input
            label="Chave de Acesso (Accent)"
            type="password"
            placeholder="••••••••"
            variant="accent"
          />

          <Input
            label="Servidor de Destino (Secondary)"
            defaultValue="192.168.0.X"
            variant="secondary"
          />
        </FormGroup>
      </Card>

      <Card title="Validação de Erro" variant="danger">
        <FormGroup>
          <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
            Quando a prop <code>error</code> é passada, o componente assume o estado{" "}
            <strong>Danger</strong> automaticamente.
          </p>

          <Input
            label="Email Corporativo"
            defaultValue="admin@arasaka"
            error="Domínio não autorizado. Violação de protocolo detectada."
          />

          <Button variant="danger">Tentar Novamente</Button>
        </FormGroup>
      </Card>
    </Layout>
  );
};
