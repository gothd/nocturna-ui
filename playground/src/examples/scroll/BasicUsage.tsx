import styled from "styled-components";
import { Scroll, Card, Separator } from "nocturna-ui";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MockText = () => (
  <div className="text-zinc-400 text-sm leading-relaxed space-y-4 p-2">
    <p>
      O céu sobre o porto tinha a cor de uma televisão sintonizada num canal morto. Nesta era de
      silício e aço, a carne é apenas um hospedeiro para a interface.
    </p>
    <p>
      Protocolos antigos foram reescritos. O abismo digital não apenas observa; ele interage. Dados
      fluem como sangue através de veias de fibra ótica.
    </p>
    <Separator variant="primary" label="Log #42" />
    <p>
      A cidade nunca dorme, ela apenas entra em modo de espera. As luzes de neon refletem nas poças
      de chuva ácida, contando histórias que ninguém quer ouvir.
    </p>
    {Array.from({ length: 5 }).map((_, i) => (
      <p key={i}>
        Linha de dados corrompida... Tentativa de recuperação de setor {i + 10}... Falha.
      </p>
    ))}
  </div>
);

export const BasicUsage = () => {
  return (
    <Layout>
      <Card title="Logs do Sistema (Scroll)">
        {/* Scrollbar Accent (Rosa) */}
        <Scroll maxHeight="200px" variant="accent">
          <MockText />
        </Scroll>
      </Card>

      <Card title="Terminal de Erros" variant="danger">
        {/* Scrollbar Danger (Vermelho) */}
        <Scroll maxHeight="150px" variant="danger">
          <div className="text-danger font-mono text-xs space-y-2 p-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i}>[CRITICAL] Error at address 0x{i}00F... Stack overflow.</div>
            ))}
          </div>
        </Scroll>
      </Card>
    </Layout>
  );
};
