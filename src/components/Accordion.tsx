"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../utils/cn";

export interface GrimoireAccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface GrimoireAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Lista de seções do acordeão.
   * Define o ID, título e conteúdo de cada painel.
   */
  items: Array<{
    /** Identificador único para controle de estado */
    id: string;
    /** Texto do cabeçalho (sempre uppercase/serif) */
    title: string;
    /** Conteúdo a ser revelado (ReactNode) */
    content: React.ReactNode;
  }>;

  /**
   * Define a estética visual.
   * - `void`: Monocromático (Borda Branca).
   * - `blood`: Tons de vermelho sangue (Borda Vermelha).
   * @default "void"
   */
  variant?: "void" | "blood";
}

/**
 * Componente de Acordeão com animações de altura (Framer Motion) e estética brutalista.
 * Possui bordas sobrepostas para criar um efeito de lista contínua.
 */
export const GrimoireAccordion = ({
  items,
  variant = "void",
  className,
  ...props
}: GrimoireAccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const isFirst = index === 0;

        return (
          <div
            key={item.id}
            className={cn(
              "bg-black border-2 transition-shadow duration-300",
              variant === "void" ? "border-white" : "border-red-900",
              !isFirst && "-mt-0.5", // Overlap borders para evitar borda dupla
              "hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
              "focus-within:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] focus-within:z-10 relative",
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none group"
            >
              <span className="font-serif text-lg uppercase tracking-tighter text-white group-hover:text-zinc-300 transition-colors">
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  size={20}
                  className={variant === "void" ? "text-white" : "text-red-600"}
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
};
