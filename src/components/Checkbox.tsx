import { Check } from "lucide-react";
import React, { forwardRef } from "react";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";

interface CheckboxProps
  extends
    Omit<SystemProps, "as">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "width" | "height" | "color"> {
  /**
   * Texto opcional exibido ao lado do checkbox.
   * Renderizado com tipografia sans-serif e uppercase por padrão.
   */
  label?: string;

  /**
   * Define o tema visual do componente.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";

  /**
   * Se verdadeiro, o checkbox fica desabilitado e com aparência esmaecida.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Checkbox customizado com estética brutalista.
 * Mantém acessibilidade total escondendo o input nativo (`sr-only`)
 * mas preservando a navegabilidade via teclado e leitores de tela.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      uppercase = true,
      fontFamily = "sans",
      variant = "primary",
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const { systemStyle, domProps } = extractSystemStyles({ ...props, fontFamily });

    const boxStyles = {
      primary:
        "border-primary peer-checked:bg-primary peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]",
      secondary:
        "border-secondary peer-checked:bg-secondary peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(0,255,65,0.3)]",
      accent:
        "border-accent peer-checked:bg-accent peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(255,0,127,0.3)]",
      danger:
        "border-danger peer-checked:bg-danger peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]",
      warning:
        "border-warning peer-checked:bg-warning peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(255,215,0,0.3)]",
      ghost:
        "border-zinc-700 bg-transparent peer-checked:bg-zinc-700 peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
    };

    const labelStyles = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      danger: "text-danger",
      warning: "text-warning",
      ghost: "text-zinc-400",
    };

    const iconColorStyles = {
      primary: "text-black",
      secondary: "text-black",
      accent: "text-black",
      danger: "text-white",
      warning: "text-black",
      ghost: "text-zinc-400",
    };

    return (
      <label
        className={cn(
          "inline-flex items-center gap-3 group w-fit",
          uppercase && "uppercase",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className,
        )}
        style={systemStyle}
      >
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only" // Input nativo escondido
            disabled={disabled}
            {...domProps}
          />
          {/* Caixa Customizada */}
          <div
            className={cn(
              "w-5 h-5 border-2 flex items-center justify-center bg-black transition-all duration-300",
              boxStyles[variant],
              // Lógica de Visibilidade do Ícone Filho (CSS Puro)
              // Quando o input 'peer' está checado, o SVG filho ganha escala e opacidade
              "peer-checked:[&_svg]:scale-100 peer-checked:[&_svg]:opacity-100",
              // Hover Effect (Sutil)
              "group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
              // Disabled
              disabled && "opacity-50 cursor-not-allowed grayscale-[0.5]",
            )}
          >
            <Check
              size={14}
              strokeWidth={3}
              aria-hidden="true"
              className={cn(
                "transform scale-0 opacity-0 transition-all duration-200 ease-out",
                iconColorStyles[variant],
              )}
            />
          </div>
        </div>
        {label && (
          <span
            className={cn(
              "text-sm tracking-wider select-none",
              labelStyles[variant],
              disabled && "opacity-50 cursor-not-allowed grayscale-[0.5]",
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
