"use client";

import { MoreVertical } from "lucide-react";
import React, {
  forwardRef,
  useEffect,
  useRef,
  cloneElement,
  isValidElement,
  useState,
  useCallback,
} from "react";
import { cn } from "../utils/cn";

export interface AltarMenuItem {
  /** Identificador único do item. */
  id: string;
  /** Texto do item. */
  label: string;
  /** Ícone opcional à esquerda. */
  icon?: React.ReactNode;
  /** Ação ao clicar. */
  onClick: () => void;
  /** Indica ação destrutiva (vermelho). */
  danger?: boolean;
  /** Desabilita o item. */
  disabled?: boolean;
}

interface AltarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lista de itens do menu. */
  items: Array<{
    /** Identificador único do item. */
    id: string;
    /** Texto do item. */
    label: string;
    /** Ícone opcional à esquerda. */
    icon?: React.ReactNode;
    /** Ação ao clicar. */
    onClick: () => void;
    /** Indica ação destrutiva (vermelho). */
    danger?: boolean;
    /** Desabilita o item. */
    disabled?: boolean;
  }>;
  /** Tema visual: 'void' (Padrão) ou 'blood' (Crítico). */
  variant?: "void" | "blood";
  /** Elemento gatilho opcional. Se omitido, usa ícone padrão. */
  trigger?: React.ReactNode;
  /** Alinhamento do dropdown. */
  align?: "left" | "right";
}

/**
 * Menu Dropdown acessível.
 *
 * **Comportamento de Teclado:**
 * - `Enter` / `Espaço`: Abre o menu (se focado no gatilho) ou ativa item.
 * - `Setas (Cima/Baixo)`: Navega entre os itens e previne scroll da página.
 * - `Home` / `End`: Vai para o primeiro ou último item.
 * - `Esc`: Fecha o menu e retorna foco ao gatilho.
 * - `Tab`: Fecha o menu e segue fluxo natural da página.
 */
