import { render, screen, fireEvent } from "@testing-library/react";
import { RuneTooltip } from "../Tooltip";

describe("RuneTooltip", () => {
  it("deve mostrar o tooltip ao passar o mouse (hover)", () => {
    render(
      <RuneTooltip content="Informação Secreta">
        <button>Hover Me</button>
      </RuneTooltip>,
    );

    // O tooltip começa no documento, mas invisível (opacity-0) ou fora da tela.
    const tooltipContent = screen.getByText("Informação Secreta");

    // Verifica estado inicial (invisível)
    expect(tooltipContent.className).toContain("opacity-0");

    // Simula Hover
    fireEvent.mouseEnter(screen.getByText("Hover Me"));
    expect(tooltipContent.className).toContain("opacity-100");

    // Simula Saída
    fireEvent.mouseLeave(screen.getByText("Hover Me"));
    expect(tooltipContent.className).toContain("opacity-0");
  });
});
