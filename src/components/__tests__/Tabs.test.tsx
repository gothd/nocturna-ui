import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "../Tabs";

const tabs = [
  { id: "tab1", label: "Aba 1", content: "Conteúdo 1" },
  { id: "tab2", label: "Aba 2", content: "Conteúdo 2" },
];

describe("Tabs", () => {
  it("deve renderizar e aplicar estilos da variante primary (padrão)", () => {
    render(<Tabs tabs={tabs} variant="primary" />);

    const activeTab = screen.getByRole("tab", { name: "Aba 1" });
    expect(activeTab).toHaveAttribute("aria-selected", "true");
    // Primary active style: bg-white text-black
    expect(activeTab.className).toContain("bg-white");
  });

  it("deve aplicar estilos da variante secondary na aba ativa", () => {
    render(<Tabs tabs={tabs} variant="secondary" />);

    const activeTab = screen.getByRole("tab", { name: "Aba 1" });
    // Secondary active style: bg-secondary text-black
    expect(activeTab.className).toContain("bg-secondary");
  });

  it("deve navegar entre abas com as setas do teclado", () => {
    render(<Tabs tabs={tabs} />);
    const tab1 = screen.getByRole("tab", { name: "Aba 1" });

    // Foca na primeira aba e aperta Seta Direita
    tab1.focus();
    fireEvent.keyDown(tab1, { key: "ArrowRight" });

    // A segunda aba deve estar ativa e focada
    const tab2 = screen.getByRole("tab", { name: "Aba 2" });
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveFocus();
    expect(screen.getByText("Conteúdo 2")).toBeVisible();
  });
});