export const AltarMenu = forwardRef<HTMLButtonElement, AltarMenuProps>(
  (
    { items, variant = "void", trigger, align = "right", className, ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    // Refs para elementos do DOM
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Rastreia se a abertura foi via teclado para gerenciamento de foco inteligente
    const wasOpenedByKeyboard = useRef(false);

    // 1. Fechar ao clicar fora (Click Outside)
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    // 2. Focar no primeiro item quando abrir
    useEffect(() => {
      if (isOpen) {
        // setTimeout zero joga para o final da fila de execução do JS, garantindo que o DOM renderizou
        const timer = setTimeout(() => {
          const firstItem = menuRef.current?.querySelector(
            '[role="menuitem"]:not([disabled])',
          ) as HTMLElement;
          firstItem?.focus();
        }, 0);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    // 3. O "Cérebro" da Navegação - Centralizado no Container
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        // Se estiver fechado, permite abrir com Enter/Espaço/Seta Baixo
        if (!isOpen) {
          if (["Enter", " ", "ArrowDown"].includes(event.key)) {
            event.preventDefault();
            wasOpenedByKeyboard.current = true;
            setIsOpen(true);
          }
          return;
        }

        // --- Lógica quando está ABERTO ---

        const menuItems = Array.from(
          menuRef.current?.querySelectorAll(
            '[role="menuitem"]:not([disabled])',
          ) || [],
        ) as HTMLElement[];

        const activeElement = document.activeElement as HTMLElement;
        const currentIndex = menuItems.indexOf(activeElement);

        // Se o foco não está nos itens (ex: está no trigger por causa de um clique),
        // considera o índice -1

        switch (event.key) {
          case "Escape":
            event.preventDefault();
            event.stopPropagation(); // Impede que feche modais pais se houver
            setIsOpen(false);
            // Retorna o foco para o gatilho ao fechar via teclado
            triggerRef.current?.focus();
            break;

          case "ArrowDown":
            event.preventDefault();
            if (currentIndex === -1) {
              // Se foco está no botão, vai para o primeiro
              menuItems[0]?.focus();
            } else {
              const nextIndex = (currentIndex + 1) % menuItems.length;
              menuItems[nextIndex]?.focus();
            }
            break;

          case "ArrowUp":
            event.preventDefault();
            if (currentIndex === -1) {
              // Se foco está no botão, vai para o último
              menuItems[menuItems.length - 1]?.focus();
            } else {
              const prevIndex =
                (currentIndex - 1 + menuItems.length) % menuItems.length;
              menuItems[prevIndex]?.focus();
            }
            break;

          case "Home":
            event.preventDefault();
            menuItems[0]?.focus();
            break;

          case "End":
            event.preventDefault();
            menuItems[menuItems.length - 1]?.focus();
            break;

          case "Tab":
            // Tab deve fechar o menu e seguir o fluxo natural, sem preventDefault
            setIsOpen(false);
            break;

          case "Enter":
          case " ": // Space
            // Se o foco está no trigger e aperta enter, fecha (toggle)
            // Se o foco está num item, o click nativo do button já resolve, não precisamos fazer nada
            if (activeElement === triggerRef.current) {
              event.preventDefault();
              setIsOpen(false);
            }
            break;
        }
      },
      [isOpen],
    );

    // Props para o Gatilho (Trigger)
    const triggerProps = {
      onClick: (e: React.MouseEvent) => {
        // Previne comportamento duplo se estiver dentro de forms
        e.preventDefault();
        setIsOpen((prev) => !prev);
      },
      // Acessibilidade ARIA
      "aria-haspopup": "menu" as const,
      "aria-expanded": isOpen,
      "aria-controls": "altar-menu-list",
      type: "button" as const, // Importante para não submeter formulários
    };

    // Renderização do Trigger
    let triggerElement: React.ReactNode;

    if (isValidElement(trigger)) {
      triggerElement = cloneElement(trigger as React.ReactElement<any>, {
        ...triggerProps,
        ref: (node: HTMLButtonElement) => {
          triggerRef.current = node;
          // Merge de refs seguro
          const originalRef = (trigger as any).ref;
          if (typeof originalRef === "function") originalRef(node);
          else if (originalRef) originalRef.current = node;

          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
              node;
        },
      });
    } else {
      triggerElement = (
        <button
          ref={(node) => {
            triggerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref)
              (
                ref as React.MutableRefObject<HTMLButtonElement | null>
              ).current = node;
          }}
          {...triggerProps}
          className={cn(
            "p-2 border-2 transition-all duration-300 flex items-center justify-center",
            variant === "void"
              ? "border-white bg-black text-white"
              : "border-red-900 bg-black text-red-600",
            "hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
            "focus-visible:outline-none focus-visible:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]",
          )}
        >
          {trigger || <MoreVertical size={20} />}
        </button>
      );
    }

    return (
      <div
        className={cn("relative inline-block text-left", className)}
        ref={containerRef}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {triggerElement}

        {/* Menu Dropdown */}
        <div
          id="altar-menu-list"
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1} // Permite focar via script, mas não via tab
          className={cn(
            "absolute mt-2 z-50 bg-black border-2 min-w-[200px] origin-top-right outline-none",
            "flex flex-col py-1",
            align === "right" ? "right-0" : "left-0",
            // Animação e Visibilidade
            isOpen
              ? "opacity-100 scale-100 visible transition-all duration-100 ease-out"
              : "opacity-0 scale-95 invisible pointer-events-none duration-75 ease-in",
            // Cores
            variant === "void"
              ? "border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
              : "border-red-900 shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              role="menuitem"
              disabled={item.disabled}
              // TabIndex -1 retira da ordem do Tab (navegação via setas)
              tabIndex={-1}
              onClick={(e) => {
                // Impede propagação para não reativar o trigger imediatamente em casos raros
                e.stopPropagation();
                if (item.disabled) return;
                item.onClick();
                setIsOpen(false);
                triggerRef.current?.focus(); // Retorna foco ao trigger após ação
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 font-sans text-sm transition-colors duration-200 group text-left outline-none cursor-pointer",
                // Cores Base
                variant === "void"
                  ? "text-zinc-400 hover:text-white hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white"
                  : "text-zinc-400 hover:text-red-500 hover:bg-red-950/30 focus:bg-red-950/30 focus:text-red-500",
                // Danger
                item.danger &&
                  "text-red-600 hover:text-red-500 hover:bg-red-900/20 focus:text-red-500 focus:bg-red-900/20",
                // Disabled
                item.disabled &&
                  "opacity-50 cursor-not-allowed pointer-events-none",
              )}
            >
              {item.icon && (
                <span
                  className={cn(
                    "opacity-70 group-hover:opacity-100 group-focus:opacity-100",
                    item.danger
                      ? "text-red-600"
                      : variant === "void"
                        ? "text-white"
                        : "text-red-600",
                  )}
                >
                  {item.icon}
                </span>
              )}
              <span className="tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  },
);

AltarMenu.displayName = "AltarMenu";
