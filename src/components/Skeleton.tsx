import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface SpectreSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Define o tema visual do esqueleto.
   * - `void`: Cinza escuro/preto (Padrão).
   * - `blood`: Vermelho escuro translúcido.
   * @default "void"
   */
  variant?: "void" | "blood";
  /** Largura manual (ex: "100%", 200). */
  width?: string | number;
  /** Altura manual (ex: "1rem", 40). */
  height?: string | number;
}

/**
 * Primitiva de carregamento (Skeleton Loader).
 * Renderiza um bloco pulsante para indicar conteúdo pendente.
 *
 * **Acessibilidade:**
 * Possui `aria-hidden="true"` automaticamente, pois é um elemento puramente visual
 * e não deve ser lido por leitores de tela.
 */
export const SpectreSkeleton = forwardRef<HTMLDivElement, SpectreSkeletonProps>(
  ({ variant = "void", width, height, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true" // Skeletons são visuais, leitores de tela devem ignorar
        className={cn(
          "animate-pulse border-2",
          // Variant Logic
          variant === "void"
            ? "border-zinc-800 bg-zinc-900"
            : "border-red-950 bg-red-950/30",
          className,
        )}
        style={{
          width,
          height,
          ...style,
        }}
        {...props}
      />
    );
  },
);
SpectreSkeleton.displayName = "SpectreSkeleton";

// --- PRESETS (Line, Avatar, Card) ---

interface SpectreSkeletonLineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Define o tema visual do esqueleto.
   * @default "void"
   */
  variant?: "void" | "blood";
  /**
   * Largura manual.
   * @default "100%"
   */
  width?: string | number;
  /**
   * Altura manual.
   * @default "1rem"
   */
  height?: string | number;
}

/**
 * Wrapper conveniente para simular linhas de texto.
 * Altura padrão de 1rem.
 */
export const SpectreSkeletonLine = forwardRef<
  HTMLDivElement,
  SpectreSkeletonLineProps
>((props, ref) => {
  const { width = "100%", height = "1rem", ...rest } = props;
  return <SpectreSkeleton ref={ref} width={width} height={height} {...rest} />;
});
SpectreSkeletonLine.displayName = "SpectreSkeletonLine";

interface SpectreSkeletonAvatarProps extends Omit<
  SpectreSkeletonProps,
  "width" | "height"
> {
  /**
   * Tamanhos predefinidos para avatares.
   * - `sm`: 32px (w-8)
   * - `md`: 48px (w-12)
   * - `lg`: 64px (w-16)
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Wrapper quadrado para simular avatares ou ícones de perfil.
 */
export const SpectreSkeletonAvatar = forwardRef<
  HTMLDivElement,
  SpectreSkeletonAvatarProps
>(({ size = "md", className, ...props }, ref) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <SpectreSkeleton
      ref={ref}
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
});
SpectreSkeletonAvatar.displayName = "SpectreSkeletonAvatar";

interface SpectreSkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "void" | "blood";
  /** Número de linhas de texto simuladas no corpo do card. */
  lines?: number;
  /** Se verdadeiro, renderiza uma linha de título mais larga. */
  hasTitle?: boolean;
}

/**
 * Padrão composto que simula um Card completo (Título + Texto).
 * Útil para estados de loading de feeds ou grids.
 */
export const SpectreSkeletonCard = forwardRef<
  HTMLDivElement,
  SpectreSkeletonCardProps
>(
  (
    { variant = "void", lines = 3, hasTitle = true, className, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-2 p-6 max-w-sm w-full",
          variant === "void"
            ? "border-zinc-800 bg-black"
            : "border-red-950 bg-black",
          className,
        )}
        {...props}
      >
        {/* Título simulado (Condicional) */}
        {hasTitle && (
          <SpectreSkeletonLine
            variant={variant}
            height="1.5rem"
            width="60%"
            className="mb-4"
          />
        )}

        {/* Linhas de corpo */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: lines }).map((_, i) => (
            <SpectreSkeletonLine
              key={i}
              variant={variant}
              height="0.875rem"
              // A última linha é um pouco menor para dar efeito visual de parágrafo
              {...(i === lines - 1 && { width: "80%" })}
            />
          ))}
        </div>
      </div>
    );
  },
);
SpectreSkeletonCard.displayName = "SpectreSkeletonCard";
