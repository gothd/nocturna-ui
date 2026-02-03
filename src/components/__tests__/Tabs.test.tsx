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

  it("deve aplicar estilos da variante ghost", () => {
    render(<Tabs tabs={tabs} variant="ghost" />);

    const activeTab = screen.getByRole("tab", { name: "Aba 1" });
    const inactiveTab = screen.getByRole("tab", { name: "Aba 2" });

    // Ghost Active: bg-black
    expect(activeTab.className).toContain("bg-black");
    // Ghost Active: border-zinc-700 (borda visível quando ativo)
    expect(activeTab.className).toContain("border-zinc-700");
    // Ghost Inactive: text-zinc-500
    expect(inactiveTab.className).toContain("text-zinc-500");
  });

  it("deve navegar entre abas com as setas do teclado", () => {
    render(<Tabs tabs={tabs} />);
    const tab1 = screen.getByRole("tab", { name: "Aba 1" });

    // Foca na primeira aba e aperta Seta Direita
    tab1.focus();
    fireEvent.keyDown(tab1, { key: "ArrowRight" });

    // A aba 2 deve estar ativa e focada
    const tab2 = screen.getByRole("tab", { name: "Aba 2" });
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveFocus();
  });

  it("deve renderizar o conteúdo correto ao clicar", () => {
    render(<Tabs tabs={tabs} />);
    const tab2 = screen.getByRole("tab", { name: "Aba 2" });

    fireEvent.click(tab2);

    // Conteúdo 2 visível, Conteúdo 1 oculto (hidden)
    expect(screen.getByText("Conteúdo 2")).toBeVisible();
    const content1 = screen.getByText("Conteúdo 1").closest("div");
    expect(content1).toHaveAttribute("hidden");
  });

  it("deve aplicar props de tipografia customizadas nos botões das abas", () => {
    render(
      <Tabs
        tabs={tabs}
        uppercase={false}
        fontFamily="mono"
        fontSize="lg"
        fontWeight="bold"
        color="accent"
      />,
    );

    const tabButton = screen.getByRole("tab", { name: "Aba 1" });

    // Verifica se a classe uppercase foi removida
    expect(tabButton.className).not.toContain("uppercase");

    // Verifica estilos inline aplicados
    expect(tabButton.style.fontFamily).toMatch(/JetBrains Mono/);
    expect(tabButton.style.fontSize).toBe("1.125rem");
    expect(tabButton.style.fontWeight).toBe("700");
    expect(tabButton.style.color).toBe("rgb(255, 0, 127)");
  });
});
