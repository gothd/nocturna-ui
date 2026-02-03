import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  it("deve renderizar label se fornecido", () => {
    render(<Checkbox label="Aceitar Termos" />);
    expect(screen.getByText("Aceitar Termos")).toBeInTheDocument();
  });

  it("deve alternar estado checked ao clicar", () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Check me" onChange={handleChange} />);

    fireEvent.click(screen.getByText("Check me"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("deve aplicar a variante ghost corretamente", () => {
    render(<Checkbox label="Silencioso" variant="ghost" />);
    const label = screen.getByText("Silencioso");
    expect(label.className).toContain("text-zinc-400");

    // Verifica se a caixa (irmã anterior do input) tem borda zinc-700.
    const input = screen.getByRole("checkbox");
    const box = input.nextSibling as HTMLElement;
    expect(box.className).toContain("border-zinc-700");
  });

  it("deve aplicar System Props ao container (label)", () => {
    render(<Checkbox label="Margin" mt={8} data-testid="checkbox-container" />);
    // O componente aplica props no input, mas systemStyle no label wrapper.
    // Verifica o style do elemento pai do texto.

    const labelText = screen.getByText("Margin");
    const container = labelText.closest("label");

    expect(container).toHaveStyle({ marginTop: "2rem" });
  });

  it("deve estar acessível via keyboard (input existe)", () => {
    render(<Checkbox data-testid="checkbox-input" />);
    // O data-testid é passado para o input via {...domProps}
    // Mas o input tem classe sr-only (escondido visualmente)
    const input = screen.getByTestId("checkbox-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "checkbox");
  });

  it("deve aplicar estado disabled corretamente", () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Bloqueado" disabled onChange={handleChange} />);

    const input = screen.getByRole("checkbox");
    expect(input).toBeDisabled();

    const labelText = screen.getByText("Bloqueado");
    expect(labelText.className).toContain("opacity-50");

    fireEvent.click(labelText);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
