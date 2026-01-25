import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * O conteúdo do emblema (geralmente texto curto ou ícone).
   */
  children: React.ReactNode;

  /**
   * Define o tema de cores.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";

  /**
   * Dimensões e escala de fonte do badge.
   * - `sm`: Para contextos densos ou listas.
   * - `md`: Tamanho padrão para labels independentes.
   * @default "md"
   */
  size?: "sm" | "md";

  /**
   * Estilo de preenchimento.
   * - `outline`: Borda colorida, fundo transparente.
   * - `solid`: Fundo preenchido, texto preto (exceto danger que pode ser branco).
   * @default "outline"
   */
  styleType?: "outline" | "solid";
}

/**
 * Componente de Badge (Emblema) para status, tags ou categorias.
 * Utiliza tipografia serifada e uppercase para reforçar a estética gótica/brutalista.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { children, variant = "primary", size = "md", styleType = "outline", className, ...props },
    ref,
  ) => {
    // Mapeamento Outline
    const outlineStyles = {
      primary: "border-primary text-primary bg-black",
      secondary: "border-secondary text-secondary bg-black",
      accent: "border-accent text-accent bg-black",
      danger: "border-danger text-danger bg-black",
      warning: "border-warning text-warning bg-black",
    };

    // Mapeamento Solid (Alto Contraste)
    const solidStyles = {
      primary: "border-primary bg-primary text-black",
      secondary: "border-secondary bg-secondary text-black",
      accent: "border-accent bg-accent text-black",
      danger: "border-danger bg-danger text-white", // Exceção para legibilidade no vermelho escuro
      warning: "border-warning bg-warning text-black",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center border-2 font-serif uppercase tracking-widest transition-all duration-300 select-none whitespace-nowrap",
          // Sizes
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-sm",
          // Styles
          styleType === "solid" ? solidStyles[variant] : outlineStyles[variant],
          // Hover Effect (Sutil)
          "hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
