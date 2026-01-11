import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface SpectreSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "void" | "blood";
  width?: string | number;
  height?: string | number;
}

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
          className
        )}
        style={{
          width,
          height,
          ...style,
        }}
        {...props}
      />
    );
  }
);
SpectreSkeleton.displayName = "SpectreSkeleton";

// --- PRESETS (Avatar, Card) ---
// Wrappers convenientes que usam o componente base

interface SpectreSkeletonAvatarProps
  extends Omit<SpectreSkeletonProps, "width" | "height"> {
  size?: "sm" | "md" | "lg";
}

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

interface SpectreSkeletonCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "void" | "blood";
  lines?: number;
}

export const SpectreSkeletonCard = forwardRef<
  HTMLDivElement,
  SpectreSkeletonCardProps
>(({ variant = "void", lines = 3, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border-2 p-6 max-w-sm w-full",
        variant === "void"
          ? "border-zinc-800 bg-black"
          : "border-red-950 bg-black",
        className
      )}
      {...props}
    >
      {/* Título simulado */}
      <SpectreSkeleton
        variant={variant}
        height="1.5rem"
        width="60%"
        className="mb-4"
      />

      {/* Linhas de corpo */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <SpectreSkeleton
            key={i}
            variant={variant}
            height="0.875rem"
            // A última linha é um pouco menor para dar efeito visual de parágrafo
            width={i === lines - 1 ? "80%" : "100%"}
          />
        ))}
      </div>
    </div>
  );
});
SpectreSkeletonCard.displayName = "SpectreSkeletonCard";
