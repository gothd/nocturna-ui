import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../Input";

describe("Input", () => {
  it("deve renderizar label e input", () => {
    render(<Input label="Nome" placeholder="Digite seu nome" />);
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu nome")).toBeInTheDocument();
  });

  it("deve aplicar a variante accent no estado normal", () => {
    render(<Input label="Senha" variant="accent" />);
    const input = screen.getByLabelText("Senha");
    expect(input.className).toContain("border-accent");
    expect(input.className).toContain("text-accent");
  });

  it("deve forçar estilo danger quando houver erro", () => {
    // Mesmo pedindo variante 'primary', o erro deve vencer
    render(<Input label="Email" variant="primary" error="Email inválido" />);

    const input = screen.getByLabelText("Email");
    const errorMessage = screen.getByText("Email inválido");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.className).toContain("text-danger");

    // O input deve ter borda danger
    expect(input.className).toContain("border-danger");

    // Acessibilidade
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", expect.stringContaining("error"));
  });

  it("deve aceitar digitação", () => {
    render(<Input label="Teste" />);
    const input = screen.getByLabelText("Teste") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Novo Valor" } });
    expect(input.value).toBe("Novo Valor");
  });
});
