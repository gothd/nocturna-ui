"use client";

import React, { forwardRef, useId, useState } from "react";
import { extractSystemStyles, SystemProps } from "../utils/system";
import { cn } from "../utils/cn";

interface TooltipProps
  extends Omit<SystemProps, "as">, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
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
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";

  /**
   * Posição do tooltip em relação ao elemento filho.
   * @default "top"
   */
  position?: "top" | "bottom" | "left" | "right";

  /**
   * Atraso em milissegundos antes de mostrar o tooltip.
   * @default 200
   */
  delay?: number;
}

/**
 * Tooltip minimalista com estética rúnica.
 *
 * **Features:**
 * - **Acessibilidade:** Gerencia `aria-describedby` automaticamente via `useId`.
 * - **Interação:** Ativa via Mouse (Hover) e Teclado (Focus).
 * - **Animação:** Fade e Scale sutis na entrada/saída.
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    { content, children, variant = "primary", position = "top", delay = 200, className, ...props },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipId = useId(); // Garante ID único para acessibilidade
    const timerRef = React.useRef<NodeJS.Timeout>();
    const { systemStyle, domProps } = extractSystemStyles(props);
    // Handlers unificados para Mouse e Teclado
    const show = () => {
      timerRef.current = setTimeout(() => setIsVisible(true), delay);
    };
    const hide = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsVisible(false);
    };

    const variantStyles = {
      primary:
        "bg-black border-primary text-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
      secondary:
        "bg-black border-secondary text-secondary shadow-[4px_4px_0px_0px_rgba(0,255,65,0.2)]",
      accent: "bg-black border-accent text-accent shadow-[4px_4px_0px_0px_rgba(255,0,127,0.2)]",
      danger: "bg-black border-danger text-danger shadow-[4px_4px_0px_0px_rgba(220,38,38,0.2)]",
      warning: "bg-black border-warning text-warning shadow-[4px_4px_0px_0px_rgba(255,215,0,0.2)]",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show} // Acessibilidade via teclado
        onBlur={hide}
        aria-describedby={isVisible ? tooltipId : undefined}
        style={systemStyle}
        {...domProps}
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
            // Styles
            variantStyles[variant],
          )}
        >
          {content}
        </div>
      </div>
    );
  },
);

Tooltip.displayName = "Tooltip";
