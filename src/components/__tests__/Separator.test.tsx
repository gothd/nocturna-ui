import { render, screen } from "@testing-library/react";
import { AbyssSeparator } from "../Separator";

describe("AbyssSeparator", () => {
  it("deve renderizar com label", () => {
    render(<AbyssSeparator label="Capítulo 1" />);
    expect(screen.getByText("Capítulo 1")).toBeInTheDocument();
  });

  it("deve ter role separator quando não tem label", () => {
    render(<AbyssSeparator />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
