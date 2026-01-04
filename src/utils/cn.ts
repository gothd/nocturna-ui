import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário para fundir classes do Tailwind sem conflitos.
 * O twMerge garante que a última classe definida (como a vinda via prop)
 * sempre vença as classes padrão do componente.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
