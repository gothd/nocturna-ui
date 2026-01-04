import { cn } from "../utils/cn";
import React from "react";

interface NocturnaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "void" | "blood";
  title: string;
  description?: string;
}

export const NocturnaCard = ({
  title,
  description,
  variant = "void",
  className,
  children,
  ...props
}: NocturnaCardProps) => {
  return (
    <div
      className={cn(
        "bg-black border-2",
        // Border style
        variant === "void" ? "border-white" : "border-red-900",
        "p-6 transition-all duration-300",
        // Shadow style
        variant === "void"
          ? "hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
          : "hover:shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]",
        className
      )}
      {...props}
    >
      <h3 className="font-serif text-2xl uppercase tracking-tighter text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-zinc-500 text-sm mb-4 font-sans leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
};
