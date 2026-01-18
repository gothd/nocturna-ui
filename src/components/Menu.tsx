"use client";

import { MoreVertical } from "lucide-react";
import React, {
  forwardRef,
  useEffect,
  useRef,
  cloneElement,
  isValidElement,
  useState,
} from "react";
import { cn } from "../utils/cn";

interface AltarMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

interface AltarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AltarMenuItem[];
  variant?: "void" | "blood";
  trigger?: React.ReactNode;
  align?: "left" | "right";
}

export const AltarMenu = forwardRef<HTMLButtonElement, AltarMenuProps>(
  (
    { items, variant = "void", trigger, align = "right", className, ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const prevIsOpen = useRef(isOpen);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Fecha ao clicar fora
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Gestão de Foco: Menu Aberto -> Foca item; Menu Fechado -> Retorna ao Trigger
    useEffect(() => {
      if (isOpen && !prevIsOpen.current) {
        // Pequeno delay para garantir renderização antes do foco
        requestAnimationFrame(() => {
          const firstItem = menuRef.current?.querySelector(
            '[role="menuitem"]:not([disabled])',
          ) as HTMLElement;
          firstItem?.focus();
        });
      } else if (!isOpen && prevIsOpen.current) {
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      }
      prevIsOpen.current = isOpen;
    }, [isOpen]);

    // Navegação Teclado (Setas, Home, End, Esc)
    const handleMenuKeyDown = (event: React.KeyboardEvent) => {
      if (!isOpen) return;

      const menuItems = Array.from(
        menuRef.current?.querySelectorAll(
          '[role="menuitem"]:not([disabled])',
        ) || [],
      ) as HTMLElement[];
      const currentIndex = menuItems.indexOf(
        document.activeElement as HTMLElement,
      );

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          break;
        case "ArrowDown":
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % menuItems.length;
          menuItems[nextIndex]?.focus();
          break;
        case "ArrowUp":
          event.preventDefault();
          const prevIndex =
            (currentIndex - 1 + menuItems.length) % menuItems.length;
          menuItems[prevIndex]?.focus();
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
          setIsOpen(false);
          break;
      }
    };

    // Props comuns de acessibilidade e evento que todo trigger precisa ter
    const triggerProps = {
      onClick: () => setIsOpen(!isOpen),
      "aria-haspopup": "menu",
      "aria-expanded": isOpen,
      "aria-controls": "altar-menu-list",
    } as const;

    let triggerElement: React.ReactNode;

    // Se um componente React válido foi passado (ex: VoidButton)
    if (isValidElement(trigger)) {
      triggerElement = cloneElement(trigger as React.ReactElement<any>, {
        ...triggerProps,
        // Ref Merge manual: Preserva a ref do VoidButton e injeta a triggerRef
        ref: (node: HTMLButtonElement) => {
          triggerRef.current = node;
          // Lida com a ref que pode vir no componente original
          const originalRef = (trigger as any).ref;
          if (typeof originalRef === "function") originalRef(node);
          else if (originalRef) originalRef.current = node;

          // Lida com a ref externa passada para o AltarMenu
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
              node;
        },
      });
    } else {
      // Fallback padrão (Botão quadrado com ícone)
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
            variant === "void"
              ? "focus-visible:outline-none focus-visible:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
              : "focus-visible:outline-none focus-visible:shadow-[4px_4px_0px_0px_rgba(136,8,8,0.5)]",
          )}
        >
          {trigger || <MoreVertical size={20} strokeWidth={1.5} />}
        </button>
      );
    }

    return (
      <div
        className={cn("relative inline-block", className)}
        ref={containerRef}
        {...props}
      >
        {triggerElement}

        <div
          id="altar-menu-list"
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          onKeyDown={handleMenuKeyDown}
          className={cn(
            "absolute mt-2 z-50 bg-black border-2 min-w-[200px] transition-all duration-200 origin-top-right outline-none",
            align === "right" ? "right-0" : "left-0",
            // Visibility State
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible pointer-events-none",
            // Variant Colors & Shadows
            variant === "void"
              ? "border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
              : "border-red-900 shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
          )}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                item.onClick();
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 font-sans text-sm transition-all duration-200 group text-left",
                // Base colors
                variant === "void"
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-400 hover:text-red-500",
                // Hover Background
                variant === "void"
                  ? "hover:bg-zinc-900"
                  : "hover:bg-red-950/30",
                // Danger variant override
                item.danger &&
                  "text-red-600 hover:text-red-500 hover:bg-red-900/20",
                // Disabled State
                item.disabled &&
                  "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-zinc-400",
                // Separator Logic
                index !== items.length - 1 &&
                  (variant === "void"
                    ? "border-b border-zinc-900"
                    : "border-b border-red-900/30"),
                // Keyboard Focus Style
                "focus:outline-none focus:bg-zinc-900 focus:text-white",
              )}
            >
              {item.icon && (
                <span
                  className={cn(
                    "opacity-70 transition-opacity group-hover:opacity-100",
                    item.danger
                      ? "text-red-500"
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
