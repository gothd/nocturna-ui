import React from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { cn } from "../utils/cn";
import { Box, BoxProps } from "./Box";

export interface TextProps extends BoxProps {
  /**
   * Aplica itálico via estilo inline.
   */
  italic?: boolean;
}

/**
 * Primitivo tipográfico que gerencia estilos de texto de forma segura.
 * Utiliza mapeamento de tokens para garantir consistência visual.
 */
export const Text: PolymorphicComponent<TextProps, "p"> = React.forwardRef<any, TextProps>(
  ({ as = "p", fontFamily = "sans", italic, className, ...props }, ref) => {
    // Classes base para garantir reset de margens se necessário
    const baseClasses = cn(
      "leading-relaxed", // Default para texto corrido
      italic && "italic",
      className,
    );

    return <Box as={as} ref={ref} fontFamily={fontFamily} className={baseClasses} {...props} />;
  },
);

Text.displayName = "Text";
