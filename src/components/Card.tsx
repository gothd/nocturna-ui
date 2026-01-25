import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Define o tema visual do card.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";

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
   * Controla a tag HTML usada para o título (acessibilidade).
   * Permite ajustar a hierarquia semântica sem mudar o estilo visual.
   * @default "h3"
   */
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * Polimorfismo: Define qual elemento HTML raiz será renderizado.
   * Útil para semântica (ex: transformar em `section`, `article` ou `li`).
   * @default "div"
   */
  as?: React.ElementType;
}

/**
 * Container fundamental da Nocturna UI.
 * Possui comportamento de Flex Column para garantir que o conteúdo ocupe a altura disponível,
 * além de sombras rígidas (hard shadows) interativas no hover.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      description,
      variant = "primary",
      className,
      children,
      headingLevel: Heading = "h3",
      as: Component = "div",
      ...props
    },
    ref,
  ) => {
    const containerStyles = {
      primary: "border-primary hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
      secondary: "border-secondary hover:shadow-[8px_8px_0px_0px_rgba(0,255,65,0.2)]",
      accent: "border-accent hover:shadow-[8px_8px_0px_0px_rgba(255,0,127,0.2)]",
      danger: "border-danger hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]",
      warning: "border-warning hover:shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]",
    };

    const textStyles = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      danger: "text-danger",
      warning: "text-warning",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "bg-black border-2 flex flex-col h-full", // Flex col para garantir altura
          "p-6 transition-shadow duration-300",
          containerStyles[variant],
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4 space-y-2">
            <Heading
              className={cn(
                "font-serif text-2xl uppercase tracking-tighter leading-none",
                textStyles[variant],
              )}
            >
              {title}
            </Heading>

            {description && (
              <p className="text-zinc-500 text-sm font-sans leading-relaxed">{description}</p>
            )}
          </div>
        )}

        {/* Content Area - cresce para ocupar espaço se necessário */}
        <div className={cn((title || description) && "mt-auto")}>{children}</div>
      </Component>
    );
  },
);

Card.displayName = "Card";
