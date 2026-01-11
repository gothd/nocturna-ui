import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface AbyssSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "void" | "blood";
  label?: string;
  as?: React.ElementType;
}

export const AbyssSeparator = forwardRef<HTMLDivElement, AbyssSeparatorProps>(
  (
    { variant = "void", label, as: Component = "div", className, ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        role={!label ? "separator" : undefined}
        className={cn(
          "relative flex items-center py-8 w-full select-none",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex-grow border-t-2 transition-colors duration-300",
            variant === "void" ? "border-white" : "border-red-900"
          )}
        />
        {label && (
          <span
            className={cn(
              "flex-none px-4 font-serif text-sm uppercase tracking-[0.2em]",
              variant === "void" ? "text-white" : "text-red-600"
            )}
          >
            {label}
          </span>
        )}
        <div
          className={cn(
            "flex-grow border-t-2 transition-colors duration-300",
            variant === "void" ? "border-white" : "border-red-900"
          )}
        />
      </Component>
    );
  }
);

AbyssSeparator.displayName = "AbyssSeparator";
