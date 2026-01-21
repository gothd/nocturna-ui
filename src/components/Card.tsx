import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface NocturnaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Define o tema visual do card.
   * - `void`: Borda branca e sombra branca no hover.
   * - `blood`: Borda vermelha escura e sombra avermelhada no hover.
   * @default "void"
   */
  variant?: "void" | "blood";

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
export const NocturnaCard = forwardRef<HTMLDivElement, NocturnaCardProps>(
  (
    {
      title,
      description,
      variant = "void",
      className,
      children,
      headingLevel: Heading = "h3",
      as: Component = "div",
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "bg-black border-2 flex flex-col h-full", // Flex col para garantir altura
          // Border style
          variant === "void" ? "border-white" : "border-red-900",
          "p-6 transition-shadow duration-300",
          // Shadow style (Hover)
          variant === "void"
            ? "hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
            : "hover:shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4 space-y-2">
            <Heading
              className={cn(
                "font-serif text-2xl uppercase tracking-tighter leading-none",
                // Text style
                variant === "void" ? "text-white" : "text-red-600",
              )}
            >
              {title}
            </Heading>

            {description && (
              <p className="text-zinc-500 text-sm font-sans leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content Area - cresce para ocupar espaço se necessário */}
        <div className={cn((title || description) && "mt-auto")}>
          {children}
        </div>
      </Component>
    );
  },
);

NocturnaCard.displayName = "NocturnaCard";
