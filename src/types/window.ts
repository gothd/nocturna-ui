import { ToastContextType } from "../providers/ToastProvider";

declare global {
  interface Window {
    NocturnaUI?: {
      toaster: ToastContextType;
    };
  }
}

// Transforma o arquivo em módulo para o TS entender o escopo global
export {};
