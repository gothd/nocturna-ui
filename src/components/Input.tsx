import React, { forwardRef, useId } from "react";
import { cn } from "../utils/cn";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Define o tema visual do input seguindo a paleta Cyber Goth.
   * - `primary`: Bone White (Padrão)
   * - `secondary`: Malware Green
   * - `accent`: Phantom Pink
   * - `danger`: Sanguine Red
   * - `warning`: Cyber Gold
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";

  /**
   * Dimensões do input.
   * - `sm`: Compacto (32px altura aprox).
   * - `md`: Padrão (48px altura aprox).
   * @default "md"
   */
  size?: "sm" | "md";

  /**
   * Rótulo exibido acima do campo.
   */
  label?: string;

  /**
   * Mensagem de erro.
   * Se existir, o input assume a cor `danger` automaticamente.
   */
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "primary", size = "md", label, error, className, ...props }, ref) => {
    // Gera um ID único para garantir vínculo label-input mesmo sem ID manual
    const generatedId = useId();
    const inputId = props.id || generatedId;
    const errorId = `${inputId}-error`;

    const labelVariants = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      danger: "text-danger",
      warning: "text-warning",
    };

    // Borda, texto, sombra de foco
    const inputVariants = {
      primary:
        "border-primary text-primary focus:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] placeholder:text-zinc-500",
      secondary:
        "border-secondary text-secondary focus:shadow-[8px_8px_0px_0px_rgba(0,255,65,0.2)] placeholder:text-secondary/50",
      accent:
        "border-accent text-accent focus:shadow-[8px_8px_0px_0px_rgba(255,0,127,0.2)] placeholder:text-accent/50",
      danger:
        "border-danger text-danger focus:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)] placeholder:text-danger/50",
      warning:
        "border-warning text-warning focus:shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)] placeholder:text-warning/50",
    };

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "font-serif uppercase tracking-widest cursor-pointer",
              size === "sm" ? "text-xs" : "text-sm",
              labelVariants[variant],
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "bg-black border-2 font-sans text-sm transition-all duration-300",
            "placeholder:text-zinc-600 focus:outline-none",
            // Lógica de Estilo: Erro > Variante
            error
              ? "border-danger text-danger animate-pulse focus:border-danger focus:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)] placeholder:text-danger/50"
              : inputVariants[variant],
            // Tamanho
            size === "sm" ? "px-2 py-1.5 text-xs" : "px-4 py-3 text-sm",
            className,
          )}
          {...props}
        />
        {error && (
          <span
            id={errorId}
            role="alert"
            className="text-danger font-sans text-xs mt-1 font-medium tracking-wide"
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
