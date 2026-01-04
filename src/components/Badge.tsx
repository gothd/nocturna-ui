import { cn } from "../utils/cn";
import React from "react";

interface SigilBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "void" | "blood";
  size?: "sm" | "md";
  styleType?: "outline" | "solid";
}

export const SigilBadge = ({
  children,
  variant = "void",
  size = "md",
  styleType = "outline",
  className,
  ...props
}: SigilBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-block border-2 font-serif uppercase tracking-widest transition-all duration-300",
        // Size style
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        // Background
        styleType === "solid"
          ? variant === "void"
            ? "bg-white text-black"
            : "bg-red-900 text-white"
          : `bg-black ${
              // Border style
              variant === "void" ? "border-white" : "border-red-900"
            } ${
              // Text style outline
              variant === "void" ? "text-white" : "text-red-600"
            }`,
        "hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
