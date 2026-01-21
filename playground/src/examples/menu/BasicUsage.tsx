import { Edit, Trash2, Share2, Settings, User } from "lucide-react";
import styled from "styled-components";
import { AltarMenu, VoidButton } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: flex-start;
  min-height: 350px; /* Altura para o menu não cortar */
  padding-top: 2rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Label = styled.span`
  color: #71717a;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const BasicUsage = () => {
  const handleAction = (action: string) => {
    console.log(`Ritual executado: ${action}`);
  };

  return (
    <Layout>
      {/* 1. Uso Padrão */}
      <Section>
        <Label>Standard</Label>
        <AltarMenu
          items={[
            {
              id: "1",
              label: "Iniciar Ritual",
              onClick: () => handleAction("Iniciar"),
            },
            {
              id: "2",
              label: "Abortar",
              onClick: () => handleAction("Abortar"),
            },
          ]}
        />
      </Section>

      {/* 2. Custom Trigger */}
      <Section>
        <Label>Custom Trigger</Label>
        <AltarMenu
          items={[
            {
              id: "edit",
              label: "Editar",
              icon: <Edit size={16} />,
              onClick: () => handleAction("Edit"),
            },
            {
              id: "share",
              label: "Compartilhar",
              icon: <Share2 size={16} />,
              onClick: () => handleAction("Share"),
            },
          ]}
          trigger={
            <VoidButton>
              <Settings size={16} className="mr-2" />
              Configurar
            </VoidButton>
          }
        />
      </Section>

      {/* 3. Variante Blood + Danger */}
      <Section>
        <Label>Blood Mode</Label>
        <AltarMenu
          variant="blood"
          trigger={
            <VoidButton variant="blood">
              <User size={16} />
            </VoidButton>
          }
          items={[
            {
              id: "profile",
              label: "Perfil",
              icon: <User size={16} />,
              onClick: () => {},
            },
            {
              id: "delete",
              label: "Banir Usuário",
              icon: <Trash2 size={16} />,
              onClick: () => alert("Banido!"),
              danger: true,
            },
          ]}
        />
      </Section>
    </Layout>
  );
};
