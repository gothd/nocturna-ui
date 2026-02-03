import React, { forwardRef } from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";
import { getFontFamily } from "../utils/tokens";

interface CardProps extends SystemProps, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Define o tema visual do card.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";

  /**
   * Título principal do card. Renderizado em uppercase e fonte serifada.
   * Se omitido, o cabeçalho não será renderizado.
   */
  title?: string;

  /**
   * Texto de apoio renderizado logo abaixo do título em fonte sans-serif.
   */
  description?: string;

  /**
   * Conteúdo opcional renderizado na base do card.
   */
  footer?: React.ReactNode;

  /**
   * Controla a tag HTML usada para o título (acessibilidade).
   * Permite ajustar a hierarquia semântica sem mudar o estilo visual.
   * @default "h3"
   */
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * Define a família da fonte da descrição.
   * @default "sans"
   */
  descriptionFontFamily?: SystemProps["fontFamily"];
}

/**
 * Container fundamental da Nocturna UI.
 * Possui comportamento de Flex Column para garantir que o conteúdo ocupe a altura disponível,
 * além de sombras rígidas (hard shadows) interativas no hover.
 */
export const Card: PolymorphicComponent<CardProps> = forwardRef<any, CardProps>(
  (
    {
      title,
      description,
      footer,
      variant = "primary",
      fontFamily = "serif",
      descriptionFontFamily = "sans",
      headingLevel: Heading = "h3",
      uppercase = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const {
      systemStyle,
      domProps,
      as: Component = "div",
    } = extractSystemStyles({ ...props, fontFamily });

    const containerStyles = {
      primary: "border-primary hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
      secondary: "border-secondary hover:shadow-[8px_8px_0px_0px_rgba(0,255,65,0.2)]",
      accent: "border-accent hover:shadow-[8px_8px_0px_0px_rgba(255,0,127,0.2)]",
      danger: "border-danger hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]",
      warning: "border-warning hover:shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]",
      ghost:
        "border-transparent bg-transparent hover:border-zinc-700 hover:bg-black hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
    };

    const textStyles = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      danger: "text-danger",
      warning: "text-warning",
      ghost: "text-zinc-400",
    };

    const footerStyles = {
      primary: "border-primary/50",
      secondary: "border-secondary/50",
      accent: "border-accent/50",
      danger: "border-danger/50",
      warning: "border-warning/50",
      ghost: "border-zinc-700",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "bg-black border-2 flex flex-col h-full", // Flex col para garantir altura
          "p-6 transition-shadow duration-300",
          uppercase && "uppercase",
          containerStyles[variant],
          className,
        )}
        style={systemStyle}
        {...domProps}
      >
        {(title || description) && (
          <div className="mb-4 space-y-2">
            <Heading className={cn("text-2xl tracking-tighter leading-none", textStyles[variant])}>
              {title}
            </Heading>

            {description && (
              <p
                className={cn("text-zinc-500 text-sm leading-relaxed")}
                style={{ fontFamily: getFontFamily(descriptionFontFamily) }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content Area - cresce para ocupar espaço se necessário */}
        <div className={cn("flex-1", (title || description) && "mt-2")}>{children}</div>

        {footer && <div className={cn("mt-6 pt-4 border-t", footerStyles[variant])}>{footer}</div>}
      </Component>
    );
  },
);

Card.displayName = "Card";
