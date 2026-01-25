import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../Modal";

describe("Modal", () => {
  it("não deve renderizar nada se isOpen for false", () => {
    render(<Modal isOpen={false} onClose={() => {}} title="Título" />);
    expect(screen.queryByText("Título")).not.toBeInTheDocument();
  });

  it("deve renderizar e bloquear o scroll do body quando aberto", async () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Título Modal">
        <p>Conteúdo</p>
      </Modal>,
    );

    // Aguarda o componente ser montado (efeito de hidratação)
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("deve liberar o scroll do body ao desmontar/fechar", async () => {
    const { unmount } = render(<Modal isOpen={true} onClose={() => {}} title="Título" />);

    // Aguarda montagem antes de desmontar
    await screen.findByRole("dialog");
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("unset");
  });

  it("deve aplicar estilos da variante warning", async () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Aviso" variant="warning" />);

    // Aguarda montagem
    await screen.findByRole("dialog");

    const titleElement = screen.getByText("Aviso");
    // O container pai (relative) é quem recebe a borda
    const modalContainer = titleElement.closest(".relative");

    expect(modalContainer).toHaveClass("border-warning");
  });

  it("deve chamar onClose ao pressionar ESC", async () => {
    const handleClose = jest.fn();
    render(<Modal isOpen={true} onClose={handleClose} title="Teste" />);

    // await findBy... aguarda o ciclo de 'mounted' terminar e o elemento aparecer.
    // Isso garante que os useEffects (incluindo o do addEventListener) já rodaram.
    // Sem isso, o evento é disparado antes do listener existir.
    await screen.findByRole("dialog");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
