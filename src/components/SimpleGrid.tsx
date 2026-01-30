import React from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { getSize } from "../utils/tokens";
import { Grid, GridProps } from "./Grid";

export interface SimpleGridProps extends Omit<GridProps, "templateColumns"> {
  /**
   * Número de colunas.
   * Gera `repeat(columns, minmax(0, 1fr))`.
   * Ignorado se `minChildWidth` for definido.
   */
  columns?: number;

  /**
   * Largura mínima de cada item.
   * Ativa o modo responsivo automático: `repeat(auto-fit, minmax(minChildWidth, 1fr))`.
   * Ideal para galerias de cartões que se adaptam a qualquer tela.
   * Aceita tokens de tamanho ou valores CSS.
   */
  minChildWidth?: number | string;

  /** Alias para `gap` */
  spacing?: number | string;
  /** Alias para `columnGap` */
  spacingX?: number | string;
  /** Alias para `rowGap` */
  spacingY?: number | string;
}

/**
 * **SimpleGrid** facilita a criação de layouts de grade uniformes.
 * * Use `columns` para um número fixo de divisões ou `minChildWidth` para
 * um layout fluido e responsivo automático ("Cyber Grid").
 */
export const SimpleGrid: PolymorphicComponent<SimpleGridProps> = React.forwardRef<
  any,
  SimpleGridProps
>(({ columns, minChildWidth, spacing, spacingX, spacingY, ...props }, ref) => {
  const templateColumns = minChildWidth
    ? `repeat(auto-fit, minmax(${getSize(minChildWidth)}, 1fr))`
    : columns
      ? `repeat(${columns}, minmax(0, 1fr))`
      : undefined;

  return (
    <Grid
      ref={ref}
      gap={spacing}
      columnGap={spacingX}
      rowGap={spacingY}
      templateColumns={templateColumns}
      {...props}
    />
  );
});

SimpleGrid.displayName = "SimpleGrid";
