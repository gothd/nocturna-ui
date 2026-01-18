import { render, screen, fireEvent } from "@testing-library/react";
import { CryptModal } from "../Modal";

describe("CryptModal", () => {
  it("não deve renderizar nada se isOpen for false", () => {
    render(<CryptModal isOpen={false} onClose={() => {}} title="Título" />);

    expect(screen.queryByText("Título")).not.toBeInTheDocument();
  });

  it("deve renderizar no portal (body) quando isOpen for true", () => {
    render(
      <CryptModal isOpen={true} onClose={() => {}} title="Título Modal">
        <p>Conteúdo Modal</p>
      </CryptModal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Título Modal")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo Modal")).toBeInTheDocument();
  });

  it("deve chamar onClose ao clicar no botão de fechar (X)", () => {
    const handleClose = jest.fn();
    render(<CryptModal isOpen={true} onClose={handleClose} title="Teste" />);

    const closeButton = screen.getByLabelText("Fechar modal");
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
