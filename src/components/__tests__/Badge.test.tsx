import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("deve renderizar o conteúdo corretamente", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("deve aplicar a classe da variante ghost", () => {
    render(<Badge variant="ghost">Invisible</Badge>);
    const badge = screen.getByText("Invisible");
    // Verifica classes específicas do ghost definidas no componente
    expect(badge.className).toContain("bg-transparent");
    expect(badge.className).toContain("border-transparent");
  });

  it("deve aplicar a classe de tamanho small", () => {
    render(<Badge size="sm">Pequeno</Badge>);
    const badge = screen.getByText("Pequeno");
    expect(badge.className).toContain("text-[10px]");
  });

  it("deve aplicar System Props ao estilo inline", () => {
    // Teste de margem (mt) e cor de fundo customizada (bg)
    render(
      <Badge mt={4} bg="black" data-testid="badge-styled">
        Custom
      </Badge>,
    );

    const badge = screen.getByTestId("badge-styled");

    // mt={4} -> marginTop: "1rem" (conforme tokens)
    expect(badge.style.marginTop).toBe("1rem");
    expect(badge.style.backgroundColor).toBe("rgb(0, 0, 0)");
  });

  it("deve suportar polimorfismo (renderizar como <a>)", () => {
    render(
      <Badge as="a" href="#" data-testid="badge-link">
        Link
      </Badge>,
    );
    const badge = screen.getByTestId("badge-link");
    expect(badge.tagName).toBe("A");
  });
});
