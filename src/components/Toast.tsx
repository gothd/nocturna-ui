"use client";

import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import React, { forwardRef, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";
import { Progress } from "./Progress";

export interface ToastProps
  extends Omit<SystemProps, "as">, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /** ID único gerado automaticamente pelo Provider. */
  id: string;
  /** Título principal da notificação. */
  title: string;
  /** Descrição detalhada opcional. */
  description?: string;
  /**
   * Define o tema visual.
   * @default "void"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";
  /**
   * Define o ícone semântico.
   * @default "info"
   */
  type?: "info" | "success" | "warning" | "error";
  /**
   * Tempo em ms para fechar automaticamente.
   * Use `0` para persistir até o usuário fechar.
   * @default 5000
   */
  duration?: number;
  /** Callback interno de fechamento. */
  onClose: (id: string) => void;
}

export type ToastType = Required<ToastProps>["type"];
export type ToastVariant = Required<ToastProps>["variant"];

const typeToVariantMap: Record<ToastType, ToastVariant> = {
  info: "primary", // Info -> Branco
  success: "secondary", // Success -> Verde
  warning: "warning", // Warning -> Amarelo
  error: "danger", // Error -> Vermelho
};

const iconMap: Record<ToastType, React.ReactNode> = {
  info: <Info size={20} strokeWidth={1.5} />,
  success: <CheckCircle size={20} strokeWidth={1.5} />,
  warning: <AlertTriangle size={20} strokeWidth={1.5} />,
  error: <XCircle size={20} strokeWidth={1.5} />,
};

/**
 * Componente de notificação flutuante (Toast).
 * Normalmente invocado via hook `useToast()`.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id,
      title,
      description,
      type = "info",
      variant,
      duration = 5000,
      onClose,
      className,
      ...props
    },
    ref,
  ) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const { systemStyle, domProps } = extractSystemStyles(props);

    // Determina a variante final: Se o usuário passou 'variant', usa ela.
    // Senão, usa a variante mapeada pelo 'type'.
    const activeVariant = variant || typeToVariantMap[type];

    const variantStyles = {
      primary: "border-primary text-primary shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
      secondary: "border-secondary text-secondary shadow-[8px_8px_0px_0px_rgba(0,255,65,0.2)]",
      accent: "border-accent text-accent shadow-[8px_8px_0px_0px_rgba(255,0,127,0.2)]",
      danger: "border-danger text-danger shadow-[8px_8px_0px_0px_rgba(220,38,38,0.3)]",
      warning: "border-warning text-warning shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]",
    };

    const closeButtonStyles = {
      primary: "text-zinc-500 hover:text-primary",
      secondary: "text-zinc-500 hover:text-secondary",
      accent: "text-zinc-500 hover:text-accent",
      danger: "text-zinc-500 hover:text-danger",
      warning: "text-zinc-500 hover:text-warning",
    };

    // Lógica de Auto-Dismiss com Pause on Hover
    useEffect(() => {
      if (duration === 0 || isPaused) return;

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }, [duration, isPaused]);

    const handleClose = () => {
      setIsExiting(true);
      // Aguarda a animação de saída (300ms) antes de remover do DOM
      setTimeout(() => onClose(id), 300);
    };

    return (
      <div
        ref={ref}
        role={type === "error" ? "alert" : "status"}
        aria-live={type === "error" ? "assertive" : "polite"}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={cn(
          "pointer-events-auto relative w-full max-w-sm overflow-hidden border-2 bg-black p-4 shadow-xl transition-all duration-300",
          variantStyles[activeVariant],
          // Animations (Slide In / Fade Out)
          isExiting
            ? "translate-x-full opacity-0" // Saída
            : "animate-in slide-in-from-right-full fade-in duration-300", // Entrada
          className,
        )}
        style={systemStyle}
        {...domProps}
      >
        <div className="flex items-start gap-4 mb-3">
          <span className="shrink-0 mt-0.5 text-current">{iconMap[type]}</span>

          <div className="flex-1 space-y-1">
            <h4 className="font-serif text-sm uppercase tracking-widest leading-none text-current">
              {title}
            </h4>
            {description && (
              <p className="text-zinc-500 text-xs font-sans leading-relaxed">{description}</p>
            )}
          </div>

          <button
            onClick={handleClose}
            className={cn(
              "shrink-0 transition-opacity duration-200 focus:outline-none",
              closeButtonStyles[activeVariant],
              "opacity-70 hover:opacity-100",
            )}
            aria-label="Fechar notificação"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Barra de progresso opcional para indicar tempo (Visual Flair) */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 w-full">
            <Progress
              mode="timer"
              duration={duration}
              variant={activeVariant}
              paused={isPaused}
              className="h-[2px] border-none shadow-none" // Override para ficar fininho
            />
          </div>
        )}
      </div>
    );
  },
);

Toast.displayName = "Toast";
