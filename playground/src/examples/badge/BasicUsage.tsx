import styled from "styled-components";
import { SigilBadge } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Label = styled.span`
  color: #71717a; /* zinc-500 */
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  min-width: 80px;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      {/* Estilo Outline (Padrão) */}
      <Row>
        <Label>Outline</Label>
        <SigilBadge variant="void">System Void</SigilBadge>
        <SigilBadge variant="blood">Critical Error</SigilBadge>
      </Row>

      {/* Estilo Solid (Preenchido) */}
      <Row>
        <Label>Solid</Label>
        <SigilBadge styleType="solid" variant="void">
          Active
        </SigilBadge>
        <SigilBadge styleType="solid" variant="blood">
          Danger
        </SigilBadge>
      </Row>

      {/* Tamanhos */}
      <Row>
        <Label>Sizes</Label>
        <SigilBadge size="sm">v1.0.0</SigilBadge>
        <SigilBadge size="md">Release</SigilBadge>
      </Row>
    </Layout>
  );
};
