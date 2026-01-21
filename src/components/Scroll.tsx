import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

interface AbyssScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo que será rolado.
   * Deve exceder a altura definida em `maxHeight` para ativar a rolagem.
   */
  children: React.ReactNode;

  /**
   * Define o tema visual da barra de rolagem.
   * - `void`: Trilho escuro com polegar (thumb) branco.
   * - `blood`: Trilho e polegar em tons de vermelho sangue.
   * @default "void"
   */
  variant?: "void" | "blood";

  /**
   * Altura máxima do container antes de ativar a rolagem.
   * Aceita valores CSS válidos (ex: "400px", "50vh", 300).
   * @default "400px"
   */
  maxHeight?: string | number;
}

/**
 * Container de rolagem com scrollbar customizada cross-browser (Webkit & Firefox).
 *
 * **Features:**
 * - Acessível via teclado (`tabindex="0"` permite foco e uso das setas).
 * - Estilização profunda de scrollbar para manter a imersão gótica.
 * - Suporte a conteúdo dinâmico.
 */
export const AbyssScroll = forwardRef<HTMLDivElement, AbyssScrollProps>(
  (
    {
      children,
      variant = "void",
      maxHeight = "400px",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        // tabindex=0 permite que usuários de teclado foquem na área para rolar com setas
        tabIndex={0}
        style={{
          maxHeight,
          ...style,
        }}
        className={cn(
          "overflow-auto w-full pr-2 focus:outline-none focus:ring-1 focus:ring-zinc-800",

          // --- CONFIGURAÇÃO BASE DA SCROLLBAR (WEBKIT) ---
          "[&::-webkit-scrollbar]:w-2",
          "[&::-webkit-scrollbar]:h-2",
          "[&::-webkit-scrollbar-track]:bg-black",
          "[&::-webkit-scrollbar-track]:border",
          "[&::-webkit-scrollbar-corner]:bg-black",
          "[&::-webkit-scrollbar-thumb]:border-none",
          "[&::-webkit-scrollbar-thumb]:transition-colors",

          // --- FIREFOX SUPPORT (Via propriedades CSS padrão) ---
          "scrollbar-thin", // Define a largura fina no Firefox

          // --- VARIANTE VOID ---
          variant === "void" && [
            // Webkit
            "[&::-webkit-scrollbar-track]:border-zinc-800",
            "[&::-webkit-scrollbar-thumb]:bg-white",
            "[&::-webkit-scrollbar-thumb]:hover:bg-zinc-400",
            // Firefox (scrollbar-color: thumb track)
            "[scrollbar-color:white_black]",
          ],

          // --- VARIANTE BLOOD ---
          variant === "blood" && [
            // Webkit
            "[&::-webkit-scrollbar-track]:border-red-900",
            "[&::-webkit-scrollbar-thumb]:bg-red-900",
            "[&::-webkit-scrollbar-thumb]:hover:bg-red-600",
            // Firefox
            "[scrollbar-color:#7f1d1d_black]",
          ],

          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

AbyssScroll.displayName = "AbyssScroll";
