import styled from "styled-components";
import { Input, Card, Button, Badge } from "nocturna-ui";
import { Search, Mail, Key, ShieldAlert } from "lucide-react"; // Assumindo lucide-react ou similar

const Layout = styled.div`
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

export const BasicUsage = () => {
  return (
    <Layout>
      {/* Coluna 1: Login e Cadastro */}
      <Column>
        <Card title="Acesso ao Sistema">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <Input
              label="Usuário"
              placeholder="Digite seu codinome..."
              leftIcon={<Mail size={16} />}
              variant="primary"
            />

            <Input
              label="Chave de Acesso"
              type="password"
              placeholder="••••••••"
              leftIcon={<Key size={16} />}
              variant="accent"
              rightIcon={
                <Badge size="sm" styleType="outline">
                  SECURE
                </Badge>
              }
            />

            <Button w="full" variant="primary" mt={2}>
              Autenticar
            </Button>
          </div>
        </Card>

        {/* Exemplo Ghost: Busca ou Filtros */}
        <Card title="Filtros de Pesquisa (Ghost)" variant="ghost">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Input placeholder="Buscar logs..." variant="ghost" leftIcon={<Search size={16} />} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Input placeholder="Data Início" variant="ghost" size="sm" />
              <Input placeholder="Data Fim" variant="ghost" size="sm" />
            </div>
          </div>
        </Card>
      </Column>

      {/* Coluna 2: Erros e Validação */}
      <Column>
        <Card title="Validação de Erro" variant="danger">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
              O estado <code>error</code> sobrescreve qualquer variante visual.
            </p>

            <Input
              label="IP de Destino"
              defaultValue="192.168.0.X"
              error="Conexão recusada pelo host remoto."
              leftIcon={<ShieldAlert size={16} />}
            />

            <Button variant="ghost">Reiniciar Handshake</Button>
          </div>
        </Card>
      </Column>
    </Layout>
  );
};
