import { cn } from "../utils/cn";
import { Check } from "lucide-react";
import React from "react";

interface HexCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  variant?: "void" | "blood";
}

export const HexCheckbox = ({
  label,
  variant = "void",
  checked,
  className,
  ...props
}: HexCheckboxProps) => {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          {...props}
        />
        <div
          className={cn(
            "w-5 h-5 border-2",
            // Border style
            variant === "void" ? "border-white" : "border-red-900",
            "bg-black transition-all duration-300",
            variant === "void"
              ? "peer-checked:bg-white"
              : "peer-checked:bg-red-900",
            "group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] flex items-center justify-center",
            // Background checked
            checked && variant === "void" ? "bg-white" : "bg-red-900",
            className
          )}
        >
          {checked && (
            <Check
              size={14}
              strokeWidth={1.5}
              className={cn(
                // Check color
                variant === "void" ? "text-black" : "text-white",
                "transform scale-0 opacity-0 transition-all duration-300 ease-out",
                checked && "scale-100 opacity-100"
              )}
            />
          )}
        </div>
      </div>
      {label && (
        <span
          className={cn(
            "font-sans text-sm",
            // Text style
            variant === "void" ? "text-white" : "text-red-600",
            "uppercase tracking-wider"
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};
