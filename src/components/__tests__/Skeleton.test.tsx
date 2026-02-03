import { render } from "@testing-library/react";
import { Skeleton, SkeletonLine, SkeletonAvatar, SkeletonCard } from "../Skeleton";

describe("Skeleton", () => {
  it("deve aplicar estilos base e animação", () => {
    const { container } = render(<Skeleton w="100px" h="20px" />);
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

  it("Avatar deve ter classes de tamanho e variante", () => {
    const { container } = render(<SkeletonAvatar size="lg" variant="warning" />);
    const element = container.firstChild as HTMLElement;

    expect(element.className).toContain("w-16 h-16");
    expect(element.className).toContain("border-warning/30");
  });

  it("Card deve renderizar linhas corretas e aplicar System Props", () => {
    // Testando System Prop 'mt' (margin-top) no SkeletonCard
    const { container } = render(<SkeletonCard variant="secondary" lines={2} mt={8} />);

    // O container do card deve ter a borda da variante
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border-secondary/30");

    // Verifica se a margem foi aplicada via style
    expect(card).toHaveStyle({ marginTop: "2rem" });

    // Deve conter Skeletons filhos (Título + 2 Linhas = 3)
    const pulses = container.querySelectorAll(".animate-pulse");
    expect(pulses.length).toBe(3);
  });

  it("Card não deve renderizar título se hasTitle for false", () => {
    const { container } = render(<SkeletonCard hasTitle={false} lines={1} />);
    const pulses = container.querySelectorAll(".animate-pulse");
    // Apenas 1 linha de corpo
    expect(pulses.length).toBe(1);
  });
});
