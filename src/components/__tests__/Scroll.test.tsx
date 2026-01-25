import { render, screen } from "@testing-library/react";
import { Scroll } from "../Scroll";

describe("Scroll", () => {
  it("deve renderizar children e aplicar max-height", () => {
    render(
      <Scroll maxHeight="200px">
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
    // Verifica tokens específicos do scrollbar-thumb
    expect(container?.className).toContain("[&::-webkit-scrollbar-thumb]:bg-danger");
  });

  it("deve aplicar estilos de scrollbar da variante accent", () => {
    render(
      <Scroll variant="accent">
        <p>Dados</p>
      </Scroll>,
    );
    const container = screen.getByText("Dados").parentElement;
    expect(container?.className).toContain("[&::-webkit-scrollbar-thumb]:bg-accent");
  });
});
