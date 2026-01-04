import { cn } from "../utils/cn";
import React from "react";

interface VoidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "void" | "blood";
  size?: "sm" | "md" | "lg";
}

export const VoidButton = ({
  variant = "void",
  size = "md",
  className,
  ...props
}: VoidButtonProps) => {
  return (
    <button
      className={cn(
        "border-2 font-serif uppercase tracking-widest transition-all duration-300",
        // Size styles
        size === "sm" && "px-3 py-1 text-xs",
        size === "md" && "px-6 py-2 text-sm",
        size === "lg" && "px-10 py-4 text-base",
        // Variant styles
        variant === "void"
          ? "border-white text-white hover:bg-white hover:text-black"
          : "border-red-900 text-red-600 hover:bg-red-900 hover:text-white",
        className
      )}
      {...props}
    />
  );
};
