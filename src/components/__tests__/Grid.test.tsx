import { render, screen } from "@testing-library/react";
import { Grid } from "../Grid";
import { SimpleGrid } from "../SimpleGrid";

describe("Grid System", () => {
  it("Grid deve aceitar templates customizados", () => {
    render(<Grid templateColumns="1fr 2fr" templateRows="100px auto" gap={4} data-testid="grid" />);
    const element = screen.getByTestId("grid");

    expect(element).toHaveStyle({
      gridTemplateColumns: "1fr 2fr",
      gridTemplateRows: "100px auto",
      gap: "1rem",
    });
  });

  it("SimpleGrid deve calcular colunas automaticamente", () => {
    render(<SimpleGrid columns={3} spacing={2} data-testid="simple-grid" />);
    const element = screen.getByTestId("simple-grid");

    // Verifica se gerou o repeat correto
    expect(element).toHaveStyle({
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "0.5rem",
    });
  });

  it("SimpleGrid deve usar minChildWidth para responsividade", () => {
    render(<SimpleGrid minChildWidth="200px" data-testid="responsive-grid" />);
    const element = screen.getByTestId("responsive-grid");

    expect(element).toHaveStyle({
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    });
  });
});
