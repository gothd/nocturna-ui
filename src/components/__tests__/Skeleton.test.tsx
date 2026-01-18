import { render } from "@testing-library/react";
import {
  SpectreSkeletonLine,
  SpectreSkeletonAvatar,
  SpectreSkeletonCard,
} from "../Skeleton";

describe("SpectreSkeleton", () => {
  it("Avatar deve ter classes de tamanho e animação", () => {
    const { container } = render(<SpectreSkeletonAvatar size="lg" />);
    // Verifica se renderizou a div com as classes esperadas
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.className).toContain("w-16 h-16"); // size lg
    expect(skeleton.className).toContain("animate-pulse");
  });

  it("Line deve aceitar largura customizada", () => {
    const { container } = render(<SpectreSkeletonLine width="50%" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({ width: "50%" });
  });

  it("Card deve renderizar título + linhas por padrão", () => {
    const { container } = render(<SpectreSkeletonCard lines={3} />);
    // 1 Título + 3 Linhas = 4 Skeletons
    const pulses = container.querySelectorAll(".animate-pulse");
    expect(pulses.length).toBe(4);
  });

  it("Card NÃO deve renderizar título se hasTitle=false", () => {
    const { container } = render(
      <SpectreSkeletonCard lines={3} hasTitle={false} />,
    );
    // 0 Título + 3 Linhas = 3 Skeletons
    const pulses = container.querySelectorAll(".animate-pulse");
    expect(pulses.length).toBe(3);
  });
});
