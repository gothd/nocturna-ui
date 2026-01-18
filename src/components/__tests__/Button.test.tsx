import { fireEvent, render, screen } from "@testing-library/react";
import { VoidButton } from "../Button";

describe("VoidButton", () => {
  it("deve renderizar o texto corretamente", () => {
    render(<VoidButton>Invocar</VoidButton>);

    // Verifica se o botão está no documento com o texto correto
    const button = screen.getByRole("button", { name: /invocar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Invocar");
  });

  it("deve aplicar a classe da variante blood corretamente", () => {
    render(<VoidButton variant="blood">Sangue</VoidButton>);

    const button = screen.getByRole("button");
    // Verifica se classes do Tailwind específicas do blood estão presentes
    expect(button.className).toContain("border-red-900");
    expect(button.className).toContain("text-red-600");
  });

  it("deve chamar a função onClick quando clicado", () => {
    const handleClick = jest.fn();
    render(<VoidButton onClick={handleClick}>Click Me</VoidButton>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
