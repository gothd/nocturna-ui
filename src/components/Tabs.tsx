"use client";

import React, { forwardRef, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";
import {
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLineHeight,
} from "../utils/tokens";

export interface TabsProps
  extends Omit<SystemProps, "as">, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Array de objetos que definem as abas.
   * Cada objeto deve conter `{ id, label, content }`.
   */
  tabs: Array<{
    /** Identificador único da aba. Se omitido, será gerado pelo índice. */
    id?: string;
    /** Texto exibido no botão da aba. */
    label: string;
    /** Conteúdo renderizado quando a aba está ativa. */
    content: React.ReactNode;
  }>;

  /**
   * Define o tema visual.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";

  /**
   * Se verdadeiro, transforma o texto das abas em caixa alta.
   * @default true
   */
  uppercase?: boolean;

  /**
   * Define a família da fonte dos botões das abas.
   * @default "serif"
   */
  fontFamily?: SystemProps["fontFamily"];

  /**
   * Define o tamanho da fonte dos botões das abas.
   * @default "base"
   */
  fontSize?: SystemProps["fontSize"];

  /**
   * Define o peso da fonte dos botões das abas.
   * @default "normal"
   */
  fontWeight?: SystemProps["fontWeight"];

  /**
   * Define a altura da linha dos botões das abas.
   * @default "normal"
   */
  lineHeight?: SystemProps["lineHeight"];

  /**
   * Define a cor do texto dos botões das abas.
   * Se não definido, herda da variante.
   */
  color?: SystemProps["color"];
}

/**
 * Componente de navegação em abas acessível.
 *
 * **Features:**
 * - **Acessibilidade de Teclado:** Suporte completo para navegação com setas (Esquerda/Direita).
 * - **Animações:** Transição suave (fade/slide) ao trocar de conteúdo.
 * - **ARIA:** Roles e atributos corretos (`tablist`, `tab`, `tabpanel`).
 *
 * Possui bordas sobrepostas para criar um efeito de lista contínua.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      variant = "primary",
      uppercase = true,
      fontFamily = "serif",
      fontSize = "base",
      fontWeight = "normal",
      lineHeight = "normal",
      textAlign = "center",
      color,
      className,
      ...props
    },
    ref,
  ) => {
    // Helper para garantir ID consistente mesmo se não fornecido
    const getTabId = (index: number) => tabs[index].id || `tab-${index}`;
    const [activeTab, setActiveTab] = useState(getTabId(0));
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const { systemStyle, domProps } = extractSystemStyles(props);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (index + 1) % tabs.length;
        tabRefs.current[nextIndex]?.focus();
        setActiveTab(getTabId(nextIndex));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (index - 1 + tabs.length) % tabs.length;
        tabRefs.current[prevIndex]?.focus();
        setActiveTab(getTabId(prevIndex));
      }
    };

    const borderStyles = {
      primary: "border-white",
      secondary: "border-secondary",
      accent: "border-accent",
      danger: "border-danger",
      warning: "border-warning",
      ghost: "border-transparent",
    };

    const activeStyles = {
      primary: "bg-white text-black",
      secondary: "bg-secondary text-black",
      accent: "bg-accent text-black",
      danger: "bg-danger text-black",
      warning: "bg-warning text-black",
      ghost: "border-zinc-700 bg-black text-zinc-100",
    };

    // Estado inativo e hover
    const inactiveStyles = {
      primary: "bg-black text-zinc-500 hover:text-white hover:bg-zinc-900",
      secondary: "bg-black text-zinc-500 hover:text-secondary hover:bg-secondary/10",
      accent: "bg-black text-zinc-500 hover:text-accent hover:bg-accent/10",
      danger: "bg-black text-zinc-500 hover:text-danger hover:bg-danger/10",
      warning: "bg-black text-zinc-500 hover:text-warning hover:bg-warning/10",
      ghost:
        "bg-transparent text-zinc-500 hover:border-zinc-700 hover:bg-black hover:text-zinc-300",
    };

    const focusStyles = {
      primary: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(255,255,255,0.5)]",
      secondary: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(0,255,65,0.5)]",
      accent: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(255,0,127,0.5)]",
      danger: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(220,38,38,0.5)]",
      warning: "focus-visible:shadow-[inset_0_0_0_2px_#000,0_0_20px_rgba(255,215,0,0.5)]",
      ghost: "focus-visible:border-zinc-700 focus-visible:bg-black focus-visible:text-white",
    };

    return (
      <div
        ref={ref}
        className={cn("w-full flex flex-col", className)}
        style={systemStyle}
        {...domProps}
      >
        <div
          className="flex border-b-2 border-zinc-900 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="tablist"
          aria-label="Abas"
        >
          {tabs.map((tab, index) => {
            const tabId = getTabId(index);
            const isActive = activeTab === tabId;
            return (
              <button
                key={tabId}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tabId}`}
                id={tabId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tabId)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "px-6 py-2 tracking-widest border-2 border-b-0 whitespace-nowrap",
                  uppercase && "uppercase",
                  "transition-all duration-300 focus:outline-none flex-shrink-0", // flex-shrink-0 evita quebra
                  borderStyles[variant],
                  isActive ? activeStyles[variant] : inactiveStyles[variant],
                  focusStyles[variant],
                  // Overlap visual fix
                  "-mb-0.5 z-10",
                  // Horizontal overlap
                  index > 0 && "-ml-0.5",
                )}
                style={{
                  fontFamily: getFontFamily(fontFamily),
                  fontSize: getFontSize(fontSize),
                  fontWeight: getFontWeight(fontWeight),
                  lineHeight: getLineHeight(lineHeight),
                  textAlign,
                  color: getColor(color),
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="py-6 min-h-[100px] relative">
          {tabs.map((tab, index) => {
            const tabId = getTabId(index);
            return (
              <div
                key={tabId}
                id={`panel-${tabId}`}
                role="tabpanel"
                aria-labelledby={tabId}
                hidden={activeTab !== tabId}
                className={cn(
                  "text-zinc-500 font-sans leading-relaxed outline-none",
                  activeTab === tabId
                    ? "animate-in fade-in slide-in-from-bottom-2 duration-500"
                    : "hidden",
                )}
                tabIndex={0}
              >
                {tab.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

Tabs.displayName = "Tabs";
