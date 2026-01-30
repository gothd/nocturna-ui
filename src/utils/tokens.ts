/**
 * Paleta Cyber Goth Oficial
 * Mapeia os nomes semânticos para os valores Hex reais.
 */
export const colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  // Tokens Semânticos
  primary: "#FFFFFF", // Bone White
  secondary: "#00FF41", // Malware Green
  accent: "#FF007F", // Phantom Pink
  danger: "#DC2626", // Sanguine Red
  warning: "#FFD700", // Cyber Gold
  // Escala de Cinzas (Zinc) para suporte
  "zinc-50": "#fafafa",
  "zinc-100": "#f4f4f5",
  "zinc-200": "#e4e4e7",
  "zinc-300": "#d4d4d8",
  "zinc-400": "#a1a1aa",
  "zinc-500": "#71717a",
  "zinc-600": "#52525b",
  "zinc-700": "#3f3f46",
  "zinc-800": "#27272a",
  "zinc-900": "#18181b",
  "zinc-950": "#09090b",
} as const;

/** Tipos exportados para uso no Intellisense */
export type ColorToken = keyof typeof colors;

/**
 * Escala de Tipografia
 */
export const fontSizes = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
} as const;

export type FontSizeToken = keyof typeof fontSizes;

/**
 * Escala de Peso (Espessura) da Fonte
 */
export const fontWeights = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

export type FontWeightToken = keyof typeof fontWeights;

/**
 * Famílias de Fonte da Nocturna UI
 * Define a identidade tipográfica da biblioteca.
 */
export const fontFamilies = {
  // A voz principal da Nocturna (Gótica/Brutalista)
  serif: '"Playfair Display", Georgia, Cambria, "Times New Roman", Times, serif',

  // Para textos de interface densos ou técnicos
  sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',

  // Para código e terminais
  mono: '"JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace',
} as const;

export type FontFamilyToken = keyof typeof fontFamilies;

/**
 * Escala de Altura de Linha (Line Height)
 */
export const lineHeights = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
  // Adicione valores fixos se necessário (ex: "3": ".75rem")
  "3": ".75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
} as const;

export type LineHeightToken = keyof typeof lineHeights;

/**
 * Escala de Espaçamento e Tamanho
 */
export const spacingScale = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  48: "12rem",
  56: "14rem",
  64: "16rem",
  // Frações comuns para Layout
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "3/4": "75%",
  full: "100%",
  screen: "100vh",
} as const;

export type SpacingToken = keyof typeof spacingScale;

// --- Resolvers ---

export const getColor = (val?: string) => {
  if (!val) return undefined;
  // @ts-ignore
  return colors[val] || val; // Retorna o token mapeado ou o valor raw (ex: #123)
};

export const getFontSize = (val?: string | number) => {
  if (!val) return undefined;
  // @ts-ignore
  return fontSizes[val] || (typeof val === "number" ? `${val / 16}rem` : val);
};

export const getFontWeight = (val?: string | number) => {
  if (!val) return undefined;
  // @ts-ignore
  return fontWeights[val] || val;
};

export const getFontFamily = (val?: string) => {
  if (!val) return undefined;
  // @ts-ignore
  return fontFamilies[val] || val;
};

export const getLineHeight = (val?: string | number) => {
  if (val === undefined) return undefined;
  // @ts-ignore
  return lineHeights[val] || val;
};

export const getSize = (val?: number | string) => {
  if (val === undefined) return undefined;
  // @ts-ignore
  if (spacingScale[val]) return spacingScale[val];
  if (typeof val === "number") return `${val / 4}rem`; // Regra padrão do Tailwind (dividir por 4)
  return val;
};
