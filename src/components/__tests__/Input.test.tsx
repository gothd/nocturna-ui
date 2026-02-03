import { render, screen } from "@testing-library/react";
import { Input } from "../Input";

describe("Input", () => {
  it("deve renderizar label e input", () => {
    render(<Input label="Nome" placeholder="Digite seu nome" />);
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu nome")).toBeInTheDocument();
  });

  it("deve aplicar a variante ghost", () => {
    render(<Input label="Busca" variant="ghost" />);
    const input = screen.getByLabelText("Busca");
    expect(input.className).toContain("border-zinc-700");
    expect(input.className).toContain("text-zinc-400");
    expect(input.className).toContain("bg-transparent");
    expect(input.className).toContain("border-x-0");
  });

  it("deve forçar estilo danger quando houver erro", () => {
    // Mesmo pedindo variante 'ghost', o erro deve vencer
    render(<Input label="Email" variant="ghost" error="Email inválido" />);

    const input = screen.getByLabelText("Email");
    const errorMessage = screen.getByText("Email inválido");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.className).toContain("text-danger");

    // O input deve ter borda danger, NÃO transparent
    expect(input.className).toContain("border-danger");
    expect(input.className).not.toContain("border-zinc-700");
  });

  it("deve aplicar System Props ao container", () => {
    render(<Input label="Teste" mt={4} w="50%" data-testid="input-root" />);

    // O container raiz é uma div que envolve label e input
    // Vamos pegar o elemento pai do label
    const label = screen.getByText("Teste");
    const container = label.parentElement;

    expect(container).toHaveStyle({ marginTop: "1rem" });
    expect(container).toHaveStyle({ width: "50%" });
  });

  it("deve renderizar ícones", () => {
    render(
      <Input
        leftIcon={<span data-testid="icon-l">L</span>}
        rightIcon={<span data-testid="icon-r">R</span>}
      />,
    );
    expect(screen.getByTestId("icon-l")).toBeInTheDocument();
    expect(screen.getByTestId("icon-r")).toBeInTheDocument();
  });
});
