import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion } from "../Accordion";

const items = [
  { id: "1", title: "Item 1", content: "Conteúdo 1" },
  { id: "2", title: "Item 2", content: "Conteúdo 2" },
];

describe("Accordion", () => {
  it("deve renderizar os títulos dos itens", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("deve aplicar a variante danger corretamente", () => {
    render(<Accordion items={items} variant="danger" />);
    // O container do item deve ter a borda correspondente ao danger
    // Como o componente usa map, pega o primeiro item
    const itemContainer = screen.getByText("Item 1").closest("div");
    expect(itemContainer?.className).toContain("border-danger");
  });

  it("deve mostrar o conteúdo ao clicar e atualizar ARIA", () => {
    render(<Accordion items={items} />);

    // Inicialmente fechado
    expect(screen.queryByText("Conteúdo 1")).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: /item 1/i });
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Clica para abrir
    fireEvent.click(button);
    expect(screen.getByText("Conteúdo 1")).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "true");

    // Clica para fechar
    fireEvent.click(button);
    // Nota: Em testes unitários sem animação real, o componente sai do DOM imediatamente
    // ou aguarda o timeout do framer-motion. É verificado o estado lógico.
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
