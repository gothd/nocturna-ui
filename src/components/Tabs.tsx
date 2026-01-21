"use client";

import React, { forwardRef, useRef, useState } from "react";
import { cn } from "../utils/cn";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface SoulTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array de objetos que definem as abas.
   * Cada objeto deve conter `{ id, label, content }`.
   */
  tabs: Array<{
    /** Identificador único da aba. */
    id: string;
    /** Texto exibido no botão da aba. */
    label: string;
    /** Conteúdo renderizado quando a aba está ativa. */
    content: React.ReactNode;
  }>;

  /**
   * Define o tema visual.
   * - `void`: Padrão monocromático (Branco/Preto).
   * - `blood`: Tema avermelhado (Vermelho/Preto).
   * @default "void"
   */
  variant?: "void" | "blood";
}

/**
 * Componente de navegação em abas acessível.
 *
 * **Features:**
 * - **Acessibilidade de Teclado:** Suporte completo para navegação com setas (Esquerda/Direita).
 * - **Animações:** Transição suave (fade/slide) ao trocar de conteúdo.
 * - **ARIA:** Roles e atributos corretos (`tablist`, `tab`, `tabpanel`).
 */
export const SoulTabs = forwardRef<HTMLDivElement, SoulTabsProps>(
  ({ tabs, variant = "void", className, ...props }, ref) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (index + 1) % tabs.length;
        tabRefs.current[nextIndex]?.focus();
        setActiveTab(tabs[nextIndex].id);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (index - 1 + tabs.length) % tabs.length;
        tabRefs.current[prevIndex]?.focus();
        setActiveTab(tabs[prevIndex].id);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("w-full flex flex-col", className)}
        {...props}
      >
        <div
          className="flex border-b-2 border-zinc-900 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="tablist"
          aria-label="Abas"
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "px-6 py-2 font-serif uppercase tracking-widest border-2 border-b-0 whitespace-nowrap",
                  "transition-all duration-300 focus:outline-none flex-shrink-0", // flex-shrink-0 evita quebra
                  // Variant Logic
                  variant === "void" ? "border-white" : "border-red-900",
                  isActive
                    ? variant === "void"
                      ? "bg-white text-black"
                      : "bg-red-900 text-white"
                    : "bg-black text-zinc-500 hover:text-white hover:bg-zinc-900",
                  // Overlap visual fix
                  "-mb-0.5 z-10",
                  // Focus
                  variant === "void"
                    ? "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(255,255,255,0.5)]"
                    : "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(136,8,8,0.5)]",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="py-6 min-h-[100px] relative">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              hidden={activeTab !== tab.id}
              className={cn(
                "text-zinc-500 font-sans leading-relaxed outline-none",
                activeTab === tab.id
                  ? "animate-in fade-in slide-in-from-bottom-2 duration-500"
                  : "hidden",
              )}
              tabIndex={0}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

SoulTabs.displayName = "SoulTabs";
