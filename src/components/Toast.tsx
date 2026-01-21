"use client";

import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import React, { forwardRef, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { VesselProgress } from "./Progress";

export type ToastVariant = "void" | "blood";
export type ToastType = "info" | "success" | "warning" | "error";

export interface OmenToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ID único gerado automaticamente pelo Provider. */
  id: string;
  /** Título principal da notificação. */
  title: string;
  /** Descrição detalhada opcional. */
  description?: string;
  /**
   * Define o tema visual.
   * - `void`: Padrão monocromático.
   * - `blood`: Tema avermelhado.
   * @default "void"
   */
  variant?: "void" | "blood";
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
export const OmenToast = forwardRef<HTMLDivElement, OmenToastProps>(
  (
    {
      id,
      title,
      description,
      variant = "void",
      type = "info",
      duration = 5000,
      onClose,
      className,
      ...props
    },
    ref,
  ) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

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
          // Variants
          variant === "void" ? "border-white" : "border-red-900",
          // Shadows (Hard)
          variant === "void"
            ? "shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
            : "shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
          // Animations (Slide In / Fade Out)
          isExiting
            ? "translate-x-full opacity-0" // Saída
            : "animate-in slide-in-from-right-full fade-in duration-300", // Entrada
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-4 mb-3">
          <span
            className={cn(
              "shrink-0 mt-0.5",
              variant === "void" ? "text-white" : "text-red-600",
            )}
          >
            {iconMap[type]}
          </span>

          <div className="flex-1 space-y-1">
            <h4
              className={cn(
                "font-serif text-sm uppercase tracking-widest leading-none",
                variant === "void" ? "text-white" : "text-red-600",
              )}
            >
              {title}
            </h4>
            {description && (
              <p className="text-zinc-500 text-xs font-sans leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={handleClose}
            className={cn(
              "shrink-0 transition-opacity duration-200 hover:opacity-70 focus:outline-none",
              variant === "void"
                ? "text-zinc-400 hover:text-white"
                : "text-red-800 hover:text-red-600",
            )}
            aria-label="Fechar notificação"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Barra de progresso opcional para indicar tempo (Visual Flair) */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 w-full">
            <VesselProgress
              mode="timer"
              duration={duration}
              variant={variant}
              paused={isPaused}
              className="h-[2px] border-none shadow-none" // Override para ficar fininho
            />
          </div>
        )}
      </div>
    );
  },
);

OmenToast.displayName = "OmenToast";
