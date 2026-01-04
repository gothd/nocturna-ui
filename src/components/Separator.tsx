import { cn } from "../utils/cn";
import React from "react";

interface AbyssSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "void" | "blood";
  label?: string;
}

export const AbyssSeparator = ({
  variant = "void",
  label,
  className = "",
  ...props
}: AbyssSeparatorProps) => {
  return (
    <div className="relative flex items-center py-8 w-full" role="separator">
      <div
        className={cn(
          "flex-grow border-t-2",
          // Border style
          variant === "void" ? "border-white" : "border-red-900"
        )}
      ></div>
      <div
        className={cn(
          "flex-none px-4 font-serif text-xl uppercase tracking-tighter",
          // Text style
          variant === "void" ? "text-white" : "text-red-600",
          className
        )}
        {...props}
      >
        {label || "✦"}
      </div>
      <div
        className={cn(
          "flex-grow border-t-2",
          // Border style
          variant === "void" ? "border-white" : "border-red-900"
        )}
      ></div>
    </div>
  );
};
