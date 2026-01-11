import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface VesselProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 a 100 (usado no modo padrão)
  max?: number;
  variant?: "void" | "blood";
  label?: string;
  showValue?: boolean;
  mode?: "value" | "timer" | "indeterminate"; // Novos modos
  duration?: number; // Usado apenas se mode="timer"
  paused?: boolean; // Para pausar a animação
}

export const VesselProgress = forwardRef<HTMLDivElement, VesselProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = "void",
      label,
      showValue = false,
      mode = "value",
      duration = 5000,
      paused = false,
      className,
      ...props
    },
    ref
  ) => {
    // Cálculo de porcentagem para o modo "value"
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2 w-full", className)}
        {...props}
      >
        {/* Cabeçalho (Label + Valor) */}
        {(label || (showValue && mode === "value")) && (
          <div className="flex justify-between items-end mb-1">
            {label && (
              <span
                className={cn(
                  "font-serif text-xs uppercase tracking-widest leading-none",
                  variant === "void" ? "text-white" : "text-red-600"
                )}
              >
                {label}
              </span>
            )}
            {showValue && mode === "value" && (
              <span
                className={cn(
                  "font-sans text-xs font-bold tabular-nums leading-none",
                  variant === "void" ? "text-white" : "text-red-600"
                )}
              >
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* Container da Barra */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={mode === "value" ? value : undefined}
          className={cn(
            "h-4 w-full bg-black border-2 overflow-hidden relative",
            // Estilo da Borda e Sombra
            variant === "void"
              ? "border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
              : "border-red-900 shadow-[4px_4px_0px_0px_rgba(136,8,8,0.3)]"
          )}
        >
          {/* A Barra de Preenchimento */}
          <div
            className={cn(
              "h-full transition-all ease-linear",
              // Cores de Fundo
              variant === "void" ? "bg-white" : "bg-red-900",
              // Lógica de Animação baseada no Modo
              mode === "value" && "duration-300", // Transição suave para mudanças de valor
              mode === "indeterminate" && "w-full animate-pulse origin-left", // Loading infinito
              mode === "timer" && "w-full origin-left animate-progress" // Timer decrescente
            )}
            style={{
              // Se for Valor, usa width. Se for Timer, a width é controlada pelo CSS animate-progress
              width: mode === "value" ? `${percentage}%` : undefined,
              // Se for Timer, injetamos a duração e estado de pausa
              animationDuration: mode === "timer" ? `${duration}ms` : undefined,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>
      </div>
    );
  }
);

VesselProgress.displayName = "VesselProgress";
