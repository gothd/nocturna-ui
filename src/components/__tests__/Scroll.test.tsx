import { render, screen } from "@testing-library/react";
import { Scroll } from "../Scroll";

describe("Scroll", () => {
  it("deve renderizar children e aplicar max-height", () => {
    render(
      <Scroll maxH="200px">
        <p>Conteúdo Longo</p>
      </Scroll>,
    );

    const content = screen.getByText("Conteúdo Longo");
    const container = content.parentElement;
    expect(container).toHaveStyle({ maxHeight: "200px" });
  });

  it("deve aplicar estilos de scrollbar da variante danger", () => {
    render(
      <Scroll variant="danger">
        <p>Erro</p>
      </Scroll>,
    );
    const container = screen.getByText("Erro").parentElement;
    expect(container?.className).toContain("[&::-webkit-scrollbar-thumb]:bg-danger");
  });

  it("deve ocultar a scrollbar quando hideScrollbar=true", () => {
    render(
      <Scroll hideScrollbar>
        <p>Oculto</p>
      </Scroll>,
    );
    const container = screen.getByText("Oculto").parentElement;
    expect(container?.className).toContain("scrollbar-none");
  });

  it("deve aplicar overflow correto baseado na orientation", () => {
    // Teste Vertical (Padrão)
    const { rerender } = render(
      <Scroll orientation="vertical">
        <p>Vertical</p>
      </Scroll>,
    );
    let container = screen.getByText("Vertical").parentElement;
    expect(container?.className).toContain("overflow-y-auto");
    expect(container?.className).toContain("overflow-x-hidden");

    // Teste Horizontal
    rerender(
      <Scroll orientation="horizontal">
        <p>Horizontal</p>
      </Scroll>,
    );
    container = screen.getByText("Horizontal").parentElement;
    expect(container?.className).toContain("overflow-x-auto");
    expect(container?.className).toContain("overflow-y-hidden");
  });
});
