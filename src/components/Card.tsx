import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface NocturnaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "void" | "blood";
  title?: string;
  description?: string;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // Controle de hierarquia
  as?: React.ElementType; // Polimorfismo (div, section, article)
}

export const NocturnaCard = forwardRef<HTMLDivElement, NocturnaCardProps>(
  (
    {
      title,
      description,
      variant = "void",
      className,
      children,
      headingLevel: Heading = "h3", // Default h3
      as: Component = "div", // Default div
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "bg-black border-2 flex flex-col h-full", // Flex col para garantir altura
          // Border style
          variant === "void" ? "border-white" : "border-red-900",
          "p-6 transition-shadow duration-300",
          // Shadow style (Hover)
          variant === "void"
            ? "hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
            : "hover:shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4 space-y-2">
            <Heading
              className={cn(
                "font-serif text-2xl uppercase tracking-tighter leading-none",
                // Text style
                variant === "void" ? "text-white" : "text-red-600",
              )}
            >
              {title}
            </Heading>

            {description && (
              <p className="text-zinc-500 text-sm font-sans leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content Area - cresce para ocupar espaço se necessário */}
        <div className="mt-auto">{children}</div>
      </Component>
    );
  },
);

NocturnaCard.displayName = "NocturnaCard";
