import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Define o estilo visual do botão.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";
  /**
   * Controla o tamanho e o padding.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Botão primário com estética brutalista.
 * Utiliza sombras rígidas (hard shadows) e transições de alto contraste.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, type = "button", disabled, ...props }, ref) => {
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
    };

    const sizeStyles = {
      sm: "px-3 py-1 text-xs",
      md: "px-6 py-2 text-sm",
      lg: "px-10 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "border-2 font-serif uppercase tracking-widest transition-all duration-300 relative select-none",
          "flex items-center justify-center focus:outline-none",
          sizeStyles[size],
          variantStyles[variant],
          // Disabled State
          disabled &&
            "opacity-50 cursor-not-allowed hover:shadow-none hover:bg-transparent hover:text-inherit pointer-events-none",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
