"use client";

import { cn } from "../utils/cn";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface CryptModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: "void" | "blood";
}

export const CryptModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  variant = "void",
  className = "",
  ...props
}: CryptModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);

  // Captura quem abriu o modal para restaurar o foco ao fechar
  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement;
    }
  }, [isOpen]);

  // Setup de foco inicial e trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const container = modalRef.current;

    // Lista de elementos focáveis
    const getFocusable = () => {
      const nodes = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      return Array.from(nodes).filter((el) => !el.hasAttribute("disabled"));
    };

    // Foco inicial: container, senão primeiro focável
    const focusInitial = () => {
      if (container) {
        container.focus();
        return;
      }
      const focusable = getFocusable();
      focusable[0]?.focus();
    };

    focusInitial();

    // Impede fuga de foco para fora do modal
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        // Se não houver elementos focáveis, mantém foco no container
        e.preventDefault();
        container.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // Se Shift+Tab no primeiro, volta para o último
      if (e.shiftKey) {
        if (
          document.activeElement === first ||
          document.activeElement === container
        ) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab no último, volta para o primeiro
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    // Evita que o foco saia do modal por meios não-Tab (mouse/assistivas)
    const onFocusOut = (e: FocusEvent) => {
      if (!modalRef.current) return;
      const container = modalRef.current;
      // Se o novo foco não está dentro do modal, redireciona para o primeiro focável
      if (e.relatedTarget && !container.contains(e.relatedTarget as Node)) {
        const focusable = getFocusable();
        (focusable[0] || container).focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    container.addEventListener("focusout", onFocusOut);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      container.removeEventListener("focusout", onFocusOut);
    };
  }, [isOpen, onClose]);

  // Restaura foco ao fechar
  useEffect(() => {
    if (!isOpen && openerRef.current instanceof HTMLElement) {
      openerRef.current.focus();
    }
  }, [isOpen]);

  // Bloqueia scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crypt-modal-title"
      aria-describedby="crypt-modal-description"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-none"
        onClick={onClose}
      />
      {/* Modal Card */}
      <div
        className={cn(
          "relative bg-black border-2",
          // Border color
          variant === "void" ? "border-white" : "border-red-900",
          "p-8 transition-all duration-300",
          // Shadow style
          variant === "void"
            ? "shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
            : "shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
          "max-w-lg w-full mx-4",
          className
        )}
        {...props}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className={cn(
            "absolute top-4 right-4",
            // Icon color
            variant === "void" ? "text-white" : "text-red-600",
            "hover:opacity-70 transition-opacity duration-300"
          )}
        >
          <X size={24} strokeWidth={1.5} />
        </button>
        <h2
          id="crypt-modal-title"
          className="font-serif text-2xl uppercase tracking-tighter text-white mb-2"
        >
          {title}
        </h2>
        {description && (
          <p
            id="crypt-modal-description"
            className="text-zinc-500 text-sm mb-6 font-sans leading-relaxed"
          >
            {description}
          </p>
        )}
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};
