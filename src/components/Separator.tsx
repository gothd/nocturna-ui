import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface AbyssSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Define o tema visual das linhas e do texto.
   * - `void`: Linhas brancas (Padrão).
   * - `blood`: Linhas vermelho-sangue (Para áreas de perigo ou destaque).
   * @default "void"
   */
  variant?: "void" | "blood";

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
export const AbyssSeparator = forwardRef<HTMLDivElement, AbyssSeparatorProps>(
  (
    { variant = "void", label, as: Component = "div", className, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        role={!label ? "separator" : undefined} // Se tiver label, deixa de ser puramente decorativo para leitores
        className={cn(
          "relative flex items-center py-8 w-full select-none",
          className,
        )}
        {...props}
      >
        {/* Linha Esquerda */}
        <div
          className={cn(
            "flex-grow border-t-2 transition-colors duration-300",
            variant === "void" ? "border-white" : "border-red-900",
          )}
        />

        {/* Rótulo Central */}
        {label && (
          <span
            className={cn(
              "flex-none px-4 font-serif text-sm uppercase tracking-[0.2em]",
              variant === "void" ? "text-white" : "text-red-600",
            )}
          >
            {label}
          </span>
        )}

        {/* Linha Direita */}
        <div
          className={cn(
            "flex-grow border-t-2 transition-colors duration-300",
            variant === "void" ? "border-white" : "border-red-900",
          )}
        />
      </Component>
    );
  },
);

AbyssSeparator.displayName = "AbyssSeparator";
