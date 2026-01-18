import { render, screen } from "@testing-library/react";
import { NocturnaCard } from "../Card";

describe("NocturnaCard", () => {
  it("deve renderizar título e descrição quando fornecidos", () => {
    render(
      <NocturnaCard title="Título do Card" description="Descrição do Card" />,
    );
    expect(screen.getByText("Título do Card")).toBeInTheDocument();
    expect(screen.getByText("Descrição do Card")).toBeInTheDocument();
  });

  it("deve renderizar apenas o children se não houver título", () => {
    render(<NocturnaCard>Apenas Conteúdo</NocturnaCard>);

    expect(screen.getByText("Apenas Conteúdo")).toBeInTheDocument();
    // Garante que não renderizou um Heading vazio
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("deve aplicar estilos da variante blood", () => {
    render(<NocturnaCard title="Blood" variant="blood" />);
    // Verifica classes específicas do blood (texto vermelho)
    const heading = screen.getByRole("heading", { name: /blood/i });
    expect(heading.className).toContain("text-red-600");
  });
});
