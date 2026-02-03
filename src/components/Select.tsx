"use client";

import { ChevronDown } from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";

export interface SelectProps
  extends
    Omit<SystemProps, "as">,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value" | "color"> {
  /**
   * Lista de opções disponíveis para seleção.
   */
  options: Array<{
    /** Valor único da opção (enviado no onChange). */
    value: string;
    /** Texto exibido para o usuário. */
    label: string;
  }>;

  /**
   * Valor atual selecionado (Componente Controlado).
   * Deve corresponder ao `value` de uma das opções.
   */
  value?: string;

  /**
   * Callback disparado quando uma opção é selecionada.
   * Retorna apenas o `value` da opção (string).
   */
  onChange?: (value: string) => void;

  /**
   * Texto exibido quando nenhum valor está selecionado.
   * @default "Selecionar..."
   */
  placeholder?: string;

  /**
   * Rótulo opcional exibido acima do select.
   */
  label?: string;

  /**
   * Define o tema visual.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";

  /**
   * Altura do componente.
   * - `sm`: Compacto (32px).
   * - `md`: Padrão (48px).
   * - `lg`: Expandido (64px).
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Select customizado (Combobox) com suporte a navegação por teclado e estética brutalista.
 * Substitui o `<select>` nativo para permitir estilização profunda do dropdown.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Selecionar...",
      label,
      variant = "primary",
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    const { systemStyle, domProps } = extractSystemStyles(props);

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find((opt) => opt.value === value);

    // Fecha ao clicar fora
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Scroll automático para o item destacado
    useEffect(() => {
      if (isOpen && highlightedIndex >= 0 && listRef.current) {
        const optionNode = listRef.current.children[highlightedIndex] as HTMLElement;
        if (optionNode) {
          optionNode.scrollIntoView({ block: "nearest" });
        }
      }
    }, [highlightedIndex, isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (props.disabled) return;

      if (!isOpen) {
        if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
          const currentIndex = options.findIndex((opt) => opt.value === value);
          setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            onChange?.(options[highlightedIndex].value);
            setIsOpen(false);
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    const labelStyles = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      danger: "text-danger",
      warning: "text-warning",
      ghost: "text-zinc-500",
    };

    const triggerStyles = {
      primary:
        "border-primary focus-visible:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
      secondary:
        "border-secondary focus-visible:shadow-[6px_6px_0px_0px_rgba(0,255,65,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(0,255,65,0.2)]",
      accent:
        "border-accent focus-visible:shadow-[6px_6px_0px_0px_rgba(255,0,127,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,127,0.2)]",
      danger:
        "border-danger focus-visible:shadow-[6px_6px_0px_0px_rgba(220,38,38,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]",
      warning:
        "border-warning focus-visible:shadow-[6px_6px_0px_0px_rgba(255,215,0,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]",
      ghost:
        "border-zinc-700 border-x-transparent border-t-transparent bg-transparent text-zinc-400 focus:border-zinc-700 focus:bg-black focus-visible:shadow-[6px_6px_0px_0px_rgba(113,113,122,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
    };

    const dropdownBorderStyles = {
      primary: "border-primary shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
      secondary: "border-secondary shadow-[8px_8px_0px_0px_rgba(0,255,65,0.2)]",
      accent: "border-accent shadow-[8px_8px_0px_0px_rgba(255,0,127,0.2)]",
      danger: "border-danger shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]",
      warning: "border-warning shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]",
      ghost: "border-zinc-800 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
    };

    const textStyles = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      danger: "text-danger",
      warning: "text-warning",
      ghost: "text-zinc-400",
    };

    return (
      <div className={cn("flex flex-col gap-2 w-full", className)} style={systemStyle}>
        {label && (
          <label
            onClick={() => !props.disabled && setIsOpen(!isOpen)}
            className={cn(
              "font-serif text-sm uppercase tracking-widest cursor-pointer w-fit select-none",
              labelStyles[variant],
              props.disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            {label}
          </label>
        )}

        <div className="relative group w-full" ref={containerRef}>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => !props.disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={props.disabled}
            className={cn(
              "w-full bg-black border-2 flex items-center justify-between transition-all duration-300 outline-none select-none text-left",
              triggerStyles[variant],
              // Size
              size === "sm" && "px-2 py-1.5 min-h-[32px]",
              size === "md" && "px-4 py-3 min-h-[48px]",
              size === "lg" && "px-7 py-6 min-h-[64px]",
              // Disabled
              props.disabled && "opacity-50 cursor-not-allowed hover:shadow-none",
            )}
            {...domProps}
          >
            <span
              className={cn(
                "font-sans text-sm truncate pr-4 block",
                selectedOption ? textStyles[variant] : "text-zinc-600",
              )}
            >
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                textStyles[variant],
                "transition-all duration-300 flex-shrink-0",
                isOpen && "rotate-180",
              )}
            />
          </button>

          {isOpen && (
            <div
              ref={listRef}
              role="listbox"
              tabIndex={-1}
              className={cn(
                "absolute top-full left-0 z-50 w-full mt-1 bg-black border-2 max-h-60 overflow-y-auto custom-scrollbar",
                dropdownBorderStyles[variant],
              )}
            >
              {options.map((option, idx) => {
                const isActive = idx === highlightedIndex;
                const isSelected = option.value === value;
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange?.(option.value);
                      setIsOpen(false);
                      setHighlightedIndex(-1);
                    }}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={cn(
                      "px-4 py-3 cursor-pointer font-sans text-sm transition-colors duration-300",
                      textStyles[variant],
                      isActive ? "bg-zinc-800" : "bg-black",
                      isSelected && "font-bold tracking-wide bg-zinc-900",
                    )}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";
