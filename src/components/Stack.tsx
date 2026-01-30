import React, { forwardRef } from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { cn } from "../utils/cn";
import { Flex, FlexProps } from "./Flex";
import { Separator } from "./Separator";

// --- Stack Base ---

export interface StackProps extends FlexProps {
  /**
   * Se verdadeiro, renderiza um `Separator` entre cada item filho.
   * O Separator se ajusta automaticamente à direção do Stack.
   */
  dividers?: boolean;

  /**
   * Aplica o tema visual Cyber Goth ao container do Stack.
   * Transforma o layout em um "Painel de Comandos" com bordas e sombras.
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";
}

/**
 * **Stack** é um container de layout para agrupar elementos com espaçamento uniforme.
 * Por padrão é vertical (`flex-col`).
 *
 * Pode atuar como um container estilizado (Card-like) se uma `variant` for passada.
 */
export const Stack: PolymorphicComponent<StackProps> = React.forwardRef<any, StackProps>(
  (
    { direction = "column", gap = 4, dividers, variant = "ghost", className, children, ...props },
    ref,
  ) => {
    // Classes de Estilo Visual (Brutalismo)
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

    // Lógica dos Divisores
    const isRow = direction?.includes("row");
    const separatorOrientation = isRow ? "vertical" : "horizontal";

    let renderedChildren = children;

    if (dividers) {
      const validChildren = React.Children.toArray(children).filter(React.isValidElement);

      renderedChildren = validChildren.map((child, index) => {
        const isLast = index === validChildren.length - 1;
        return (
          <React.Fragment key={index}>
            {child}
            {!isLast && (
              <Separator
                orientation={separatorOrientation}
                // Se for vertical (row stack), precisa ter altura para aparecer
                className={"opacity-50"}
                variant="primary"
              />
            )}
          </React.Fragment>
        );
      });
    }

    return (
      <Flex
        ref={ref}
        direction={direction}
        gap={gap}
        className={cn("w-full", variantStyles[variant], className)}
        {...props}
      >
        {renderedChildren}
      </Flex>
    );
  },
);

Stack.displayName = "Stack";

// --- Presets (VStack & HStack) ---

export interface VStackProps extends Omit<StackProps, "direction"> {}
export interface HStackProps extends Omit<StackProps, "direction"> {}

/**
 * **VStack** (Vertical Stack)
 * Atalho para `Stack` com `direction="column"`.
 * Ideal para listas, formulários e layouts de página.
 */
export const VStack: PolymorphicComponent<VStackProps> = forwardRef<any, VStackProps>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />,
);
VStack.displayName = "VStack";

/**
 * **HStack** (Horizontal Stack)
 * Atalho para `Stack` com `direction="row"` e alinhamento centralizado verticalmente.
 * Ideal para toolbars, navbars e grupos de botões.
 */
export const HStack: PolymorphicComponent<HStackProps> = forwardRef<any, HStackProps>(
  (props, ref) => <Stack ref={ref} direction="row" align="center" {...props} />,
);
HStack.displayName = "HStack";
