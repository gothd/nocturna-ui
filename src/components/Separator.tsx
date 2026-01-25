import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Define o tema visual das linhas e do texto.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";

  /**
   * Texto opcional exibido no centro do separador.
   * As linhas se ajustam automaticamente ao redor do texto.
   * Renderizado em uppercase e com espaçamento de letras estendido.
   */
  label?: string;

  /**
   * Polimorfismo: Permite alterar o elemento HTML raiz.
   * Útil para semântica (ex: renderizar como `li` em listas ou `hr` estilizado).
   * @default "div"
   */
  as?: React.ElementType;
}

/**
 * Divisor visual com estética brutalista.
 * Cria uma linha horizontal (ou duas, se houver rótulo) para separar seções de conteúdo.
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ variant = "primary", label, as: Component = "div", className, ...props }, ref) => {
    const borderStyles = {
      primary: "border-primary",
      secondary: "border-secondary",
      accent: "border-accent",
      danger: "border-danger",
      warning: "border-warning",
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
        role={!label ? "separator" : undefined} // Se tiver label, deixa de ser puramente decorativo para leitores
        className={cn("relative flex items-center py-8 w-full select-none", className)}
        {...props}
      >
        {/* Linha Esquerda */}
        <div
          className={cn(
            "flex-grow border-t-2 transition-colors duration-300",
            borderStyles[variant],
          )}
        />

        {/* Rótulo Central */}
        {label && (
          <span
            className={cn(
              "flex-none px-4 font-serif text-sm uppercase tracking-[0.2em]",
              textStyles[variant],
            )}
          >
            {label}
          </span>
        )}

        {/* Linha Direita */}
        <div
          className={cn(
            "flex-grow border-t-2 transition-colors duration-300",
            borderStyles[variant],
          )}
        />
      </Component>
    );
  },
);

Separator.displayName = "Separator";
