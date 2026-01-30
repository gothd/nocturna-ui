import { SimpleGrid, Card, Badge } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <div style={{ width: "100%" }}>
      {/* minChildWidth="250px" cria um layout responsivo automático:
        - Desktop: 3 ou 4 colunas
        - Tablet: 2 colunas
        - Mobile: 1 coluna
        Tudo isso sem @media queries manuais.
      */}
      <SimpleGrid minChildWidth="250px" spacing={6}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} title={`Servidor 0${i + 1}`}>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
              <span style={{ color: "#71717a" }}>Uptime: 99%</span>
              <Badge variant={i % 2 === 0 ? "secondary" : "warning"}>
                {i % 2 === 0 ? "Online" : "Instável"}
              </Badge>
            </div>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};
