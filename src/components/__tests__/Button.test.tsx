import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  it("deve renderizar o texto corretamente", () => {
    render(<Button>Invocar</Button>);
    const button = screen.getByRole("button", { name: /invocar/i });
    expect(button).toBeInTheDocument();
  });

  it("deve aplicar a classe da variante danger", () => {
    render(<Button variant="danger">Deletar</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-danger");
    expect(button.className).toContain("text-danger");
  });

  it("deve aplicar classes de tamanho large", () => {
    render(<Button size="lg">Grande</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("px-10"); // Classe do size lg
  });

  it("não deve disparar onClick quando disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Bloqueado
      </Button>,
    );

    const button = screen.getByRole("button");

    // Verifica atributos e classes visuais
    expect(button).toBeDisabled();
    expect(button.className).toContain("opacity-50");
    expect(button.className).toContain("cursor-not-allowed");

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
