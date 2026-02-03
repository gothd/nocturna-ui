import React, { forwardRef } from "react";
import { extractSystemStyles, SystemProps } from "../utils/system";
import { cn } from "../utils/cn";

interface ScrollProps
  extends Omit<SystemProps, "as">, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Conteúdo que será rolado.
   * Deve exceder a altura definida em `maxHeight` para ativar a rolagem.
   */
  children: React.ReactNode;

  /**
   * Define o tema visual da barra de rolagem.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";

  /**
   * Define a direção da rolagem.
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal" | "both";

  /**
   * Se verdadeiro, oculta visualmente a barra de rolagem mantendo a funcionalidade.
   */
  hideScrollbar?: boolean;
}

/**
 * Container de rolagem com scrollbar customizada cross-browser (Webkit & Firefox).
 *
 * **Features:**
 * - Acessível via teclado (`tabindex="0"` permite foco e uso das setas).
 * - Estilização profunda de scrollbar para manter a imersão gótica.
 * - Suporte a conteúdo dinâmico.
 */
export const Scroll = forwardRef<HTMLDivElement, ScrollProps>(
  (
    { variant = "primary", orientation = "vertical", hideScrollbar, className, children, ...props },
    ref,
  ) => {
    const { systemStyle, domProps } = extractSystemStyles(props);

    const orientationStyles = {
      vertical: "overflow-y-auto overflow-x-hidden h-full pr-2",
      horizontal: "overflow-x-auto overflow-y-hidden w-full pb-2",
      both: "overflow-auto w-full h-full pr-2 pb-2",
    };

    const scrollbarVariants = {
      primary: [
        "[&::-webkit-scrollbar-track]:border-zinc-800",
        "[&::-webkit-scrollbar-thumb]:bg-white",
        "[&::-webkit-scrollbar-thumb]:hover:bg-zinc-400",
        "[scrollbar-color:white_black]",
      ],
      secondary: [
        "[&::-webkit-scrollbar-track]:border-secondary/20",
        "[&::-webkit-scrollbar-thumb]:bg-secondary",
        "[&::-webkit-scrollbar-thumb]:hover:bg-secondary/80",
        "[scrollbar-color:#00FF41_black]",
      ],
      accent: [
        "[&::-webkit-scrollbar-track]:border-accent/20",
        "[&::-webkit-scrollbar-thumb]:bg-accent",
        "[&::-webkit-scrollbar-thumb]:hover:bg-accent/80",
        "[scrollbar-color:#FF007F_black]",
      ],
      danger: [
        "[&::-webkit-scrollbar-track]:border-danger/20",
        "[&::-webkit-scrollbar-thumb]:bg-danger",
        "[&::-webkit-scrollbar-thumb]:hover:bg-danger/80",
        "[scrollbar-color:#DC2626_black]",
      ],
      warning: [
        "[&::-webkit-scrollbar-track]:border-warning/20",
        "[&::-webkit-scrollbar-thumb]:bg-warning",
        "[&::-webkit-scrollbar-thumb]:hover:bg-warning/80",
        "[scrollbar-color:#FFD700_black]",
      ],
    };

    return (
      <div
        ref={ref}
        // tabindex=0 permite que usuários de teclado foquem na área para rolar com setas
        tabIndex={0}
        className={cn(
          "focus:outline-none focus:ring-1 focus:ring-zinc-800",

          // --- CONFIGURAÇÃO BASE DA SCROLLBAR (WEBKIT) ---
          "[&::-webkit-scrollbar]:w-2",
          "[&::-webkit-scrollbar]:h-2",
          "[&::-webkit-scrollbar-track]:bg-black",
          "[&::-webkit-scrollbar-track]:border",
          "[&::-webkit-scrollbar-corner]:bg-black",
          "[&::-webkit-scrollbar-thumb]:border-none",
          "[&::-webkit-scrollbar-thumb]:transition-colors",

          // --- FIREFOX SUPPORT (Via propriedades CSS padrão) ---
          "scrollbar-thin", // Define a largura fina no Firefox
          // --- VARIANTES ---
          orientationStyles[orientation],
          scrollbarVariants[variant],
          hideScrollbar && "scrollbar-none",
          className,
        )}
        style={systemStyle}
        {...domProps}
      >
        {children}
      </div>
    );
  },
);

Scroll.displayName = "Scroll";
