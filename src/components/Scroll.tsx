import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface ScrollProps extends React.HTMLAttributes<HTMLDivElement> {
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
   * Altura máxima do container antes de ativar a rolagem.
   * Aceita valores CSS válidos (ex: "400px", "50vh", 300).
   * @default "400px"
   */
  maxHeight?: string | number;
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
  ({ children, variant = "primary", maxHeight = "400px", className, style, ...props }, ref) => {
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
        style={{
          maxHeight,
          ...style,
        }}
        className={cn(
          "overflow-auto w-full pr-2 focus:outline-none focus:ring-1 focus:ring-zinc-800",

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
          scrollbarVariants[variant],

          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Scroll.displayName = "Scroll";
