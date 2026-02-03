import { render, screen, fireEvent, act } from "@testing-library/react";
import { Tooltip } from "../Tooltip";

describe("Tooltip", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("deve mostrar o tooltip após o delay ao passar o mouse", async () => {
    render(
      <Tooltip content="Info" variant="accent" delay={200}>
        <button>Hover Me</button>
      </Tooltip>,
    );

    const button = screen.getByText("Hover Me");
    // O tooltip sempre existe no DOM, mas começa invisível (opacity-0).
    // Usamos hidden: true para garantir que o testing-library o encontre mesmo invisível.
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    // Simula Hover
    fireEvent.mouseEnter(button);

    // Imediatamente deve estar no documento mas invisível (opacity-0)
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.className).toContain("opacity-0");

    // Avança o tempo
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(tooltip.className).toContain("opacity-100");
    expect(tooltip).toHaveTextContent("Info");

    // Verifica estilo da variante accent
    expect(tooltip.className).toContain("border-accent");
  });

  it("deve aplicar classes de posicionamento (bottom)", async () => {
    render(
      <Tooltip content="Info" position="bottom" delay={0}>
        <button>Btn</button>
      </Tooltip>,
    );

    const button = screen.getByText("Btn");
    fireEvent.mouseEnter(button);

    act(() => {
      jest.runAllTimers();
    });

    const tooltip = screen.getByRole("tooltip");
    // Verifica lógica de posicionamento (top-full = abaixo do elemento)
    expect(tooltip.className).toContain("top-full");
  });

  it("deve ser acessível via teclado (focus)", async () => {
    render(
      <Tooltip content="Info" delay={0}>
        <button>Focus Me</button>
      </Tooltip>,
    );

    const button = screen.getByText("Focus Me");

    // Foca no botão
    fireEvent.focus(button);

    act(() => {
      jest.runAllTimers();
    });

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
  });

  it("deve ocultar ao sair do mouse (mouseLeave)", async () => {
    render(
      <Tooltip content="Info" delay={0}>
        <button>Hover Me</button>
      </Tooltip>,
    );

    const button = screen.getByText("Hover Me");
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    fireEvent.mouseEnter(button);

    act(() => {
      jest.runAllTimers();
    });

    expect(tooltip.className).toContain("opacity-100");

    fireEvent.mouseLeave(button);

    // Deve sumir imediatamente (opacity-0)
    expect(tooltip.className).toContain("opacity-0");
    expect(tooltip).toBeInTheDocument(); // Continua no DOM
  });
});
