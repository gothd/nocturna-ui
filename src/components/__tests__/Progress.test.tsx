import { render, screen } from "@testing-library/react";
import { Progress } from "../Progress";

describe("Progress", () => {
  it("deve calcular a largura correta e aplicar estilo padrão", () => {
    render(<Progress value={50} max={100} label="Loading" />);

    expect(screen.getByText("Loading")).toBeInTheDocument();
    const progressBar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(progressBar).toHaveStyle({ width: "50%" });
    // Default variant é primary (branco/preto)
    expect(progressBar.className).toContain("bg-primary");
  });

  it("deve aplicar a cor da variante secondary", () => {
    render(<Progress value={30} variant="secondary" />);
    const progressBar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(progressBar.className).toContain("bg-secondary");
  });

  it("deve renderizar a porcentagem quando showValue é true", () => {
    render(<Progress value={75} showValue />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("deve aplicar animação no modo indeterminate", () => {
    render(<Progress mode="indeterminate" variant="accent" />);
    const progressBar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(progressBar.className).toContain("animate-pulse");
    expect(progressBar.className).toContain("bg-accent");
  });
});
