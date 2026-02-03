"use client";

import { MoreVertical } from "lucide-react";
import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";

export interface MenuProps
  extends Omit<SystemProps, "as">, Omit<React.HTMLAttributes<HTMLButtonElement>, "color"> {
  /** Lista de itens do menu. */
  items: Array<{
    /** Identificador único do item. Se omitido, será gerado pelo índice. */
    id?: string;
    /** Texto do item. */
    label: string;
    /** Ícone opcional à esquerda. */
    icon?: React.ReactNode;
    /** Ação ao clicar. */
    onClick: () => void;
    /** Indica ação destrutiva. */
    danger?: boolean;
    /** Desabilita o item. */
    disabled?: boolean;
  }>;
  /**
   * Define o tema visual do menu.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "ghost";
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
export const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  ({ items, variant = "primary", trigger, align = "right", className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    // Refs para elementos do DOM
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    // Rastreia se a abertura foi via teclado para gerenciamento de foco inteligente
    const wasOpenedByKeyboard = useRef(false);
    const { systemStyle, domProps } = extractSystemStyles(props);

    // Fechar ao clicar fora (Click Outside)
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

    // Focar no primeiro item quando abrir
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

    // O "Cérebro" da Navegação - Centralizado no Container
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
          menuRef.current?.querySelectorAll('[role="menuitem"]:not([disabled])') || [],
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
              const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
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
            // Se o foco está num item, o click nativo do button já resolve, não precisa fazer nada
            if (activeElement === triggerRef.current) {
              event.preventDefault();
              setIsOpen(false);
            }
            break;
        }
      },
      [isOpen],
    );

    // Mapeamento de estilos
    const triggerStyles = {
      primary:
        "border-primary bg-black text-primary hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] focus-visible:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]",
      secondary:
        "border-secondary bg-black text-secondary hover:shadow-[4px_4px_0px_0px_rgba(0,255,65,0.1)] focus-visible:shadow-[4px_4px_0px_0px_rgba(0,255,65,0.3)]",
      accent:
        "border-accent bg-black text-accent hover:shadow-[4px_4px_0px_0px_rgba(255,0,127,0.1)] focus-visible:shadow-[4px_4px_0px_0px_rgba(255,0,127,0.3)]",
      danger:
        "border-danger bg-black text-danger hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,0.1)] focus-visible:shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]",
      warning:
        "border-warning bg-black text-warning hover:shadow-[4px_4px_0px_0px_rgba(255,215,0,0.1)] focus-visible:shadow-[4px_4px_0px_0px_rgba(255,215,0,0.3)]",
      ghost:
        "border-transparent bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] focus-visible:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
    };

    const menuBorderStyles = {
      primary: "border-primary shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
      secondary: "border-secondary shadow-[8px_8px_0px_0px_rgba(0,255,65,0.2)]",
      accent: "border-accent shadow-[8px_8px_0px_0px_rgba(255,0,127,0.2)]",
      danger: "border-danger shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]",
      warning: "border-warning shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]",
      ghost: "border-zinc-800 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
    };

    // Usamos opacidade no background para dar efeito neon sem perder legibilidade
    const itemInteractionStyles = {
      primary: "hover:bg-zinc-900 hover:text-white focus:bg-zinc-900 focus:text-white",
      secondary:
        "hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary",
      accent: "hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent",
      danger: "hover:bg-danger/10 hover:text-danger focus:bg-danger/10 focus:text-danger",
      warning: "hover:bg-warning/10 hover:text-warning focus:bg-warning/10 focus:text-warning",
      ghost: "hover:bg-zinc-900 hover:text-white focus:bg-zinc-900 focus:text-white",
    };

    const separatorStyles = {
      primary: "border-b border-zinc-900",
      secondary: "border-b border-secondary/20",
      accent: "border-b border-accent/20",
      danger: "border-b border-danger/20",
      warning: "border-b border-warning/20",
      ghost: "border-b border-zinc-800",
    };

    // Props para o Gatilho (Trigger)
    const triggerProps = {
      ...domProps, // Aplica props do usuário (id, aria-label, etc) no botão
      onClick: (e: React.MouseEvent) => {
        domProps.onClick?.(e as any); // Garante que o onClick do usuário também dispare
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
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        },
      });
    } else {
      triggerElement = (
        <button
          ref={(node) => {
            triggerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          }}
          {...triggerProps}
          className={cn(
            "p-2 border-2 transition-all duration-300 flex items-center justify-center focus-visible:outline-none",
            triggerStyles[variant],
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
        style={systemStyle}
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
            menuBorderStyles[variant],
          )}
        >
          {items.map((item, index) => {
            const itemId = item.id || `item-${index}`;

            return (
              <button
                key={itemId}
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
                  "w-full flex items-center gap-3 px-4 py-3 font-sans text-sm transition-colors duration-200 group text-left focus:outline-none cursor-pointer",
                  "text-zinc-400", // Cor Base
                  // Estilos de interação (hover + focus)
                  itemInteractionStyles[variant],
                  // Danger override
                  item.danger &&
                    "text-danger hover:text-danger hover:bg-danger/10 focus:text-danger focus:bg-danger/10",
                  // Disabled state
                  item.disabled &&
                    "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-zinc-400 pointer-events-none",
                  // Separator
                  index !== items.length - 1 && separatorStyles[variant],
                )}
              >
                {item.icon && (
                  <span
                    className={cn(
                      "opacity-70 group-hover:opacity-100 transition-opacity",
                      // Herda a cor do hover do pai via group-hover ou força danger
                      item.danger ? "text-danger" : "text-inherit",
                    )}
                  >
                    {item.icon}
                  </span>
                )}
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

Menu.displayName = "Menu";
