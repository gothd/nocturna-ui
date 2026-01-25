import { act, render, screen } from "@testing-library/react";
import { Button } from "../Button";
import { ToastProvider, useToast } from "../../providers/ToastProvider";

// Componente auxiliar para disparar toasts com opções
const TestComponent = () => {
  const { toast } = useToast();
  return (
    <div>
      <Button onClick={() => toast({ title: "Success", type: "success" })}>Success Toast</Button>
      <Button onClick={() => toast({ title: "Error", type: "error" })}>Error Toast</Button>
    </div>
  );
};

describe("Toast System", () => {
  it("deve renderizar um toast de sucesso com estilo secondary (verde)", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    await act(async () => {
      screen.getByText("Success Toast").click();
    });

    const toast = await screen.findByText("Success");
    const container = toast.closest("div[role='status']");

    expect(toast).toBeInTheDocument();
    // Success -> Secondary variant -> Text Secondary (Green)
    expect(container?.className).toContain("text-secondary");
    expect(container?.className).toContain("border-secondary");
  });

  it("deve renderizar um toast de erro com estilo danger (vermelho)", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    await act(async () => {
      screen.getByText("Error Toast").click();
    });

    const toast = await screen.findByText("Error");
    const container = toast.closest("div[role='alert']");

    expect(container?.className).toContain("text-danger");
    expect(container?.className).toContain("border-danger");
  });
});
