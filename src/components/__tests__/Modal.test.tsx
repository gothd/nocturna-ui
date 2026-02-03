import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../Modal";

describe("Modal", () => {
  it("não deve renderizar nada se isOpen for false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Título">
        Conteúdo
      </Modal>,
    );
    expect(screen.queryByText("Título")).not.toBeInTheDocument();
  });

  it("deve renderizar e bloquear o scroll do body quando aberto", async () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Título Modal">
        <p>Conteúdo</p>
      </Modal>,
    );

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("deve aplicar estilos da variante ghost", async () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Ghost Mode" variant="ghost">
        Conteúdo
      </Modal>,
    );

    const dialog = await screen.findByRole("dialog");
    // Variante ghost tem bg-zinc-950/90
    expect(dialog.className).toContain("bg-zinc-950/90");
    expect(dialog.className).toContain("border-zinc-800");
    expect(dialog.className).toContain("shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]");
  });

  it("deve aplicar System Props ao container", async () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Styled"
        p={0} // Remove padding interno
        data-testid="styled-modal"
      >
        Conteúdo
      </Modal>,
    );

    const dialog = await screen.findByTestId("styled-modal");
    expect(dialog.style.padding).toBe("0px");
  });

  it("deve chamar onClose ao pressionar ESC", async () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Teste">
        Conteúdo
      </Modal>,
    );

    await screen.findByRole("dialog");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
