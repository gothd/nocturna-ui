import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface VoidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "void" | "blood";
  size?: "sm" | "md" | "lg";
}

export const VoidButton = forwardRef<HTMLButtonElement, VoidButtonProps>(
  (
    {
      variant = "void",
      size = "md",
      className,
      type = "button", // Default seguro para evitar submits acidentais
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "border-2 font-serif uppercase tracking-widest transition-all duration-300 relative select-none",
          // Layout & Size
          "flex items-center justify-center",
          size === "sm" && "px-3 py-1 text-xs",
          size === "md" && "px-6 py-2 text-sm",
          size === "lg" && "px-10 py-4 text-base",
          // Color Variants
          variant === "void"
            ? "border-white text-white hover:bg-white hover:text-black"
            : "border-red-900 text-red-600 hover:bg-red-900 hover:text-white",
          // Focus Styles (Acessibilidade via Teclado)
          "focus:outline-none",
          variant === "void"
            ? "focus-visible:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]"
            : "focus-visible:shadow-[6px_6px_0px_0px_rgba(136,8,8,0.6)]",
          // Disabled State
          disabled &&
            "opacity-50 cursor-not-allowed hover:shadow-none hover:bg-transparent hover:text-inherit pointer-events-none",
          className
        )}
        {...props}
      />
    );
  }
);

VoidButton.displayName = "VoidButton";
