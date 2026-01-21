import styled from "styled-components";
import { AbyssSeparator, NocturnaCard } from "nocturna-ui";

const Layout = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const TextBlock = styled.p`
  color: #a1a1aa;
  font-size: 0.9rem;
  line-height: 1.6;
  text-align: justify;
`;

export const BasicUsage = () => {
  return (
    <Layout>
      <NocturnaCard title="Capítulo I: A Origem">
        <TextBlock>
          No início, havia apenas o código. Linhas intermináveis de lógica
          fluindo através do silício, esperando para serem moldadas em algo
          tangível. A estrutura era rígida, mas necessária.
        </TextBlock>

        {/* 1. Separador Simples (Void) */}
        <AbyssSeparator />

        <TextBlock>
          Então veio o design. Brutalista, direto, sem ornamentos
          desnecessários. A forma seguia a função, e a função era absoluta.
        </TextBlock>

        {/* 2. Separador com Rótulo */}
        <AbyssSeparator label="Fase II" />

        <TextBlock>
          A escuridão foi abraçada não como ausência de luz, mas como uma tela
          para o contraste. O branco cortava o preto como um raio na tempestade.
        </TextBlock>
      </NocturnaCard>

      <div style={{ height: "2rem" }} />

      {/* 3. Variante Blood */}
      <NocturnaCard title="Protocolo de Contenção" variant="blood">
        <TextBlock style={{ color: "#fca5a5" }}>
          ALERTA: Violação de integridade detectada no setor 7G. Iniciando
          bloqueio de emergência.
        </TextBlock>

        <AbyssSeparator variant="blood" label="Sistemas Críticos" />

        <TextBlock style={{ color: "#fca5a5" }}>
          O firewall foi comprometido. As entidades externas estão tentando
          reescrever o núcleo. Isolamento de rede em progresso...
        </TextBlock>
      </NocturnaCard>
    </Layout>
  );
};
