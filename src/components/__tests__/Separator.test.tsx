import { render, screen } from "@testing-library/react";
import { Separator } from "../Separator";

describe("Separator", () => {
  it("deve renderizar com label e aplicar variante warning", () => {
    render(<Separator label="Capítulo 1" variant="warning" />);
    const label = screen.getByText("Capítulo 1");
    expect(label).toBeInTheDocument();
    expect(label.className).toContain("text-warning");
  });

  it("deve ter role separator e borda primary por padrão", () => {
    render(<Separator />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();

    // As linhas (divs filhas) devem ter a borda padrão
    const line = separator.querySelector("div");
    expect(line?.className).toContain("border-primary");
  });

  it("deve suportar polimorfismo (as='li')", () => {
    render(
      <ul>
        <Separator as="li" />
      </ul>,
    );
    const separator = screen.getByRole("separator");
    expect(separator.tagName).toBe("LI");
  });
});
