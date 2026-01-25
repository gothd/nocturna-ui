"use client";

import React, { forwardRef, useRef, useState } from "react";
import { cn } from "../utils/cn";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
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
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";
}

/**
 * Componente de navegação em abas acessível.
 *
 * **Features:**
 * - **Acessibilidade de Teclado:** Suporte completo para navegação com setas (Esquerda/Direita).
 * - **Animações:** Transição suave (fade/slide) ao trocar de conteúdo.
 * - **ARIA:** Roles e atributos corretos (`tablist`, `tab`, `tabpanel`).
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, variant = "primary", className, ...props }, ref) => {
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

    const borderStyles = {
      primary: "border-white",
      secondary: "border-secondary",
      accent: "border-accent",
      danger: "border-danger",
      warning: "border-warning",
    };

    const activeStyles = {
      primary: "bg-white text-black",
      secondary: "bg-secondary text-black",
      accent: "bg-accent text-black",
      danger: "bg-danger text-black",
      warning: "bg-warning text-black",
    };

    // Estado inativo e hover
    const inactiveStyles = {
      primary: "bg-black text-zinc-500 hover:text-white hover:bg-zinc-900",
      secondary: "bg-black text-zinc-500 hover:text-secondary hover:bg-secondary/10",
      accent: "bg-black text-zinc-500 hover:text-accent hover:bg-accent/10",
      danger: "bg-black text-zinc-500 hover:text-danger hover:bg-danger/10",
      warning: "bg-black text-zinc-500 hover:text-warning hover:bg-warning/10",
    };

    const focusStyles = {
      primary: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(255,255,255,0.5)]",
      secondary: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(0,255,65,0.5)]",
      accent: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(255,0,127,0.5)]",
      danger: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(220,38,38,0.5)]",
      warning: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(255,215,0,0.5)]",
    };

    return (
      <div ref={ref} className={cn("w-full flex flex-col", className)} {...props}>
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
                  borderStyles[variant],
                  isActive ? activeStyles[variant] : inactiveStyles[variant],
                  focusStyles[variant],
                  // Overlap visual fix
                  "-mb-0.5 z-10",
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

Tabs.displayName = "Tabs";
