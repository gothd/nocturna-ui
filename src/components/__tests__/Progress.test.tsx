import { render, screen } from "@testing-library/react";
import { Progress } from "../Progress";

describe("Progress", () => {
  it("deve calcular a largura correta e aplicar estilo padrão", () => {
    render(<Progress value={50} max={100} label="Loading" />);

    expect(screen.getByText("Loading")).toBeInTheDocument();

    // A role progressbar fica no container interno da barra (div)
    // Mas o estilo width fica na div filha direta dele (o fill)
    const container = screen.getByRole("progressbar");
    const fill = container.firstElementChild as HTMLElement;

    expect(fill).toHaveStyle({ width: "50%" });
    expect(fill.className).toContain("bg-primary");
  });

  it("deve aplicar a cor da variante secondary", () => {
    render(<Progress value={30} variant="secondary" />);
    const container = screen.getByRole("progressbar");
    const fill = container.firstElementChild as HTMLElement;
    expect(fill.className).toContain("bg-secondary");
  });

  it("deve renderizar a porcentagem quando showValue é true", () => {
    render(<Progress value={75} showValue />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("deve aplicar animação no modo indeterminate e remover aria-valuenow", () => {
    render(<Progress mode="indeterminate" variant="accent" />);
    const container = screen.getByRole("progressbar");
    const fill = container.firstElementChild as HTMLElement;

    expect(fill.className).toContain("animate-pulse");
    // Indeterminate não deve ter valor numérico fixo para leitores
    expect(container).not.toHaveAttribute("aria-valuenow");
  });

  it("deve aplicar System Props ao container raiz", () => {
    // mt=4 (1rem) e w="50%"
    render(<Progress value={10} mt={4} w="50%" data-testid="progress-root" />);

    const root = screen.getByTestId("progress-root");
    expect(root).toHaveStyle({ marginTop: "1rem" });
    expect(root).toHaveStyle({ width: "50%" });
  });
});
