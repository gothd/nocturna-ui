import React from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { cn } from "../utils/cn";
import { getSize } from "../utils/tokens";
import { Box, BoxProps } from "./Box";

export interface GridProps extends BoxProps {
  /**
   * Define as colunas do grid (grid-template-columns).
   * @example templateColumns="repeat(3, 1fr)"
   */
  templateColumns?: string;

  /**
   * Define as linhas do grid (grid-template-rows).
   * @example templateRows="200px 1fr"
   */
  templateRows?: string;

  /**
   * Espaçamento entre itens (Gap).
   * Aceita tokens numéricos da escala ou valores CSS.
   */
  gap?: number | string;

  /** Espaçamento vertical entre linhas. */
  rowGap?: number | string;

  /** Espaçamento horizontal entre colunas. */
  columnGap?: number | string;

  /**
   * Fluxo automático do grid.
   * @default "row"
   */
  autoFlow?: "row" | "column" | "row dense" | "column dense";

  /**
   * Alinhamento dos itens no eixo do bloco (align-items).
   */
  align?: "start" | "center" | "end" | "baseline" | "stretch";

  /**
   * Alinhamento dos itens no eixo da linha (justify-items).
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";

  /**
   * Aplica o tema visual Cyber Goth ao container.
   * Útil para criar "painéis de grade" contidos.
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";
}

/**
 * **Grid** é um container de layout bidimensional.
 * * Permite posicionar itens em linhas e colunas com precisão.
 * Suporta tokens de espaçamento e variantes visuais da Nocturna UI.
 */
export const Grid: PolymorphicComponent<GridProps> = React.forwardRef<any, GridProps>(
  (
    {
      templateColumns,
      templateRows,
      gap,
      rowGap,
      columnGap,
      autoFlow,
      align,
      justify,
      variant = "ghost",
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    // Variantes Visuais (Idênticas ao Stack para consistência)
    const variantStyles = {
      ghost: "",
      primary:
        "border-2 border-primary bg-black p-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
      secondary:
        "border-2 border-secondary bg-black p-4 shadow-[4px_4px_0px_0px_rgba(0,255,65,0.2)]",
      accent: "border-2 border-accent bg-black p-4 shadow-[4px_4px_0px_0px_rgba(255,0,127,0.2)]",
      danger: "border-2 border-danger bg-black p-4 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.2)]",
      warning: "border-2 border-warning bg-black p-4 shadow-[4px_4px_0px_0px_rgba(255,215,0,0.2)]",
    };
    // Classes estáticas (Layout behavior)
    const staticClasses = cn(
      "grid",
      {
        "items-start": align === "start",
        "items-center": align === "center",
        "items-end": align === "end",
        "items-baseline": align === "baseline",
        "items-stretch": align === "stretch",
        "justify-start": justify === "start",
        "justify-center": justify === "center",
        "justify-end": justify === "end",
        "justify-between": justify === "between",
        "justify-around": justify === "around",
        "justify-evenly": justify === "evenly",
      },
      className,
    );

    return (
      <Box
        ref={ref}
        className={cn(variantStyles[variant], staticClasses)}
        style={{
          gridTemplateColumns: templateColumns,
          gridTemplateRows: templateRows,
          gap: getSize(gap),
          rowGap: getSize(rowGap),
          columnGap: getSize(columnGap),
          gridAutoFlow: autoFlow,
          ...style,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Grid.displayName = "Grid";
