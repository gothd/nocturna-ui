import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Menu } from "../Menu";

const items = [
  { id: "1", label: "Editar", onClick: jest.fn() },
  { id: "2", label: "Excluir", onClick: jest.fn(), danger: true },
  { id: "3", label: "Desabilitado", onClick: jest.fn(), disabled: true },
];

describe("Menu", () => {
  it("deve renderizar o trigger padrão se nenhum for passado", () => {
    render(<Menu items={items} />);
    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();
  });

  it("deve aplicar estilos da variante accent", () => {
    render(<Menu items={items} variant="accent" />);
    const trigger = screen.getByRole("button");
    // O trigger deve ter a cor do texto ou borda da variante
    expect(trigger.className).toContain("text-accent");
  });

  it("deve abrir o menu e navegar via teclado (ArrowDown)", () => {
    render(<Menu items={items} />);
    const trigger = screen.getByRole("button");

    // Abre o menu
    fireEvent.click(trigger);
    expect(screen.getByText("Editar")).toBeVisible();

    // Foca no primeiro item
    const firstItem = screen.getByText("Editar").closest("button");
    firstItem?.focus();
    expect(firstItem).toHaveFocus();

    // Navega para baixo
    fireEvent.keyDown(firstItem!, { key: "ArrowDown" });
    const secondItem = screen.getByText("Excluir").closest("button");
    expect(secondItem).toHaveFocus();
  });

  it("não deve chamar onClick de item desabilitado", () => {
    render(<Menu items={items} />);
    fireEvent.click(screen.getByRole("button")); // Abre

    const disabledItem = screen.getByText("Desabilitado");
    fireEvent.click(disabledItem);

    expect(items[2].onClick).not.toHaveBeenCalled();
  });

  it("deve fechar ao pressionar ESC", async () => {
    render(<Menu items={items} />);
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Simula ESC dentro do menu
    const menu = screen.getByRole("menu");
    fireEvent.keyDown(menu, { key: "Escape" });

    await waitFor(() => {
      expect(menu).toHaveClass("invisible");
    });
  });
});
