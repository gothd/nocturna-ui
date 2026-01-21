"use client";

import React, { forwardRef, useId, useState } from "react";
import { cn } from "../utils/cn";

interface RuneTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * O texto ou conteúdo a ser exibido dentro do tooltip.
   */
  content: string;

  /**
   * O elemento que dispara o tooltip (gatilho).
   * Deve ser um elemento interativo ou focado para garantir acessibilidade.
   */
  children: React.ReactNode;

  /**
   * Define o tema visual.
   * - `void`: Padrão monocromático (Branco/Preto).
   * - `blood`: Tema avermelhado (Vermelho/Preto).
   * @default "void"
   */
  variant?: "void" | "blood";

  /**
   * Posição do tooltip em relação ao elemento filho.
   * @default "top"
   */
  position?: "top" | "bottom" | "left" | "right";
}

/**
 * Tooltip minimalista com estética rúnica.
 *
 * **Features:**
 * - **Acessibilidade:** Gerencia `aria-describedby` automaticamente via `useId`.
 * - **Interação:** Ativa via Mouse (Hover) e Teclado (Focus).
 * - **Animação:** Fade e Scale sutis na entrada/saída.
 */
export const RuneTooltip = forwardRef<HTMLDivElement, RuneTooltipProps>(
  (
    {
      content,
      children,
      variant = "void",
      position = "top",
      className,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipId = useId(); // Garante ID único para acessibilidade

    // Handlers unificados para Mouse e Teclado
    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show} // Acessibilidade via teclado
        onBlur={hide}
        aria-describedby={isVisible ? tooltipId : undefined}
        {...props}
      >
        {children}

        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 border-2 px-3 py-2 whitespace-nowrap transition-all duration-200 pointer-events-none",
            "font-sans text-xs font-medium",

            // Positioning Logic
            position === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
            position === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
            position === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
            position === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",

            // Animation State
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",

            // Variant Styles (Void)
            variant === "void" && [
              "bg-black border-white text-white",
              "shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
            ],

            // Variant Styles (Blood)
            variant === "blood" && [
              "bg-black border-red-900 text-red-600",
              "shadow-[4px_4px_0px_0px_rgba(136,8,8,0.3)]",
            ],
          )}
        >
          {content}
        </div>
      </div>
    );
  },
);

RuneTooltip.displayName = "RuneTooltip";
