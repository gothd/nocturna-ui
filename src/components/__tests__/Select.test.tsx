import { render, screen, fireEvent } from "@testing-library/react";
import { RitualSelect } from "../Select";

const options = [
  { value: "v1", label: "Opção 1" },
  { value: "v2", label: "Opção 2" },
];

describe("RitualSelect", () => {
  it("deve renderizar label e placeholder inicial", () => {
    render(
      <RitualSelect
        options={options}
        label="Escolha"
        placeholder="Selecione..."
      />,
    );
    expect(screen.getByText("Escolha")).toBeInTheDocument();
    expect(screen.getByText("Selecione...")).toBeInTheDocument();
  });

  it("deve abrir lista ao clicar e selecionar opção", () => {
    const handleChange = jest.fn();
    render(<RitualSelect options={options} onChange={handleChange} />);

    // Abre o select
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    // Verifica se opções apareceram
    expect(screen.getByText("Opção 1")).toBeInTheDocument();

    // Clica na opção
    fireEvent.click(screen.getByText("Opção 2"));

    expect(handleChange).toHaveBeenCalledWith("v2");
  });
});
