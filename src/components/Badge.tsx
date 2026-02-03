import React, { forwardRef } from "react";
import { PolymorphicComponent } from "../types/polymorphic";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";

interface BadgeProps extends SystemProps, Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  /**
   * O conteúdo do emblema (geralmente texto curto ou ícone).
   */
  children: React.ReactNode;

  /**
   * Define o tema de cores.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger" | "warning";

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
export const Badge: PolymorphicComponent<BadgeProps> = forwardRef<any, BadgeProps>(
  (
    {
      as = "span",
      variant = "primary",
      size = "md",
      styleType = "outline",
      uppercase = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { systemStyle, domProps, as: Component } = extractSystemStyles({ ...props, as });

    // Mapeamento Outline
    const outlineStyles = {
      primary: "border-primary text-primary bg-black",
      secondary: "border-secondary text-secondary bg-black",
      accent: "border-accent text-accent bg-black",
      danger: "border-danger text-danger bg-black",
      warning: "border-warning text-warning bg-black",
      ghost:
        "border-transparent text-zinc-500 bg-transparent hover:border-zinc-700 hover:bg-black hover:text-zinc-400 focus-visible:border-zinc-700 focus-visible:bg-black focus-visible:text-zinc-400",
    };

    // Mapeamento Solid (Alto Contraste)
    const solidStyles = {
      primary: "border-primary bg-primary text-black",
      secondary: "border-secondary bg-secondary text-black",
      accent: "border-accent bg-accent text-black",
      danger: "border-danger bg-danger text-white", // Exceção para legibilidade no vermelho escuro
      warning: "border-warning bg-warning text-black",
      ghost: "border-zinc-700 bg-zinc-800 text-zinc-100",
    };

    const sizes = {
      sm: "text-[10px] px-2 py-0.5",
      md: "text-sm px-3 py-1",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center border-2 font-serif tracking-widest transition-all duration-300 select-none whitespace-nowrap",
          // Sizes
          sizes[size],
          // Styles
          styleType === "solid" ? solidStyles[variant] : outlineStyles[variant],
          // Hover Effect (Sutil)
          "hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",

          uppercase && "uppercase",
          className,
        )}
        style={systemStyle}
        {...domProps}
      >
        {children}
      </Component>
    );
  },
);

Badge.displayName = "Badge";
