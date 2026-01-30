import React from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { cn } from "../utils/cn";
import { Text, TextProps } from "./Text";

export interface HeadingProps extends TextProps {
  /**
   * Nível hierárquico do título.
   * Afeta o tamanho da fonte e a tag HTML padrão.
   * @default "h2"
   */
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const sizeMap = {
  h1: "5xl",
  h2: "4xl",
  h3: "3xl",
  h4: "2xl",
  h5: "xl",
  h6: "lg",
};

/**
 * Componente para títulos e cabeçalhos.
 * Impõe a tipografia **Serifada** (Playfair Display) e **Uppercase** por padrão,
 * alinhado com a identidade Cyber Goth da Nocturna UI.
 */
export const Heading: PolymorphicComponent<HeadingProps> = React.forwardRef<any, HeadingProps>(
  ({ level = "h2", className, fontFamily = "serif", ...props }, ref) => {
    return (
      <Text
        as={level}
        ref={ref}
        fontFamily={fontFamily}
        fontSize={sizeMap[level]}
        fontWeight="bold"
        className={cn(
          "uppercase tracking-tighter", // Identidade Brutalista
          className,
        )}
        {...props}
      />
    );
  },
);

Heading.displayName = "Heading";
