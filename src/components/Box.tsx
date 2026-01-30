import React, { forwardRef } from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { extractSystemStyles, SystemProps } from "../utils/system";
import { cn } from "../utils/cn";

export interface BoxProps extends SystemProps, Omit<React.HTMLAttributes<HTMLElement>, "color"> {}

/**
 * **Box** é o átomo fundamental da Nocturna UI.
 * Ele mapeia props de estilo diretamente para estilos inline, garantindo que o design
 * funcione independente da configuração de CSS do projeto consumidor.
 */
export const Box: PolymorphicComponent<BoxProps> = forwardRef<HTMLElement, BoxProps>(
  ({ className, children, ...props }, ref) => {
    // O motor extrai estilos e separa as props do DOM
    const { systemStyle, domProps, as } = extractSystemStyles(props);

    const Component = as || "div";

    return (
      <Component
        ref={ref}
        className={cn("box-border min-w-0", className)}
        style={systemStyle}
        {...domProps}
      >
        {children}
      </Component>
    );
  },
);

Box.displayName = "Box";
