import { render } from "@testing-library/react";
import { Skeleton, SkeletonLine, SkeletonAvatar, SkeletonCard } from "../Skeleton";

describe("Skeleton", () => {
  it("deve aplicar estilos base e animação", () => {
    const { container } = render(<Skeleton width="100px" height="20px" />);
    const element = container.firstChild as HTMLElement;

    expect(element.className).toContain("animate-pulse");
    expect(element.className).toContain("border-zinc-800"); // Default Primary
    expect(element).toHaveStyle({ width: "100px", height: "20px" });
  });

  it("deve aplicar cores da variante danger", () => {
    const { container } = render(<Skeleton variant="danger" />);
    const element = container.firstChild as HTMLElement;
    // Verifica se a borda e o fundo seguem o tema danger
    expect(element.className).toContain("border-danger/30");
    expect(element.className).toContain("bg-danger/10");
  });

  it("Line deve ter as classes de tamanho padrão", () => {
    const { container } = render(<SkeletonLine />);
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveStyle({ width: "100%", height: "1rem" });
  });

  it("Avatar deve ter classes de tamanho", () => {
    const { container } = render(<SkeletonAvatar size="lg" variant="accent" />);
    const element = container.firstChild as HTMLElement;

    expect(element.className).toContain("w-16 h-16");
    expect(element.className).toContain("border-accent/30");
  });

  it("Card deve renderizar a estrutura correta e herdar variantes", () => {
    const { container } = render(<SkeletonCard variant="secondary" lines={2} />);

    // O container do card deve ter a borda da variante
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border-secondary/30");

    // Deve conter Skeletons filhos (Título + 2 Linhas = 3)
    const pulses = container.querySelectorAll(".animate-pulse");
    expect(pulses.length).toBe(3);

    // Verifica se os filhos herdaram a variante (checando um deles)
    expect(pulses[0].className).toContain("border-secondary/30");
  });
});
