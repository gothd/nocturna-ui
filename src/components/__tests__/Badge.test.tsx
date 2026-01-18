import { render, screen } from "@testing-library/react";
import { SigilBadge } from "../Badge";

describe("SigilBadge", () => {
  it("deve renderizar o children corretamente", () => {
    render(<SigilBadge>Status</SigilBadge>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("deve aplicar classes da variante blood", () => {
    render(<SigilBadge variant="blood">Blood</SigilBadge>);
    const badge = screen.getByText("Blood");
    expect(badge.className).toContain("text-red-600");
  });

  it("deve aplicar estilo solid", () => {
    render(
      <SigilBadge styleType="solid" variant="void">
        Solid
      </SigilBadge>,
    );
    const badge = screen.getByText("Solid");
    expect(badge.className).toContain("bg-white");
    expect(badge.className).toContain("text-black");
  });
});
