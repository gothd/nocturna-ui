import { act, render, screen } from "@testing-library/react";
import { VoidButton } from "../../components/Button";
import { OmenToastProvider, useToast } from "../../providers/ToastProvider";

// Componente auxiliar para testar o hook
const TestComponent = () => {
  const { toast } = useToast();
  return (
    <VoidButton
      onClick={() => toast({ title: "Teste", description: "Funcionou" })}
    >
      Disparar
    </VoidButton>
  );
};

describe("Toast System", () => {
  it("deve adicionar um toast ao clicar", async () => {
    render(
      <OmenToastProvider>
        <TestComponent />
      </OmenToastProvider>,
    );

    const button = screen.getByText("Disparar");

    // Dispara a ação
    await act(async () => {
      button.click();
    });

    // Procura pelo Toast na tela (baseado no Título)
    expect(await screen.findByText("Teste")).toBeInTheDocument();
    expect(screen.getByText("Funcionou")).toBeInTheDocument();
  });
});
