import React, { forwardRef, useId } from "react";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";

export interface InputProps
  extends
    Omit<SystemProps, "as">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "color" | "size" | "width" | "height"> {
  /**
   * Define o tema visual do input seguindo a paleta Cyber Goth.
   * - `primary`: Bone White (Padrão)
   * - `secondary`: Malware Green
   * - `accent`: Phantom Pink
   * - `danger`: Sanguine Red
   * - `warning`: Cyber Gold
   * - `ghost`: Stealth Mode (Sem bordas, fundo sutil)
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";

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

  /**
   * Ícone opcional exibido no lado esquerdo do campo.
   */
  leftIcon?: React.ReactNode;

  /**
   * Ícone opcional exibido no lado direito do campo.
   */
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "primary",
      size = "md",
      uppercase = true,
      label,
      error,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref,
  ) => {
    // Gera um ID único para garantir vínculo label-input mesmo sem ID manual
    const generatedId = useId();
    const inputId = props.id || generatedId;
    const errorId = `${inputId}-error`;
    const { systemStyle, domProps } = extractSystemStyles(props);

    const labelVariants = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      danger: "text-danger",
      warning: "text-warning",
      ghost: "text-zinc-500",
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
      ghost:
        "border-zinc-700 border-x-0 border-t-0 bg-transparent text-zinc-400 focus:border-2 focus:bg-black focus:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] placeholder:text-zinc-600",
    };

    return (
      <div
        className={cn("flex flex-col gap-2", uppercase && "uppercase", className)}
        style={systemStyle}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "tracking-widest cursor-pointer",
              size === "sm" ? "text-xs" : "text-sm",
              labelVariants[variant],
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "w-full bg-black border-2 font-sans text-sm transition-all duration-300",
              "placeholder:text-zinc-600 focus:outline-none",
              "peer",
              // Lógica de Estilo: Erro > Variante
              error
                ? "border-danger text-danger animate-pulse focus:border-danger focus:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)] placeholder:text-danger/50"
                : inputVariants[variant],
              // Tamanho
              size === "sm" ? "px-2 py-1.5 text-xs" : "px-4 py-3 text-sm",
              // Padding para ícones
              leftIcon && (size === "sm" ? "pl-8" : "pl-10"),
              rightIcon && (size === "sm" ? "pr-8" : "pr-10"),
            )}
            {...domProps}
          />
          {leftIcon && (
            <div
              className={cn(
                "absolute left-3 flex items-center justify-center pointer-events-none transition-colors duration-300",
                error ? "text-danger" : labelVariants[variant],
              )}
            >
              {leftIcon}
            </div>
          )}
          {rightIcon && (
            <div className={cn("absolute right-3 flex items-center justify-center")}>
              {rightIcon}
            </div>
          )}
        </div>
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
