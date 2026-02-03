import styled from "styled-components";
import { Menu, Card, Button, useToast, Badge } from "nocturna-ui";
import {
  Edit,
  Trash,
  Share,
  MoreHorizontal,
  FileText,
  ShieldAlert,
  Settings,
  Bell,
} from "lucide-react";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 8rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BasicUsage = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({ title: "Ação Disparada", description: `Executou: ${action}`, type: "info" });
  };

  return (
    <Layout>
      <Card title="Ações de Contexto">
        <Row>
          <span style={{ color: "#a1a1aa" }}>Arquivo_Confidencial.dat</span>

          <Menu
            variant="primary"
            items={[
              {
                id: "edit",
                label: "Editar",
                icon: <Edit size={16} />,
                onClick: () => handleAction("Editar"),
              },
              {
                id: "share",
                label: "Compartilhar",
                icon: <Share size={16} />,
                onClick: () => handleAction("Compartilhar"),
              },
              {
                id: "delete",
                label: "Deletar",
                icon: <Trash size={16} />,
                danger: true,
                onClick: () => handleAction("Deletar"),
              },
            ]}
          />
        </Row>
      </Card>

      <Card title="Variantes de Tema" variant="secondary">
        <Row>
          <span style={{ color: "#a1a1aa" }}>Opções do Sistema</span>

          <Menu
            variant="secondary"
            trigger={
              <Button size="sm" variant="secondary">
                Opções <MoreHorizontal size={16} style={{ marginLeft: "0.5rem" }} />
              </Button>
            }
            items={[
              {
                id: "logs",
                label: "Ver Logs",
                icon: <FileText size={16} />,
                onClick: () => handleAction("Logs"),
              },
              {
                id: "audit",
                label: "Auditoria",
                icon: <ShieldAlert size={16} />,
                onClick: () => handleAction("Auditoria"),
              },
            ]}
          />
        </Row>
      </Card>

      <Card title="Menu Discreto (Ghost)" variant="ghost">
        <Row>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "#71717a", fontSize: "0.9rem" }}>Configurações Avançadas</span>
            <Badge size="sm" variant="ghost">
              Experimental
            </Badge>
          </div>

          <Menu
            variant="ghost"
            align="right"
            items={[
              {
                id: "settings",
                label: "Preferências",
                icon: <Settings size={16} />,
                onClick: () => handleAction("Preferências"),
              },
              {
                id: "notifications",
                label: "Silenciar Alertas",
                icon: <Bell size={16} />,
                onClick: () => handleAction("Silenciar"),
              },
            ]}
          />
        </Row>
      </Card>
    </Layout>
  );
};
