import { render, screen } from "@testing-library/react";
import { AbyssScroll } from "../Scroll";

describe("AbyssScroll", () => {
  it("deve renderizar children e aplicar classe de scrollbar", () => {
    render(
      <AbyssScroll variant="void" maxHeight="200px" className="custom-class">
        <p>Conteúdo Longo</p>
      </AbyssScroll>,
    );

    const content = screen.getByText("Conteúdo Longo");
    const container = content.parentElement;

    expect(content).toBeInTheDocument();
    expect(container).toHaveStyle({ maxHeight: "200px" });
    expect(container?.className).toContain("[scrollbar-color:white_black]");
    expect(container?.className).toContain("custom-class");
  });

  it("deve aplicar a classe blood quando variante é blood", () => {
    render(
      <AbyssScroll variant="blood">
        <p>Conteúdo</p>
      </AbyssScroll>,
    );
    const content = screen.getByText("Conteúdo");
    expect(content.parentElement?.className).toContain(
      "[scrollbar-color:#7f1d1d_black]",
    );
  });
});
