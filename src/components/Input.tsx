import { cn } from "../utils/cn";
import React from "react";

interface VeinInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "void" | "blood";
  size?: "sm" | "md";
  label?: string;
  error?: string;
  inputSize?: React.InputHTMLAttributes<HTMLInputElement>["size"];
}

export const VeinInput = ({
  variant = "void",
  size = "md",
  label,
  error,
  className,
  inputSize,
  ...props
}: VeinInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={cn(
            "font-serif",
            size === "sm" ? "text-xs" : "text-sm",
            "uppercase tracking-widest",
            // Text style
            variant === "void" ? "text-white" : "text-red-600"
          )}
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          "bg-black border-2",
          // Border style
          error
            ? // Error border
              "border-red-600 animate-pulse"
            : variant === "void"
            ? "border-white"
            : "border-red-900",
          // Size style
          size === "sm" ? "px-2 py-1.5 text-xs" : "px-4 py-3 text-sm",
          // Text style
          variant === "void" ? "text-white" : "text-red-600",
          "placeholder:text-zinc-600 font-sans text-sm transition-all duration-300",
          // Focus style
          variant === "void"
            ? "focus:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
            : "focus:shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
          "focus:outline-none",
          className
        )}
        size={inputSize}
        {...props}
      />
      {error && (
        <span className="text-red-600 font-sans text-xs mt-1">{error}</span>
      )}
    </div>
  );
};
