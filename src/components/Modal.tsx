"use client";

import { cn } from "../utils/cn";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { createPortal } from "react-dom";

interface CryptModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: "void" | "blood";
}

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

    // Atualiza a ref sempre que a prop onClose mudar, sem disparar o efeito principal
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
        // DEVOLVE o foco ao fechar
        if (lastFocusedElement.current) {
          lastFocusedElement.current.focus();
        }
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    // Focus Trap & Escape (Global Listener)
    useEffect(() => {
      if (!isOpen || !internalRef.current) return;

      const modal = internalRef.current;
      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Foca no primeiro elemento APENAS ao abrir (Mount do efeito)
      const focusTimeout = setTimeout(() => {
        if (firstElement) {
          firstElement.focus();
        } else {
          modal.focus();
        }
      }, 10);

      const handleKeyDown = (e: KeyboardEvent) => {
        // ESCAPE (Usa a ref para garantir a versão mais recente da função)
        if (e.key === "Escape") {
          e.preventDefault();
          onCloseRef.current();
          return;
        }

        // TAB (Trap)
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
        aria-labelledby="crypt-modal-title"
        aria-describedby={description ? "crypt-modal-desc" : undefined}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
          onClick={() => onCloseRef.current()}
          aria-hidden="true"
        />

        <div
          // Ref Merge
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                node;
            }
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

          <h2
            id="crypt-modal-title"
            className={cn(
              "font-serif text-2xl uppercase tracking-tighter mb-2 pr-8",
              variant === "void" ? "text-white" : "text-red-600",
            )}
          >
            {title}
          </h2>

          {description && (
            <p
              id="crypt-modal-desc"
              className="text-zinc-500 text-sm mb-6 font-sans leading-relaxed"
            >
              {description}
            </p>
          )}

          <div className="mt-4 text-zinc-400">{children}</div>
        </div>
      </div>,
      document.body,
    );
  },
);

CryptModal.displayName = "CryptModal";
