import { render, screen, fireEvent } from "@testing-library/react";
import { HexCheckbox } from "../Checkbox";

describe("HexCheckbox", () => {
  it("deve renderizar label se fornecido", () => {
    render(<HexCheckbox label="Aceitar Termos" />);
    expect(screen.getByText("Aceitar Termos")).toBeInTheDocument();
  });

  it("deve alternar estado checked ao clicar", () => {
    const handleChange = jest.fn();
    render(<HexCheckbox label="Check me" onChange={handleChange} />);

    fireEvent.click(screen.getByText("Check me"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("deve estar acessível via keyboard (input escondido mas presente)", () => {
    render(<HexCheckbox data-testid="checkbox" />);
    const input = screen.getByTestId("checkbox");
    expect(input).toBeInTheDocument();
    // Verifica se é um checkbox real
    expect(input).toHaveAttribute("type", "checkbox");
  });
});
