import { render, screen, fireEvent } from "@testing-library/react";
import { Tooltip } from "../Tooltip";

describe("Tooltip", () => {
  it("deve mostrar o tooltip ao passar o mouse", () => {
    render(
      <Tooltip content="Info" variant="accent">
        <button>Hover Me</button>
      </Tooltip>,
    );

    const tooltip = screen.getByRole("tooltip", { hidden: true }); // hidden: true pois começa opacity-0
    expect(tooltip).toBeInTheDocument();

    // Verifica se tem as classes da variante Accent
    expect(tooltip.className).toContain("border-accent");
    expect(tooltip.className).toContain("text-accent");

    // Simula Hover
    fireEvent.mouseEnter(screen.getByText("Hover Me"));
    expect(tooltip.className).toContain("opacity-100");
  });

  it("deve aplicar classes de posicionamento (bottom)", () => {
    render(
      <Tooltip content="Info" position="bottom">
        <button>Btn</button>
      </Tooltip>,
    );

    const tooltip = screen.getByRole("tooltip", { hidden: true });
    // Verifica lógica de posicionamento (top-full, mt-2, etc)
    expect(tooltip.className).toContain("top-full");
  });

  it("deve ser acessível via teclado (focus)", () => {
    render(
      <Tooltip content="Info">
        <button>Focus Me</button>
      </Tooltip>,
    );

    const button = screen.getByText("Focus Me");
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    // Foca no botão
    fireEvent.focus(button);
    expect(tooltip.className).toContain("opacity-100");

    // Remove o foco
    fireEvent.blur(button);
    expect(tooltip.className).toContain("opacity-0");
  });
});
