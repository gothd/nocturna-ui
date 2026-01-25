import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("deve renderizar o children corretamente", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("deve aplicar classes da variante accent", () => {
    render(<Badge variant="accent">New</Badge>);
    const badge = screen.getByText("New");
    expect(badge.className).toContain("text-accent");
    expect(badge.className).toContain("border-accent");
  });

  it("deve aplicar estilo solid corretamente", () => {
    render(
      <Badge styleType="solid" variant="secondary">
        Success
      </Badge>,
    );
    const badge = screen.getByText("Success");
    expect(badge.className).toContain("bg-secondary");
    // No tema solid secondary, o texto é preto
    expect(badge.className).toContain("text-black");
  });

  it("deve aplicar tamanho small", () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = screen.getByText("Small");
    expect(badge.className).toContain("text-[10px]");
  });
});
