import { render, screen } from "@testing-library/react";
import { Text } from "../Text";
import { Heading } from "../Heading";

describe("Typography", () => {
  it("Text deve aplicar fontFamily e weight via style inline", () => {
    render(
      <Text fontFamily="mono" fontWeight="bold" data-testid="text">
        Code
      </Text>,
    );
    const element = screen.getByTestId("text");

    // Verificação via Regex: Ignora problemas de aspas escapadas (&quot;)
    expect(element.style.fontFamily).toMatch(/JetBrains Mono/);
    expect(element.style.fontWeight).toBe("700");
  });

  it("Heading deve ser serif e uppercase por padrão", () => {
    render(<Heading level="h1">Título</Heading>);
    const element = screen.getByRole("heading", { level: 1 });

    expect(element.tagName).toBe("H1");
    expect(element.className).toContain("uppercase");

    expect(element.style.fontFamily).toMatch(/Playfair Display/);
  });

  it("Heading deve aceitar override de props", () => {
    render(
      <Heading level="h2" color="accent" fontWeight="normal">
        Subtítulo
      </Heading>,
    );
    const element = screen.getByRole("heading", { level: 2 });

    // RGB é como os navegadores geralmente reportam cores hex via JS
    // Mas também podemos checar se o token foi convertido corretamente
    expect(element.style.color).toBe("rgb(255, 0, 127)"); // #FF007F
    expect(element.style.fontWeight).toBe("400"); // normal -> 400
  });
});
