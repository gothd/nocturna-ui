import { render, screen } from "@testing-library/react";
import { Flex } from "../Flex";

describe("Flex", () => {
  it("deve ter display: flex e classes padrão", () => {
    render(<Flex data-testid="flex">Item</Flex>);
    const element = screen.getByTestId("flex");
    expect(element.className).toContain("flex");
    expect(element.className).toContain("flex-row"); // Default direction
  });

  it("deve mapear props de alinhamento para classes", () => {
    render(
      <Flex
        align="center"
        justify="between"
        direction="column"
        wrap="wrap"
        data-testid="layout-flex"
      />,
    );
    const element = screen.getByTestId("layout-flex");

    expect(element.className).toContain("items-center");
    expect(element.className).toContain("justify-between");
    expect(element.className).toContain("flex-col");
    expect(element.className).toContain("flex-wrap");
  });

  it("deve aplicar gap via style inline (segurança contra purge)", () => {
    render(<Flex gap={4} data-testid="gap-flex" />);
    const element = screen.getByTestId("gap-flex");
    expect(element).toHaveStyle({ gap: "1rem" });
  });
});
