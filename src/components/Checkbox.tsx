import { Check } from "lucide-react";
import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Texto opcional exibido ao lado do checkbox.
   * Renderizado com tipografia sans-serif e uppercase.
   */
  label?: string;

  /**
   * Define o tema visual do componente.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";
}

/**
 * Checkbox customizado com estética brutalista.
 * Mantém acessibilidade total escondendo o input nativo (`sr-only`)
 * mas preservando a navegabilidade via teclado e leitores de tela.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, variant = "primary", className, ...props }, ref) => {
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
    };

    const labelStyles = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      danger: "text-danger",
      warning: "text-warning",
    };

    const iconColorStyles = {
      primary: "text-black",
      secondary: "text-black",
      accent: "text-black",
      danger: "text-white",
      warning: "text-black",
    };

    return (
      <label className="inline-flex items-center gap-3 cursor-pointer group w-fit">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only" // Input nativo escondido
            {...props}
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
              className,
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
              "font-sans text-sm uppercase tracking-wider select-none",
              labelStyles[variant],
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
