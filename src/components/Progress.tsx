import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface VesselProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Valor atual do progresso.
   * Utilizado apenas quando `mode="value"`.
   * @default 0
   */
  value?: number;

  /**
   * Valor máximo da escala.
   * @default 100
   */
  max?: number;

  /**
   * Define o tema visual da barra.
   * - `void`: Padrão monocromático (Branco).
   * - `blood`: Tema de perigo/erro (Vermelho Escuro).
   * @default "void"
   */
  variant?: "void" | "blood";

  /**
   * Rótulo exibido acima da barra.
   * Renderizado em uppercase e fonte serifada.
   */
  label?: string;

  /**
   * Se verdadeiro, exibe a porcentagem numérica no lado direito do rótulo.
   * Funciona apenas no modo `value`.
   * @default false
   */
  showValue?: boolean;

  /**
   * Define o comportamento da barra.
   * - `value`: Progresso manual controlado pela prop `value`.
   * - `timer`: Barra decrescente automática baseada na `duration`.
   * - `indeterminate`: Animação de "loading" infinito para estados de espera.
   * @default "value"
   */
  mode?: "value" | "timer" | "indeterminate";

  /**
   * Duração da animação em milissegundos.
   * Utilizado apenas quando `mode="timer"`.
   * @default 5000
   */
  duration?: number;

  /**
   * Pausa a animação do timer se verdadeiro.
   * @default false
   */
  paused?: boolean;
}

/**
 * Barra de progresso multifuncional com estética brutalista.
 * Suporta exibição de valores percentuais, timers decrescentes e estados de carregamento indeterminado.
 */
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
    ref,
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
                  variant === "void" ? "text-white" : "text-red-600",
                )}
              >
                {label}
              </span>
            )}
            {showValue && mode === "value" && (
              <span
                className={cn(
                  "font-sans text-xs font-bold tabular-nums leading-none",
                  variant === "void" ? "text-white" : "text-red-600",
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
              : "border-red-900 shadow-[4px_4px_0px_0px_rgba(136,8,8,0.3)]",
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
              mode === "timer" && "w-full origin-left animate-progress", // Timer decrescente (Requer keyframe no CSS global)
            )}
            style={{
              // Se for Valor, usa width. Se for Timer, a width é controlada pelo CSS animate-progress
              width: mode === "value" ? `${percentage}%` : undefined,
              // Se for Timer, injeta a duração e estado de pausa
              animationDuration: mode === "timer" ? `${duration}ms` : undefined,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>
      </div>
    );
  },
);

VesselProgress.displayName = "VesselProgress";
