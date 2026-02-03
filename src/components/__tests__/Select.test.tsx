import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "../Select";

// MOCK: O JSDOM não implementa scrollIntoView
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

  it("deve aplicar a variante ghost corretamente", () => {
    render(<Select options={options} variant="ghost" />);
    const trigger = screen.getByRole("combobox");
    // Ghost deve ter estilo 'stealth' (borda inferior apenas, fundo transparente)
    expect(trigger.className).toContain("border-zinc-700");
    expect(trigger.className).toContain("bg-transparent");
    expect(trigger.className).toContain("border-x-transparent");
    expect(trigger.className).toContain("border-t-transparent");
  });

  it("deve aplicar System Props ao container", () => {
    render(<Select options={options} label="Teste" mt={4} w="50%" data-testid="select-root" />);

    const label = screen.getByText("Teste");
    const container = label.parentElement;

    expect(container).toHaveStyle({ marginTop: "1rem" });
    expect(container).toHaveStyle({ width: "50%" });
  });

  it("deve abrir lista com teclado (Enter) e selecionar opção", () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    const trigger = screen.getByRole("combobox");

    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Enter" });

    expect(screen.getByText("Opção 1")).toBeVisible();

    fireEvent.click(screen.getByText("Opção 1"));
    expect(handleChange).toHaveBeenCalledWith("v1");
  });

  it("não deve abrir se estiver disabled", () => {
    render(<Select options={options} disabled />);
    const trigger = screen.getByRole("combobox");

    fireEvent.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
