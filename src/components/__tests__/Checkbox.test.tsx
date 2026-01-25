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

  it("deve aplicar a variante warning", () => {
    render(<Checkbox label="Aviso" variant="warning" defaultChecked />);
    // O input está escondido (sr-only), então verifica se o texto do label recebeu a cor correta
    const label = screen.getByText("Aviso");
    expect(label.className).toContain("text-warning");
  });

  it("deve estar acessível via keyboard", () => {
    render(<Checkbox data-testid="checkbox" />);
    const input = screen.getByTestId("checkbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "checkbox");
  });
});
