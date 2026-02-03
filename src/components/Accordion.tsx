"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { forwardRef, useState } from "react";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";

export interface AccordionProps
  extends Omit<SystemProps, "as">, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Lista de seções do acordeão.
   */
  items: Array<{
    /** Identificador único do item. Se omitido, será gerado pelo índice. */
    id?: string;
    /** Texto do cabeçalho */
    title: string;
    /** Conteúdo a ser revelado (ReactNode) */
    content: React.ReactNode;
  }>;

  /** Permite múltiplas seções abertas ao mesmo tempo */
  allowMultiple?: boolean;

  /**
   * Define a estética visual.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";
}

/**
 * Componente de Acordeão com animações de altura (Framer Motion) e estética brutalista.
 * Possui bordas sobrepostas para criar um efeito de lista contínua.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    { items, allowMultiple = false, variant = "primary", uppercase = true, className, ...props },
    ref,
  ) => {
    const { systemStyle, domProps } = extractSystemStyles(props);
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggle = (index: number) => {
      if (allowMultiple) {
        setOpenIndexes((prev) =>
          prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
        );
      } else {
        setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
      }
    };

    const borderStyles = {
      primary: "border-primary focus-within:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
      secondary: "border-secondary focus-within:shadow-[8px_8px_0px_0px_rgba(0,255,65,0.2)]",
      accent: "border-accent focus-within:shadow-[8px_8px_0px_0px_rgba(255,0,127,0.2)]",
      danger: "border-danger focus-within:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]",
      warning: "border-warning focus-within:shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]",
      ghost:
        "border-transparent bg-transparent focus-within:border-zinc-700 focus-within:bg-black focus-within:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:border-zinc-700 hover:bg-black",
    };

    const textStyles = {
      primary: "text-primary group-hover:text-zinc-300",
      secondary: "text-secondary group-hover:text-secondary/80",
      accent: "text-accent group-hover:text-accent/80",
      danger: "text-danger group-hover:text-danger/80",
      warning: "text-warning group-hover:text-warning/80",
      ghost: "text-zinc-400 group-hover:text-zinc-200",
    };

    return (
      <div ref={ref} className={cn("flex flex-col", className)} style={systemStyle} {...domProps}>
        {items.map((item, index) => {
          const isOpen = openIndexes.includes(index);
          const itemId = item.id || `item-${index}`;
          const isFirst = index === 0;

          return (
            <div
              key={itemId}
              className={cn(
                "bg-black border-2 transition-shadow duration-300",
                borderStyles[variant],
                !isFirst && "-mt-0.5", // Overlap borders para evitar borda dupla
                "hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
                "focus-within:z-10 relative",
              )}
            >
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none group"
              >
                <span
                  className={cn(
                    "text-lg tracking-tighter transition-colors",
                    uppercase && "uppercase",
                    textStyles[variant],
                  )}
                >
                  {item.title}
                </span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown
                    size={20}
                    className={textStyles[variant].split(" ")[0]} // Pega só a classe de cor base
                  />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-zinc-400 text-sm font-sans leading-relaxed border-t border-zinc-900/50 pt-4">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  },
);

Accordion.displayName = "Accordion";
