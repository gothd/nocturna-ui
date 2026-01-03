import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "blood";
}

export const VoidButton = ({
  variant = "ghost",
  children,
  ...props
}: ButtonProps) => {
  const styles =
    variant === "ghost"
      ? "border-2 border-white text-white hover:bg-white hover:text-black"
      : "border-2 border-red-900 text-red-600 hover:bg-red-900 hover:text-white";

  return (
    <button
      className={`px-6 py-2 transition-all duration-300 font-serif uppercase tracking-widest ${styles}`}
      {...props}
    >
      {children}
    </button>
  );
};
