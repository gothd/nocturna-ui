"use client";

import { cn } from "../utils/cn";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { createPortal } from "react-dom";

interface CryptModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controla a visibilidade do modal.
   * O componente é renderizado via React Portal no `document.body`.
   */
  isOpen: boolean;

  /**
   * Função chamada quando o modal solicita fechamento.
   * Disparada por: tecla ESC, clique no overlay ou clique no botão 'X'.
   */
  onClose: () => void;

  /**
   * Título principal do modal.
   * Se fornecido, renderiza um `h2` padrão e configura `aria-labelledby`.
   * Se omitido, você deve fornecer seu próprio cabeçalho dentro de `children` para acessibilidade visual.
   */
  title?: string;

  /**
   * Descrição opcional abaixo do título.
   * Usada automaticamente para o atributo `aria-describedby`.
   */
  description?: string;

  /**
   * Conteúdo interno do modal.
   */
  children?: React.ReactNode;

  /**
   * Define o tema visual.
   * - `void`: Monocromático (Borda Branca).
   * - `blood`: Tema de alerta/erro (Borda Vermelha).
   * @default "void"
   */
  variant?: "void" | "blood";
}

/**
 * Modal acessível com estética brutalista (Crypt).
 *
 * **Features Automáticas:**
 * - **Focus Trap:** Mantém o foco do teclado preso dentro do modal.
 * - **Scroll Lock:** Impede a rolagem da página de fundo.
 * - **Close on ESC:** Fecha ao pressionar Escape.
 */
export const CryptModal = forwardRef<HTMLDivElement, CryptModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      variant = "void",
      className,
      ...props
    },
    ref,
  ) => {
    // Refs
    const internalRef = useRef<HTMLDivElement | null>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);
    const onCloseRef = useRef(onClose);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    // Atualiza a ref sempre que a prop onClose mudar
    useEffect(() => {
      onCloseRef.current = onClose;
    }, [onClose]);

    // Bloqueia Scroll do Body & Salva Foco Anterior
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        if (document.activeElement instanceof HTMLElement) {
          lastFocusedElement.current = document.activeElement;
        }
      } else {
        document.body.style.overflow = "unset";
        if (lastFocusedElement.current) {
          lastFocusedElement.current.focus();
        }
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    // Focus Trap & Escape
    useEffect(() => {
      if (!isOpen || !internalRef.current) return;

      const modal = internalRef.current;
      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const focusTimeout = setTimeout(() => {
        if (firstElement) {
          firstElement.focus();
        } else {
          modal.focus();
        }
      }, 10);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onCloseRef.current();
          return;
        }

        if (e.key === "Tab") {
          if (focusableElements.length === 0) {
            e.preventDefault();
            return;
          }

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        clearTimeout(focusTimeout);
      };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "crypt-modal-title" : undefined}
        aria-describedby={description ? "crypt-modal-desc" : undefined}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
          onClick={() => onCloseRef.current()}
          aria-hidden="true"
        />

        <div
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref)
              (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                node;
          }}
          tabIndex={-1}
          className={cn(
            "relative bg-black border-2 w-full max-w-lg mx-auto p-8 shadow-2xl animate-in zoom-in-95 duration-200 outline-none",
            variant === "void"
              ? "border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
              : "border-red-900 shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
            className,
          )}
          {...props}
        >
          <button
            onClick={() => onCloseRef.current()}
            aria-label="Fechar modal"
            className={cn(
              "absolute top-4 right-4 p-1 transition-all duration-300 focus:outline-none",
              variant === "void"
                ? "text-white hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black"
                : "text-red-600 hover:bg-red-900 hover:text-white focus-visible:bg-red-900 focus-visible:text-white",
            )}
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {title && (
            <h2
              id="crypt-modal-title"
              className={cn(
                "font-serif text-2xl uppercase tracking-tighter mb-2 pr-8",
                variant === "void" ? "text-white" : "text-red-600",
              )}
            >
              {title}
            </h2>
          )}

          {description && (
            <p
              id="crypt-modal-desc"
              className="text-zinc-500 text-sm mb-6 font-sans leading-relaxed"
            >
              {description}
            </p>
          )}

          <div className={cn(title && "mt-4", "text-zinc-400")}>{children}</div>
        </div>
      </div>,
      document.body,
    );
  },
);

CryptModal.displayName = "CryptModal";
