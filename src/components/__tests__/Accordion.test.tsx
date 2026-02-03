import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Accordion } from "../Accordion";

// Dados mistos: alguns com ID, outros sem (para testar o fallback)
const items = [
  { id: "custom-id-1", title: "Item 1", content: "Conteúdo 1" },
  { title: "Item 2", content: "Conteúdo 2" }, // Sem ID
];

describe("Accordion", () => {
  it("deve renderizar os títulos dos itens corretamente", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("deve aceitar a variante ghost sem erros", () => {
    render(<Accordion items={items} variant="ghost" data-testid="acc-ghost" />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();

    // Verifica se a variante ghost agora é transparente
    const itemContainer = screen.getByText("Item 1").closest("div.border-2");
    expect(itemContainer?.className).toContain("border-transparent");
  });

  it("deve gerenciar estado de abertura/fechamento (inclusive para itens sem ID explícito)", async () => {
    render(<Accordion items={items} />);

    // 1. Abrir Item 1 (com ID)
    const button1 = screen.getByRole("button", { name: /item 1/i });
    fireEvent.click(button1);
    expect(screen.getByText("Conteúdo 1")).toBeInTheDocument();

    // 2. Abrir Item 2 (sem ID - testando fallback)
    // Isso deve desencadear o fechamento do Item 1 pois allowMultiple=false
    const button2 = screen.getByRole("button", { name: /item 2/i });
    fireEvent.click(button2);

    // Verifica se o Item 2 abriu
    expect(screen.getByText("Conteúdo 2")).toBeInTheDocument();

    // 3. Verifica se o Item 1 fechou (aguardando a animação de saída)
    await waitFor(() => {
      expect(screen.queryByText("Conteúdo 1")).not.toBeInTheDocument();
    });
  });

  it("deve aplicar System Props ao container", () => {
    render(<Accordion items={items} mt={10} w="50%" data-testid="accordion-styled" />);
    const container = screen.getByTestId("accordion-styled");
    expect(container.style.marginTop).toBe("2.5rem"); // 10 * 0.25rem
    expect(container.style.width).toBe("50%");
  });
});
