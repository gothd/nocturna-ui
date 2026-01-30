import React from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { cn } from "../utils/cn";
import { getSize } from "../utils/tokens";
import { Box, BoxProps } from "./Box";

export interface FlexProps extends BoxProps {
  /**
   * Direção do eixo flexível.
   * @default "row"
   */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  /**
   * Alinhamento dos itens no eixo cruzado (align-items).
   * @default "stretch"
   */
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  /**
   * Distribuição dos itens no eixo principal (justify-content).
   * @default "start"
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Comportamento de quebra de linha (flex-wrap).
   * @default "nowrap"
   */
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  /**
   * Espaçamento entre os itens (gap).
   * Aceita números (escala tailwind) ou strings arbitrárias.
   */
  gap?: number | string;
}

/**
 * **Flex** é um container de layout flexível.
 *
 * Facilita o alinhamento e distribuição de espaço entre itens de forma responsiva.
 * Substitui a necessidade de escrever classes repetitivas como `flex items-center justify-between`.
 */
export const Flex: PolymorphicComponent<FlexProps> = React.forwardRef<any, FlexProps>(
  ({ direction = "row", align, justify, wrap, gap, className, style, children, ...props }, ref) => {
    // Classes estáticas (Layout behavior)
    const staticClasses = cn(
      "flex",
      {
        "flex-row": direction === "row",
        "flex-col": direction === "column",
        "flex-row-reverse": direction === "row-reverse",
        "flex-col-reverse": direction === "column-reverse",
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
        "flex-nowrap": wrap === "nowrap",
        "flex-wrap": wrap === "wrap",
        "flex-wrap-reverse": wrap === "wrap-reverse",
      },
      className,
    );

    return (
      <Box
        ref={ref}
        className={staticClasses}
        style={{
          gap: getSize(gap),
          ...style,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Flex.displayName = "Flex";
