import { render, screen } from "@testing-library/react";
import { Separator } from "../Separator";

describe("Separator", () => {
  it("deve renderizar com label e aplicar variante warning", () => {
    render(<Separator label="Capítulo 1" variant="warning" />);
    const label = screen.getByText("Capítulo 1");
    expect(label).toBeInTheDocument();
    expect(label.className).toContain("text-warning");
  });

  it("deve ter role separator e borda primary por padrão (horizontal)", () => {
    render(<Separator />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");

    // As linhas (divs filhas) devem ter a borda superior (border-t)
    const line = separator.querySelector("div");
    expect(line?.className).toContain("border-t-2");
  });

  it("deve renderizar verticalmente quando orientation='vertical'", () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator.className).toContain("flex-col");

    // As linhas devem ter borda lateral (border-l)
    const line = separator.querySelector("div");
    expect(line?.className).toContain("border-l-2");
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
