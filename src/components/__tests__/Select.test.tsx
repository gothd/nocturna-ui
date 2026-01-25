import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "../Select";

// MOCK: O JSDOM não implementa scroll, então simula a função vazia
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const options = [
  { value: "v1", label: "Opção 1" },
  { value: "v2", label: "Opção 2" },
];

describe("Select", () => {
  it("deve renderizar label e placeholder", () => {
    render(<Select options={options} label="Escolha" placeholder="Selecione..." />);
    expect(screen.getByText("Escolha")).toBeInTheDocument();
    expect(screen.getByText("Selecione...")).toBeInTheDocument();
  });

  it("deve aplicar estilos da variante secondary", () => {
    render(<Select options={options} variant="secondary" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger.className).toContain("border-secondary");
  });

  it("deve abrir lista com teclado (Enter) e selecionar opção", () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    const trigger = screen.getByRole("combobox");

    // Foca e aperta Enter para abrir
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Enter" });

    // O scrollIntoView será chamado no mock e não quebrará o teste
    expect(screen.getByText("Opção 1")).toBeVisible();

    // Clica na opção
    fireEvent.click(screen.getByText("Opção 1"));
    expect(handleChange).toHaveBeenCalledWith("v1");
  });

  it("não deve abrir se estiver disabled", () => {
    render(<Select options={options} disabled />);
    const trigger = screen.getByRole("combobox");

    fireEvent.click(trigger);
    expect(screen.queryByText("Opção 1")).not.toBeInTheDocument();
    expect(trigger).toBeDisabled();
  });
});
