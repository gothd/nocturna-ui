import { render, screen, fireEvent } from "@testing-library/react";
import { SoulTabs } from "../Tabs";

const tabs = [
  { id: "tab1", label: "Aba 1", content: "Conteúdo 1" },
  { id: "tab2", label: "Aba 2", content: "Conteúdo 2" },
];

describe("SoulTabs", () => {
  it("deve renderizar os botões das abas e o conteúdo da primeira aba ativa", () => {
    render(<SoulTabs tabs={tabs} />);

    expect(screen.getByRole("tab", { name: "Aba 1" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Aba 2" })).toHaveAttribute(
      "aria-selected",
      "false",
    );

    expect(screen.getByText("Conteúdo 1")).toBeVisible();
    // Conteúdo 2 existe no DOM mas está hidden
    expect(screen.getByText("Conteúdo 2")).not.toBeVisible();
  });

  it("deve alternar conteúdo ao clicar na aba", () => {
    render(<SoulTabs tabs={tabs} />);

    fireEvent.click(screen.getByRole("tab", { name: "Aba 2" }));

    expect(screen.getByRole("tab", { name: "Aba 2" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Conteúdo 2")).toBeVisible();
    expect(screen.getByText("Conteúdo 1")).not.toBeVisible();
  });
});
