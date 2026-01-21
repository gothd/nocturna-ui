"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  OmenToast,
  OmenToastProps,
  ToastType,
  ToastVariant,
} from "../components/Toast";

// Tipos para o Hook
export type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  type?: ToastType;
  duration?: number;
};

export interface ToastContextType {
  toast: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// Este componente é invisível. A única função dele é pegar o hook
// e expô-lo globalmente para uso fora do React (Vanilla JS)
const ToastGlobalBridge = () => {
  const { toast, dismiss, dismissAll } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined" && window.NocturnaUI) {
      // @ts-ignore
      window.NocturnaUI.toaster = {
        toast,
        dismiss,
        dismissAll,
      };
    }
  }, [toast, dismiss, dismissAll]);

  return null;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Hook para usar nos componentes
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um OmenToastProvider");
  }
  return context;
};

/**
 * Provider que gerencia a fila de Toasts.
 * Deve envolver a aplicação (geralmente no App.tsx ou layout raiz).
 */
export const OmenToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = useState<OmenToastProps[]>([]);

  // Adiciona um novo toast
  const toast = useCallback(
    ({
      title,
      description,
      variant = "void",
      type = "info",
      duration = 5000,
    }: ToastOptions) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [
        ...prev,
        { id, title, description, variant, type, duration, onClose: dismiss },
      ]);
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      <ToasterViewport toasts={toasts} />
      <ToastGlobalBridge />
    </ToastContext.Provider>
  );
};

// Componente interno que renderiza a lista no canto da tela
const ToasterViewport = ({ toasts }: { toasts: OmenToastProps[] }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Verificação de 'document' para segurança extra no SSR
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 w-full max-w-sm pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <OmenToast key={toast.id} {...toast} />
      ))}
    </div>,
    document.body,
  );
};
