import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AltarMenu } from "../Menu";

const items = [
  { id: "1", label: "Editar", onClick: jest.fn() },
  { id: "2", label: "Excluir", onClick: jest.fn(), danger: true },
];

describe("AltarMenu", () => {
  it("deve renderizar o trigger padrão se nenhum for passado", () => {
    render(<AltarMenu items={items} />);

    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();
  });

  it("deve abrir o menu ao clicar no trigger e mostrar itens", () => {
    render(<AltarMenu items={items} />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    expect(screen.getByText("Editar")).toBeVisible();
    expect(screen.getByText("Excluir")).toBeVisible();
  });

  it("deve chamar onClick do item e fechar menu", async () => {
    render(<AltarMenu items={items} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Editar"));

    expect(items[0].onClick).toHaveBeenCalled();
    await waitFor(() => {
      const menu = screen.getByText("Editar").closest("div")?.parentElement;
      // O menu wrapper tem a classe "invisible" quando fechado
      expect(menu?.querySelector('[role="menu"]')).toHaveClass("invisible");
    });
  });
});
