import { render, screen } from "@testing-library/react";
import { Separator } from "../Separator";

describe("Separator", () => {
  it("deve renderizar horizontalmente por padrão", () => {
    render(<Separator data-testid="sep" />);
    const separator = screen.getByTestId("sep");

    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    expect(separator.className).toContain("flex-row");
    expect(separator.className).toContain("w-full");

    // Verifica se a linha interna tem borda superior (border-t)
    const line = separator.firstElementChild;
    expect(line?.className).toContain("border-t-2");
  });

  it("deve renderizar verticalmente quando orientation='vertical'", () => {
    render(<Separator orientation="vertical" data-testid="sep-vert" />);
    const separator = screen.getByTestId("sep-vert");

    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator.className).toContain("flex-col");
    expect(separator.className).toContain("h-full");

    // Verifica se a linha interna tem borda lateral (border-l)
    const line = separator.firstElementChild;
    expect(line?.className).toContain("border-l-2");
  });

  it("deve renderizar label e aplicar cores da variante accent", () => {
    render(<Separator label="Seção A" variant="accent" />);

    const label = screen.getByText("Seção A");
    expect(label).toBeInTheDocument();
    expect(label.className).toContain("text-accent");

    // A linha deve ter a cor accent
    const separator = label.parentElement;
    const line = separator?.firstElementChild;
    expect(line?.className).toContain("border-t-accent"); // ou border-l-accent
  });

  it("deve aplicar System Props (margem)", () => {
    render(<Separator my={8} data-testid="sep-margin" />);
    const separator = screen.getByTestId("sep-margin");
    expect(separator).toHaveStyle({ marginTop: "2rem", marginBottom: "2rem" });
  });

  it("deve suportar polimorfismo", () => {
    render(<Separator as="li" data-testid="sep-li" />);
    const element = screen.getByTestId("sep-li");
    expect(element.tagName).toBe("LI");
  });
});
