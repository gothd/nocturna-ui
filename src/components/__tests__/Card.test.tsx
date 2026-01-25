import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  it("deve renderizar título e descrição", () => {
    render(<Card title="Título" description="Descrição" />);
    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
  });

  it("deve renderizar apenas o children se não houver título", () => {
    render(<Card>Conteúdo</Card>);
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("deve aplicar estilos da variante secondary", () => {
    render(<Card title="System" variant="secondary" />);
    // O container do card deve ter a borda secondary
    const heading = screen.getByRole("heading", { name: /system/i });
    // Verifica a cor do texto do título que herda a variante
    expect(heading.className).toContain("text-secondary");
  });

  it("deve suportar polimorfismo (renderizar como section)", () => {
    const { container } = render(<Card as="section" title="Seção" />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("deve alterar o nível do cabeçalho corretamente", () => {
    render(<Card title="Título H1" headingLevel="h1" />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
