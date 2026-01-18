import { render, screen, fireEvent } from "@testing-library/react";
import { GrimoireAccordion } from "../Accordion";

const items = [
  { id: "1", title: "Item 1", content: "Conteúdo 1" },
  { id: "2", title: "Item 2", content: "Conteúdo 2" },
];

describe("GrimoireAccordion", () => {
  it("deve renderizar os títulos dos itens", () => {
    render(<GrimoireAccordion items={items} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("deve mostrar o conteúdo ao clicar e esconder ao clicar novamente", () => {
    render(<GrimoireAccordion items={items} />);

    // Inicialmente fechado (não visível ou não montado pelo AnimatePresence)
    // O queryByText retorna null se não achar, o que é esperado aqui.
    expect(screen.queryByText("Conteúdo 1")).not.toBeInTheDocument();

    // Clica para abrir
    fireEvent.click(screen.getByText("Item 1"));
    expect(screen.getByText("Conteúdo 1")).toBeInTheDocument();

    // Verifica atributo ARIA
    const button = screen.getByText("Item 1").closest("button");
    expect(button).toHaveAttribute("aria-expanded", "true");

    // Clica para fechar
    fireEvent.click(screen.getByText("Item 1"));
    // Nota: O Framer Motion em testes pode precisar de mocks, mas a lógica de estado do React é o que importa.
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
