import React, { forwardRef } from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";

interface SeparatorProps extends SystemProps, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Define o tema visual das linhas e do texto.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";

  /**
   * Orientação do separador.
   * - `horizontal`: Cria uma linha de largura total (padrão).
   * - `vertical`: Cria uma linha de altura total (útil em Flex rows).
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Texto opcional exibido no centro do separador.
   * As linhas se ajustam automaticamente ao redor do texto.
   * Renderizado em uppercase e com espaçamento de letras estendido.
   */
  label?: string;
}

/**
 * Divisor visual com estética brutalista.
 * Cria uma linha horizontal (ou duas, se houver rótulo) para separar seções de conteúdo.
 */
export const Separator: PolymorphicComponent<SeparatorProps> = forwardRef<any, SeparatorProps>(
  (
    {
      as = "div",
      variant = "primary",
      orientation = "horizontal",
      label,
      fontFamily = "serif",
      uppercase = true,
      className,
      ...props
    },
    ref,
  ) => {
    const {
      as: Component,
      systemStyle,
      domProps,
    } = extractSystemStyles({ ...props, fontFamily, as });
    const isVertical = orientation === "vertical";

    // Styles
    const borderStyles = {
      primary: isVertical ? "border-l-primary" : "border-t-primary",
      secondary: isVertical ? "border-l-secondary" : "border-t-secondary",
      accent: isVertical ? "border-l-accent" : "border-t-accent",
      danger: isVertical ? "border-l-danger" : "border-t-danger",
      warning: isVertical ? "border-l-warning" : "border-t-warning",
    };

    const textStyles = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      danger: "text-danger",
      warning: "text-warning",
    };

    // Classes base condicionais
    const containerClasses = isVertical
      ? "flex-col h-full w-auto" // Vertical: Altura total
      : "flex-row w-full"; // Horizontal: Largura total

    const lineClasses = isVertical
      ? "border-l-2 h-full w-px" // Linha vertical
      : "border-t-2 w-full h-px"; // Linha horizontal

    const labelSpacing = isVertical ? "py-2" : "px-4";

    return (
      <Component
        ref={ref}
        role={!label ? "separator" : undefined} // Semântica: Se tem label, vira um container de grupo
        aria-orientation={orientation}
        className={cn(
          "relative flex items-center justify-center select-none opacity-80",
          containerClasses,
          uppercase && "uppercase",
          className,
        )}
        style={systemStyle}
        {...domProps}
      >
        {/* Linha 1 (Esquerda ou Topo) */}
        <div
          className={cn(
            "flex-grow transition-colors duration-300",
            lineClasses,
            borderStyles[variant],
          )}
        />

        {/* Rótulo Central */}
        {label && (
          <span
            className={cn("flex-none text-sm tracking-[0.2em]", labelSpacing, textStyles[variant])}
          >
            {label}
          </span>
        )}

        {/* Linha 2 (Direita ou Baixo) */}
        <div
          className={cn(
            "flex-grow transition-colors duration-300",
            lineClasses,
            borderStyles[variant],
          )}
        />
      </Component>
    );
  },
);

Separator.displayName = "Separator";
