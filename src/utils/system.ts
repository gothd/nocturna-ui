import {
  ColorToken,
  FontFamilyToken,
  FontSizeToken,
  FontWeightToken,
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLineHeight,
  getSize,
  LineHeightToken,
  SpacingToken,
} from "./tokens";

/**
 * Helper para autocompletar tokens de string (T) mas aceitar qualquer string arbitrária.
 * O `(string & {})` previne que o TS simplifique o tipo para apenas 'string',
 * mantendo as sugestões do Intellisense.
 */
export type TokenOrString<T> = T | (string & {});

/**
 * Helper para autocompletar tokens mas aceitar também números e strings arbitrárias.
 * Útil para props como margin, padding, fontSize que aceitam tokens, pixels (num) ou valores CSS (string).
 */
export type TokenOrValue<T> = T | (string & {}) | number;

/**
 * Definição de todas as System Props suportadas
 */
export interface SystemProps {
  /**
   * Elemento polimórfico a ser renderizado.
   * @default "div"
   */
  as?: React.ElementType;

  // --- MARGINS ---
  /** Margin em todos os lados. (token ou CSS value) */
  m?: TokenOrValue<SpacingToken>;
  /** Margin Top. (token ou CSS value) */
  mt?: TokenOrValue<SpacingToken>;
  /** Margin Bottom. (token ou CSS value) */
  mb?: TokenOrValue<SpacingToken>;
  /** Margin Left. (token ou CSS value) */
  ml?: TokenOrValue<SpacingToken>;
  /** Margin Right. (token ou CSS value) */
  mr?: TokenOrValue<SpacingToken>;
  /** Margin Horizontal (Left + Right). */
  mx?: TokenOrValue<SpacingToken>;
  /** Margin Vertical (Top + Bottom). */
  my?: TokenOrValue<SpacingToken>;

  // --- PADDINGS ---
  /** Padding em todos os lados. */
  p?: TokenOrValue<SpacingToken>;
  /** Padding Top. */
  pt?: TokenOrValue<SpacingToken>;
  /** Padding Bottom. */
  pb?: TokenOrValue<SpacingToken>;
  /** Padding Left. */
  pl?: TokenOrValue<SpacingToken>;
  /** Padding Right. */
  pr?: TokenOrValue<SpacingToken>;
  /** Padding Horizontal (Left + Right). */
  px?: TokenOrValue<SpacingToken>;
  /** Padding Vertical (Top + Bottom). */
  py?: TokenOrValue<SpacingToken>;

  // --- LAYOUT ---
  /** Largura (Width). */
  w?: TokenOrValue<SpacingToken>;
  /** Altura (Height). */
  h?: TokenOrValue<SpacingToken>;
  minW?: TokenOrValue<SpacingToken>;
  maxW?: TokenOrValue<SpacingToken>;
  minH?: TokenOrValue<SpacingToken>;
  maxH?: TokenOrValue<SpacingToken>;
  display?: string;

  // --- TYPOGRAPHY ---
  /** Tamanho da fonte (xs, sm, md, lg...). */
  fontSize?: TokenOrString<FontSizeToken>;
  /** Peso da fonte (bold, normal, 700...). */
  fontWeight?: TokenOrValue<FontWeightToken>;
  /** Família da fonte (sans, serif, mono). */
  fontFamily?: TokenOrString<FontFamilyToken>;
  /**
   * Altura da linha (line-height).
   * Aceita tokens (tight, relaxed) ou valores numéricos/strings.
   */
  lineHeight?: TokenOrValue<LineHeightToken>;
  /** Alinhamento de texto. */
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  /** Renderiza o texto em caixa alta. */
  uppercase?: boolean;

  // --- COLORS ---
  /** Cor de fundo (bg). */
  bg?: TokenOrString<ColorToken>;
  /** Cor do texto. */
  color?: TokenOrString<ColorToken>;
  /** Opacidade (0-1). */
  opacity?: number | string;

  // --- BORDERS ---
  /** Raio da borda (sm, md, full...). */
  rounded?: string | number;
}

/**
 * O Motor de Estilos.
 * Remove props de estilo do objeto original e retorna { systemStyle, domProps }.
 * As props restantes em domProps (como aria-label, onClick) são passadas adiante.
 */
export function extractSystemStyles<T extends Record<string, any>>(props: T) {
  const {
    as,
    m,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    p,
    pt,
    pb,
    pl,
    pr,
    px,
    py,
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
    display,
    fontSize,
    fontWeight,
    fontFamily,
    lineHeight,
    textAlign,
    uppercase,
    bg,
    color,
    opacity,
    rounded,
    style,
    ...domProps // O resto são props nativas (href, onClick...)
  } = props;

  // Constrói o objeto de estilo inline
  const systemStyle: React.CSSProperties = {
    // Margins
    margin: getSize(m),
    marginTop: getSize(mt ?? my),
    marginBottom: getSize(mb ?? my),
    marginLeft: getSize(ml ?? mx),
    marginRight: getSize(mr ?? mx),

    // Paddings
    padding: getSize(p),
    paddingTop: getSize(pt ?? py),
    paddingBottom: getSize(pb ?? py),
    paddingLeft: getSize(pl ?? px),
    paddingRight: getSize(pr ?? px),

    // Layout
    width: getSize(w),
    height: getSize(h),
    minWidth: getSize(minW),
    maxWidth: getSize(maxW),
    minHeight: getSize(minH),
    maxHeight: getSize(maxH),
    display,

    // Typography
    fontSize: getFontSize(fontSize),
    fontWeight: getFontWeight(fontWeight),
    fontFamily: getFontFamily(fontFamily),
    lineHeight: getLineHeight(lineHeight),
    textAlign,
    ...(uppercase && { textTransform: "uppercase" }),

    // Decor
    backgroundColor: getColor(bg),
    color: getColor(color),
    opacity,
    borderRadius: rounded === "full" ? "9999px" : getSize(rounded),

    ...style, // Permite override manual
  };

  // Limpa chaves undefined para não sujar o DOM/CSSOM
  Object.keys(systemStyle).forEach((key) => {
    // @ts-ignore
    if (systemStyle[key] === undefined) delete systemStyle[key];
  });

  return { systemStyle, domProps: domProps as Omit<T, keyof SystemProps>, as };
}
