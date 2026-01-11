import { Check } from "lucide-react";
import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface HexCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  variant?: "void" | "blood";
}

export const HexCheckbox = forwardRef<HTMLInputElement, HexCheckboxProps>(
  ({ label, variant = "void", className, ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-3 cursor-pointer group w-fit">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only" // Input nativo escondido mas acessível via teclado
            {...props}
          />
          {/* Caixa Customizada */}
          <div
            className={cn(
              "w-5 h-5 border-2 flex items-center justify-center bg-black transition-all duration-300",
              // Variantes de borda e fundo ao checar
              variant === "void"
                ? "border-white peer-checked:bg-white"
                : "border-red-900 peer-checked:bg-red-900",
              // EFEITO DE HOVER
              "group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
              // EFEITO DE FOCO (Teclado) - Critical A11y
              variant === "void"
                ? "peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
                : "peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(136,8,8,0.5)]",
              className
            )}
          >
            <Check
              size={14}
              strokeWidth={2}
              aria-hidden="true" // Ícone é decorativo
              className={cn(
                "transform scale-0 opacity-0 transition-all duration-200 ease-out",
                variant === "void" ? "text-black" : "text-white",
                props.checked && "scale-100 opacity-100" // Fallback simples se props.checked for controlado
              )}
            />
          </div>
        </div>
        {label && (
          <span
            className={cn(
              "font-sans text-sm uppercase tracking-wider select-none",
              variant === "void" ? "text-white" : "text-red-600"
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

HexCheckbox.displayName = "HexCheckbox";
