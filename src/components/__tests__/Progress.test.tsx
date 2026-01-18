import { render, screen } from "@testing-library/react";
import { VesselProgress } from "../Progress";

describe("VesselProgress", () => {
  it("deve calcular a largura correta baseada no valor", () => {
    render(<VesselProgress value={50} max={100} label="Loading" />);

    expect(screen.getByText("Loading")).toBeInTheDocument();
    const progressBar = screen.getByRole("progressbar")
      .firstChild as HTMLElement;
    expect(progressBar).toHaveStyle({ width: "50%" });
  });

  it("deve renderizar a porcentagem quando showValue é true", () => {
    render(<VesselProgress value={75} showValue />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("deve limitar o valor entre 0 e 100", () => {
    render(<VesselProgress value={150} showValue />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    render(<VesselProgress value={-20} showValue />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});
