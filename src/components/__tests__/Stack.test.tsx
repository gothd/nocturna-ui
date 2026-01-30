import { render, screen } from "@testing-library/react";
import { Stack, VStack, HStack } from "../Stack";

describe("Stack System", () => {
  it("Stack deve renderizar verticalmente por padrão", () => {
    render(<Stack data-testid="stack" />);
    const element = screen.getByTestId("stack");
    expect(element.className).toContain("flex-col");
  });

  it("VStack deve ser coluna e HStack deve ser linha", () => {
    render(
      <>
        <VStack data-testid="vstack" />
        <HStack data-testid="hstack" />
      </>,
    );
    expect(screen.getByTestId("vstack").className).toContain("flex-col");
    expect(screen.getByTestId("hstack").className).toContain("flex-row");
    expect(screen.getByTestId("hstack").className).toContain("items-center"); // Default align
  });

  it("deve aplicar variantes visuais (border/shadow)", () => {
    render(<Stack variant="primary" data-testid="variant-stack" />);
    const element = screen.getByTestId("variant-stack");
    expect(element.className).toContain("border-primary");
    expect(element.className).toContain("shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]");
  });

  it("deve injetar separadores automaticamente quando dividers=true", () => {
    render(
      <Stack dividers data-testid="stack-dividers">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>,
    );

    // 3 itens + 2 separadores = 5 filhos diretos
    const stack = screen.getByTestId("stack-dividers");
    expect(stack.children).toHaveLength(5);

    // Verifica se os elementos injetados são separadores
    const separators = screen.getAllByRole("separator");
    expect(separators).toHaveLength(2);
  });

  it("HStack deve injetar separadores verticais", () => {
    render(
      <HStack dividers>
        <div>A</div>
        <div>B</div>
      </HStack>,
    );

    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });
});
