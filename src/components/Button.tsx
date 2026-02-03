import React, { forwardRef } from "react";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";
import { PolymorphicComponent } from "src/types/polymorphic";

export interface ButtonProps
  extends SystemProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /**
   * Define o estilo visual do botão.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";
  /**
   * Controla o tamanho e o padding.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Define o estado de loading.
   * @default false
   */
  isLoading?: boolean;
}

/**
 * Botão primário com estética brutalista.
 * Utiliza sombras rígidas (hard shadows) e transições de alto contraste.
 */
export const Button: PolymorphicComponent<ButtonProps> = forwardRef<any, ButtonProps>(
  (
    {
      as = "button",
      variant = "primary",
      size = "md",
      uppercase = true,
      isLoading,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { systemStyle, domProps, as: Component } = extractSystemStyles({ ...props, as });

    const variantStyles = {
      primary:
        "border-primary text-primary hover:bg-primary hover:text-black focus-visible:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]",
      secondary:
        "border-secondary text-secondary hover:bg-secondary hover:text-black focus-visible:shadow-[6px_6px_0px_0px_rgba(0,255,65,0.5)]",
      accent:
        "border-accent text-accent hover:bg-accent hover:text-black focus-visible:shadow-[6px_6px_0px_0px_rgba(255,0,127,0.5)]",
      danger:
        "border-danger text-danger hover:bg-danger hover:text-white focus-visible:shadow-[6px_6px_0px_0px_rgba(220,38,38,0.5)]",
      warning:
        "border-warning text-warning hover:bg-warning hover:text-black focus-visible:shadow-[6px_6px_0px_0px_rgba(255,215,0,0.5)]",
      ghost:
        "border-transparent bg-transparent text-zinc-400 hover:border-zinc-700 hover:bg-black hover:text-white focus-visible:border-zinc-700 focus-visible:bg-black focus-visible:text-white focus-visible:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)]",
    };

    const sizeStyles = {
      sm: "px-3 py-1 text-xs",
      md: "px-6 py-2 text-sm",
      lg: "px-10 py-4 text-base",
    };

    return (
      <Component
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          "border-2 font-serif tracking-widest transition-all duration-300 relative select-none whitespace-nowrap",
          "flex items-center justify-center focus:outline-none",
          uppercase && "uppercase",
          sizeStyles[size],
          variantStyles[variant],
          // Disabled State
          (disabled || isLoading) &&
            "opacity-50 cursor-not-allowed hover:shadow-none hover:bg-transparent hover:text-inherit pointer-events-none active:shadow-none active:translate-y-0",
          className,
        )}
        style={systemStyle}
        {...domProps}
      >
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        )}
        <span className={cn("flex items-center gap-2", isLoading && "invisible")}>{children}</span>
      </Component>
    );
  },
);

Button.displayName = "Button";
