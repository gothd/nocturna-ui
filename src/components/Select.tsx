"use client";

import { cn } from "../utils/cn";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface RitualSelectOption {
  value: string;
  label: string;
}

interface RitualSelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  options: RitualSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  variant?: "void" | "blood";
  size?: "sm" | "md" | "lg";
}

export const RitualSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  variant = "void",
  size = "md",
  className = "",
}: RitualSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0) {
          const opt = options[focusedIndex];
          onChange?.(opt.value);
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
    }
  };

  return (
    <div className="flex flex-col gap-2" ref={ref} onKeyDown={handleKeyDown}>
      {label && (
        <label
          id="ritual-select-label"
          className={cn(
            "font-serif text-sm uppercase tracking-widest",
            // Text style
            variant === "void" ? "text-white" : "text-red-600"
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? "ritual-select-label" : undefined}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full bg-black border-2", // Border style
            variant === "void" ? "border-white" : "border-red-900",
            // Size styles
            size === "sm" && "px-2 py-1.5",
            size === "md" && "px-4 py-3",
            size === "lg" && "px-7 py-6",
            "flex items-center justify-between transition-all duration-300",
            // Shadow styles
            isOpen
              ? variant === "void"
                ? "shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
                : "shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]"
              : variant === "void"
              ? "hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
              : "hover:shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
            className
          )}
        >
          <span
            className={cn(
              "font-sans text-sm",
              // Text style
              selectedOption
                ? variant === "void"
                  ? "text-white"
                  : "text-red-600"
                : "text-zinc-600"
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            size={18}
            strokeWidth={1.5}
            className={cn(
              // Text style
              variant === "void" ? "text-white" : "text-red-600",
              "transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 w-full mt-1 bg-black border-2",
              // Border style
              variant === "void" ? "border-white" : "border-red-900",
              // Shadow style
              variant === "void"
                ? "shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
                : "shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]"
            )}
            role="listbox"
            tabIndex={-1}
          >
            {options.map((option, idx) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                  setFocusedIndex(-1);
                }}
                className={cn(
                  "w-full px-4 py-3 text-left font-sans text-sm",
                  // Text style
                  variant === "void" ? "text-white" : "text-red-600",
                  "transition-colors duration-300",
                  option.value === value && "bg-zinc-900",
                  focusedIndex === idx ? "bg-zinc-800" : "hover:bg-zinc-900"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
