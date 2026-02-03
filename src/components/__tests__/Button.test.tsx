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

  it("deve aplicar a classe da variante ghost", () => {
    render(<Button variant="ghost">Cancelar</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-transparent");
    expect(button.className).toContain("text-zinc-400");
  });

  it("deve aplicar classes de tamanho large", () => {
    render(<Button size="lg">Grande</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("px-10"); // Classe do size lg
  });

  it("deve aplicar System Props via style inline", () => {
    // mt={4} (margin-top) e w="100%"
    render(
      <Button mt={4} w="full" data-testid="btn-styled">
        Full Width
      </Button>,
    );
    const button = screen.getByTestId("btn-styled");

    expect(button.style.marginTop).toBe("1rem"); // 4 * 0.25rem
    expect(button.style.width).toBe("100%");
  });

  it("não deve disparar onClick quando disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Bloqueado
      </Button>,
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button.className).toContain("opacity-50");
    expect(button.className).toContain("cursor-not-allowed");

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("deve mostrar spinner e esconder texto quando isLoading", () => {
    render(<Button isLoading>Carregando</Button>);
    const button = screen.getByRole("button");

    // Texto deve estar invisível
    const textSpan = screen.getByText("Carregando");
    expect(textSpan.className).toContain("invisible");

    // Deve estar desabilitado
    expect(button).toBeDisabled();
  });

  it("deve suportar polimorfismo (renderizar como <a>)", () => {
    render(
      <Button as="a" href="#" data-testid="button-link">
        Link
      </Button>,
    );
    const button = screen.getByTestId("button-link");
    expect(button.tagName).toBe("A");
  });
});
