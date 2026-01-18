import { render, screen, fireEvent } from "@testing-library/react";
import { VeinInput } from "../Input";

describe("VeinInput", () => {
  it("deve renderizar label e input", () => {
    render(<VeinInput label="Nome" placeholder="Digite seu nome" />);
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu nome")).toBeInTheDocument();
  });

  it("deve mostrar mensagem de erro e aplicar aria-invalid", () => {
    render(<VeinInput label="Email" error="Email inválido" />);
    const input = screen.getByLabelText("Email");

    expect(screen.getByText("Email inválido")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("error"),
    );
  });

  it("deve aceitar digitação", () => {
    render(<VeinInput label="Teste" />);
    const input = screen.getByLabelText("Teste") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Novo Valor" } });
    expect(input.value).toBe("Novo Valor");
  });
});
