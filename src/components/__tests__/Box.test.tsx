import { render, screen } from "@testing-library/react";
import { Box } from "../Box";

describe("Box", () => {
  it("deve renderizar como div por padrão", () => {
    render(<Box>Conteúdo</Box>);
    const element = screen.getByText("Conteúdo");
    expect(element.tagName).toBe("DIV");
  });

  it("deve suportar polimorfismo (as='span')", () => {
    render(<Box as="span">Span Box</Box>);
    const element = screen.getByText("Span Box");
    expect(element.tagName).toBe("SPAN");
  });

  it("deve aplicar estilos via props (token mapping)", () => {
    render(
      <Box
        bg="accent"
        color="black"
        p={4}
        m="auto"
        w="1/2"
        h="screen"
        fontSize="xl"
        data-testid="styled-box"
      />,
    );

    const element = screen.getByTestId("styled-box");

    // Verifica conversão de tokens para valores CSS reais
    expect(element).toHaveStyle({
      backgroundColor: "#FF007F", // Accent
      color: "#000000", // Black
      padding: "1rem", // p={4}
      margin: "auto",
      width: "50%", // w="1/2"
      height: "100vh", // h="screen"
      fontSize: "1.25rem", // xl
    });
  });

  it("deve aceitar valores CSS raw", () => {
    render(<Box w="100px" bg="#123456" data-testid="raw-box" />);
    const element = screen.getByTestId("raw-box");
    expect(element).toHaveStyle({ width: "100px", backgroundColor: "#123456" });
  });
});
