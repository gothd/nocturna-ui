import React from "react";

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: "void" | "blood";
}

export const NocturnaCard = ({
  title,
  description,
  children,
  variant = "void",
}: CardProps) => {
  const borderStyle = variant === "void" ? "border-white" : "border-red-900";
  const shadowStyle =
    variant === "void"
      ? "hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
      : "hover:shadow-[8px_8px_0px_0px_rgba(136,8,8,0.3)]";

  return (
    <div
      className={`bg-nocturna-void border-2 ${borderStyle} p-6 transition-all duration-300 ${shadowStyle} max-w-sm`}
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
