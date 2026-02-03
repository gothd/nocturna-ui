import React, { forwardRef } from "react";
import { cn } from "../utils/cn";
import { extractSystemStyles, SystemProps } from "../utils/system";

interface SkeletonProps
  extends Omit<SystemProps, "as">, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Define o tema visual do esqueleto.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning";
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
  ({ variant = "primary", className, ...props }, ref) => {
    const { systemStyle, domProps } = extractSystemStyles(props);

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
        style={systemStyle}
        {...domProps}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";

// --- PRESETS (Line, Avatar, Card) ---

interface SkeletonLineProps extends Omit<SkeletonProps, "w" | "h"> {
  /**
   * Largura manual.
   * @default "100%"
   */
  w?: string | number;
  /**
   * Altura manual.
   * @default "1rem"
   */
  h?: string | number;
}

/**
 * Wrapper conveniente para simular linhas de texto.
 * Altura padrão de 1rem.
 */
export const SkeletonLine = forwardRef<HTMLDivElement, SkeletonLineProps>((props, ref) => {
  const { variant = "primary", w = "100%", h = "1rem", ...rest } = props;
  return <Skeleton ref={ref} variant={variant} w={w} h={h} {...rest} />;
});
SkeletonLine.displayName = "SkeletonLine";

interface SkeletonAvatarProps extends SkeletonProps {
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
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
    };

    return (
      <Skeleton
        ref={ref}
        variant={variant}
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  },
);
SkeletonAvatar.displayName = "SkeletonAvatar";

interface SkeletonCardProps extends SkeletonProps {
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
    const { systemStyle, domProps } = extractSystemStyles(props);

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
        className={cn("border-2 p-6 max-w-sm w-full flex flex-col", cardStyles[variant], className)}
        style={systemStyle}
        {...domProps}
      >
        {/* Linhas de corpo (Renderizado antes para sincronia de animação) */}
        <div className="flex flex-col gap-2 order-2">
          {Array.from({ length: lines }).map((_, i) => (
            <SkeletonLine
              key={i}
              variant={variant}
              h="0.875rem"
              // A última linha é um pouco menor para dar efeito visual de parágrafo
              w={i === lines - 1 ? "80%" : "100%"}
            />
          ))}
        </div>

        {/* Título simulado (Condicional) - Visualmente no topo via order-1 */}
        {hasTitle && <SkeletonLine variant={variant} h="1.5rem" w="60%" className="mb-4 order-1" />}
      </div>
    );
  },
);
SkeletonCard.displayName = "SkeletonCard";
