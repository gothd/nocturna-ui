import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  it("deve renderizar título e descrição", () => {
    render(<Card title="Título" description="Descrição" descriptionFontFamily="mono" />);
    expect(screen.getByText("Título")).toBeInTheDocument();
    const descriptionElement = screen.getByText("Descrição");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.style.fontFamily).toMatch(/JetBrains Mono/);
  });

  it("deve renderizar apenas o children se não houver título", () => {
    render(<Card>Conteúdo</Card>);
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("deve aplicar estilos da variante ghost", () => {
    render(<Card title="Ghost Card" variant="ghost" data-testid="card-ghost" />);
    const card = screen.getByTestId("card-ghost");
    expect(card.className).toContain("border-transparent");

    const heading = screen.getByRole("heading", { name: /Ghost Card/i });
    expect(heading.className).toContain("text-zinc-400");
  });

  it("deve aplicar System Props via style inline", () => {
    // Teste de margin (mb), padding (p) e width (w)
    render(<Card mb={8} w="50%" p={0} data-testid="card-styled" />);
    const card = screen.getByTestId("card-styled");

    expect(card.style.marginBottom).toBe("2rem");
    expect(card.style.width).toBe("50%");
    expect(card.style.padding).toBe("0px");
  });

  it("deve renderizar o footer quando fornecido", () => {
    render(<Card footer={<span>Rodapé</span>}>Corpo</Card>);
    expect(screen.getByText("Rodapé")).toBeInTheDocument();
  });

  it("deve suportar polimorfismo (renderizar como article)", () => {
    const { container } = render(<Card as="article" title="Artigo" />);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });
});
