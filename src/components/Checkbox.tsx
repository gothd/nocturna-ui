import { Check } from "lucide-react";
import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface HexCheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /**
   * Texto opcional exibido ao lado do checkbox.
   * Renderizado com tipografia sans-serif e uppercase.
   */
  label?: string;

  /**
   * Define o tema visual do componente.
   * - `void`: Padrão monocromático (Borda Branca / Check Preto).
   * - `blood`: Tema vermelho escuro (Borda Vermelha / Check Branco).
   * @default "void"
   */
  variant?: "void" | "blood";
}

/**
 * Checkbox customizado com estética brutalista.
 * Mantém acessibilidade total escondendo o input nativo (`sr-only`)
 * mas preservando a navegabilidade via teclado e leitores de tela.
 */
export const HexCheckbox = forwardRef<HTMLInputElement, HexCheckboxProps>(
  ({ label, variant = "void", className, ...props }, ref) => {
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

              // Cores da Caixa (Border & Background)
              variant === "void"
                ? "border-white peer-checked:bg-white"
                : "border-red-900 peer-checked:bg-red-900",

              // Lógica de Visibilidade do Ícone Filho (CSS Puro)
              // Quando o input 'peer' está checado, o SVG filho ganha escala e opacidade
              "peer-checked:[&_svg]:scale-100 peer-checked:[&_svg]:opacity-100",

              // Efeitos de Interação (Hover & Focus)
              "group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
              variant === "void"
                ? "peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
                : "peer-focus-visible:shadow-[4px_4px_0px_0px_rgba(136,8,8,0.5)]",

              className,
            )}
          >
            <Check
              size={14}
              strokeWidth={3}
              aria-hidden="true"
              className={cn(
                "transform scale-0 opacity-0 transition-all duration-200 ease-out",
                // Cor do Ícone
                variant === "void" ? "text-black" : "text-white",
              )}
            />
          </div>
        </div>
        {label && (
          <span
            className={cn(
              "font-sans text-sm uppercase tracking-wider select-none",
              variant === "void" ? "text-white" : "text-red-600",
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

HexCheckbox.displayName = "HexCheckbox";
