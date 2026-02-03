import { act, render, screen } from "@testing-library/react";
import { ToastProvider, useToast } from "../../providers/ToastProvider";
import { Button } from "../Button";

// Componente auxiliar para disparar toasts
const TestComponent = () => {
  const { toast } = useToast();
  return (
    <div>
      <Button onClick={() => toast({ title: "Success", type: "success" })}>Success Toast</Button>
      <Button onClick={() => toast({ title: "Error", type: "error" })}>Error Toast</Button>
      <Button onClick={() => toast({ title: "Custom", variant: "accent", type: "info" })}>
        Custom Variant
      </Button>
    </div>
  );
};

describe("Toast System", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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
    // Success -> Secondary variant -> Text Secondary (Verde)
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
    // Error -> Role Alert
    const container = toast.closest("div[role='alert']");

    expect(container?.className).toContain("text-danger");
    expect(container?.className).toContain("border-danger");
  });

  it("deve permitir sobrescrever a variante manualmente", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    await act(async () => {
      screen.getByText("Custom Variant").click();
    });

    const toast = await screen.findByText("Custom");
    const container = toast.closest("div[role='status']");

    // Type info seria Primary, mas variant='accent' deve vencer
    expect(container?.className).toContain("text-accent");
    expect(container?.className).toContain("border-accent");
  });

  it("deve fechar automaticamente após o tempo", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    await act(async () => {
      screen.getByText("Success Toast").click();
    });

    expect(screen.getByText("Success")).toBeInTheDocument();

    // Avança o tempo (padrão 5000ms)
    await act(async () => {
      jest.advanceTimersByTime(5500);
    });

    expect(screen.queryByText("Success")).not.toBeInTheDocument();
  });
});
