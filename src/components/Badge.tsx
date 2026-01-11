import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface SigilBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "void" | "blood";
  size?: "sm" | "md";
  styleType?: "outline" | "solid";
}

export const SigilBadge = forwardRef<HTMLSpanElement, SigilBadgeProps>(
  (
    {
      children,
      variant = "void",
      size = "md",
      styleType = "outline",
      className,
      ...props
    },
    ref
  ) => {
    // Lógica de cores pré-calculada para clareza
    const isVoid = variant === "void";
    const isSolid = styleType === "solid";

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center border-2 font-serif uppercase tracking-widest transition-all duration-300 select-none whitespace-nowrap",
          // Sizes
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-sm",

          // Color Logic Map
          isSolid
            ? isVoid
              ? "bg-white text-black border-white"
              : "bg-red-900 text-white border-red-900"
            : isVoid
            ? "text-white border-white bg-black"
            : "text-red-600 border-red-900 bg-black",

          "hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SigilBadge.displayName = "SigilBadge";
