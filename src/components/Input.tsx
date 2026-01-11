import React, { forwardRef, useId } from "react";
import { cn } from "../utils/cn";

interface VeinInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "void" | "blood";
  size?: "sm" | "md";
  label?: string;
  error?: string;
}

export const VeinInput = forwardRef<HTMLInputElement, VeinInputProps>(
  (
    { variant = "void", size = "md", label, error, className, ...props },
    ref
  ) => {
    // Gera um ID único para garantir vínculo label-input mesmo sem ID manual
    const generatedId = useId();
    const inputId = props.id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "font-serif uppercase tracking-widest cursor-pointer",
              size === "sm" ? "text-xs" : "text-sm",
              variant === "void" ? "text-white" : "text-red-600"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "bg-black border-2 font-sans text-sm transition-all duration-300",
            "placeholder:text-zinc-600 focus:outline-none",
            // Border & Error Logic
            error
              ? "border-red-600 animate-pulse focus:border-red-600"
              : variant === "void"
              ? "border-white focus:border-white"
              : "border-red-900 focus:border-red-900",
            // Size
            size === "sm" ? "px-2 py-1.5 text-xs" : "px-4 py-3 text-sm",
            // Text Color
            variant === "void" ? "text-white" : "text-red-600",
            // Focus Shadow (Acessibilidade visual de foco)
            variant === "void"
              ? "focus:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
              : "focus:shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
            className
          )}
          {...props}
        />
        {error && (
          <span
            id={errorId}
            role="alert"
            className="text-red-600 font-sans text-xs mt-1 font-medium tracking-wide"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

VeinInput.displayName = "VeinInput";
