import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Define o tema visual do esqueleto.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";
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
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "primary", width, height, className, style, ...props }, ref) => {
    // Skeletons usam cores de fundo muito sutis e bordas correspondentes
    const variantStyles = {
      primary: "border-zinc-800 bg-zinc-900",
      secondary: "border-secondary/30 bg-secondary/10",
      accent: "border-accent/30 bg-accent/10",
      danger: "border-danger/30 bg-danger/10",
      warning: "border-warning/30 bg-warning/10",
    };

    return (
      <div
        ref={ref}
        aria-hidden="true" // Skeletons são visuais, leitores de tela devem ignorar
        className={cn("animate-pulse border-2", variantStyles[variant], className)}
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
Skeleton.displayName = "Skeleton";

// --- PRESETS (Line, Avatar, Card) ---

interface SkeletonLineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Define o tema visual do esqueleto.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";
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
export const SkeletonLine = forwardRef<HTMLDivElement, SkeletonLineProps>((props, ref) => {
  const { width = "100%", height = "1rem", ...rest } = props;
  return <Skeleton ref={ref} width={width} height={height} {...rest} />;
});
SkeletonLine.displayName = "SkeletonLine";

interface SkeletonAvatarProps extends Omit<SkeletonProps, "width" | "height"> {
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
export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
    };

    return <Skeleton ref={ref} className={cn(sizeClasses[size], className)} {...props} />;
  },
);
SkeletonAvatar.displayName = "SkeletonAvatar";

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";
  /** Número de linhas de texto simuladas no corpo do card. */
  lines?: number;
  /** Se verdadeiro, renderiza uma linha de título mais larga. */
  hasTitle?: boolean;
}

/**
 * Padrão composto que simula um Card completo (Título + Texto).
 * Útil para estados de loading de feeds ou grids.
 */
export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ variant = "primary", lines = 3, hasTitle = true, className, ...props }, ref) => {
    // Container do card também segue o tema
    const cardStyles = {
      primary: "border-zinc-800 bg-black",
      secondary: "border-secondary/30 bg-black",
      accent: "border-accent/30 bg-black",
      danger: "border-danger/30 bg-black",
      warning: "border-warning/30 bg-black",
    };

    return (
      <div
        ref={ref}
        className={cn("border-2 p-6 max-w-sm w-full", cardStyles[variant], className)}
        {...props}
      >
        {/* Título simulado (Condicional) */}
        {hasTitle && (
          <SkeletonLine variant={variant} height="1.5rem" width="60%" className="mb-4" />
        )}

        {/* Linhas de corpo */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: lines }).map((_, i) => (
            <SkeletonLine
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
SkeletonCard.displayName = "SkeletonCard";
