import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Menu } from "../Menu";

const items = [
  { label: "Editar", onClick: jest.fn() },
  { label: "Excluir", onClick: jest.fn(), danger: true },
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
    expect(trigger.className).toContain("text-accent");
  });

  it("deve aplicar estilos da variante ghost", () => {
    render(<Menu items={items} variant="ghost" />);
    const trigger = screen.getByRole("button");
    // Ghost trigger deve ter borda transparente e texto cinza
    expect(trigger.className).toContain("border-transparent");
    expect(trigger.className).toContain("text-zinc-400");
  });

  it("deve abrir o menu e navegar via teclado (ArrowDown)", () => {
    render(<Menu items={items} />);
    const trigger = screen.getByRole("button");

    fireEvent.click(trigger);
    expect(screen.getByText("Editar")).toBeVisible();

    const firstItem = screen.getByText("Editar").closest("button");
    firstItem?.focus();
    expect(firstItem).toHaveFocus();

    fireEvent.keyDown(firstItem!, { key: "ArrowDown" });
    const secondItem = screen.getByText("Excluir").closest("button");
    expect(secondItem).toHaveFocus();
  });

  it("não deve chamar onClick de item desabilitado", () => {
    render(<Menu items={items} />);
    fireEvent.click(screen.getByRole("button"));

    const disabledItem = screen.getByText("Desabilitado");
    fireEvent.click(disabledItem);

    expect(items[2].onClick).not.toHaveBeenCalled();
  });

  it("deve fechar ao pressionar ESC", async () => {
    render(<Menu items={items} />);
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const menu = screen.getByRole("menu");
    fireEvent.keyDown(menu, { key: "Escape" });

    await waitFor(() => {
      expect(menu).toHaveClass("invisible");
    });
  });
});
