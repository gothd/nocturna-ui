import { Separator, Card, Button, Box, Text } from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Caso 1: Separador Horizontal Padrão */}
      <Card title="Divisores de Conteúdo">
        <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Text color="zinc-400">Introdução ao capítulo 1.</Text>

          <Separator variant="primary" />

          <Text color="zinc-400">Conteúdo principal do texto sagrado.</Text>

          <Separator variant="accent" label="Capítulo 2" style={{ margin: "2rem 0" }} />

          <Text color="zinc-400">Início da segunda parte da profecia.</Text>
        </Box>
      </Card>

      {/* Caso 2: Separador Vertical (HStack logic) */}
      <Card title="Toolbar (Vertical Separator)" variant="secondary">
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "40px", // Altura definida para o separador preencher
            gap: "1rem",
          }}
        >
          <Button size="sm">Edit</Button>
          <Button size="sm">View</Button>

          {/* Separador Vertical */}
          <Separator orientation="vertical" variant="secondary" />

          <Button size="sm">Copy</Button>
          <Button size="sm">Paste</Button>

          <Separator orientation="vertical" variant="secondary" />

          <Text fontSize="xs" color="secondary" style={{ marginLeft: "auto" }}>
            v2.0.1
          </Text>
        </Box>
      </Card>

      {/* Caso 3: Zona Restrita */}
      <Card title="Zona Restrita" variant="danger">
        <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Text color="danger">Status: Comprometido</Text>
            <Button size="sm" variant="danger">
              Reportar
            </Button>
          </div>

          <Separator variant="danger" label="Classified" style={{ margin: "1.5rem 0" }} />

          <Text color="danger" style={{ opacity: 0.8, fontSize: "0.875rem" }}>
            Estas informações são visíveis apenas para nível 5 de acesso.
          </Text>
        </Box>
      </Card>
    </Box>
  );
};
