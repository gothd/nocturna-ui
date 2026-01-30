/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Box, Card, Heading, Text } from "nocturna-ui";
import { useState, type KeyboardEvent } from "react";
import Markdown from "react-markdown";
import styled from "styled-components";
// Importamos o Box para ler seus metadados (__docgenInfo)
import { Box as BoxComponent } from "nocturna-ui";

// --- Configuração das Categorias ---
// Define quais props pertencem a qual grupo visual
const PROP_CATEGORIES: Record<string, string[]> = {
  "Espaçamento (Margin & Padding)": [
    "m",
    "mt",
    "mb",
    "ml",
    "mr",
    "mx",
    "my",
    "p",
    "pt",
    "pb",
    "pl",
    "pr",
    "px",
    "py",
  ],
  "Dimensões & Layout": ["w", "minW", "maxW", "h", "minH", "maxH", "display"],
  Tipografia: ["fontSize", "fontWeight", "fontFamily", "lineHeight", "textAlign"],
  "Cores & Visual": ["bg", "color", "opacity", "rounded"],
  Polimorfismo: ["as"],
};

// --- Styled Components (Consistência com DocsViewer) ---

const ReferenceContainer = styled(Card)`
  border: 1px solid #27272a;
  overflow: hidden;
  padding: 0;
  background: transparent;
  margin-bottom: 3rem;
`;

const GridHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 0.8fr 1.5fr;
  gap: 1rem;
  padding: 1rem;
  background: #101010;
  border-bottom: 1px solid #27272a;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderCell = styled.span`
  color: #71717a;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 0.8fr 1.5fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #27272a;
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
  word-wrap: break-word;
`;

const MobileLabel = styled.span`
  display: none;
  font-size: 0.7rem;
  color: #52525b;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  @media (max-width: 768px) {
    display: block;
  }
`;

const PropName = styled.code`
  font-family: "JetBrains Mono", monospace;
  color: #ff007f;
  font-weight: bold;
  font-size: 0.9rem;
`;

const InteractiveBadge = styled(Badge)<{ $interactive?: boolean }>`
  font-family: "JetBrains Mono", monospace;
  text-transform: none;
  white-space: pre-wrap;
  word-break: break-word;
  max-width: 100%;
  width: max-content;
  line-height: 1.5;
  padding: 0.125rem 0.5rem;
  display: inline-block;
  font-size: 0.75rem;
  background: #18181b;
  border: 1px solid #27272a;
  color: #a1a1aa;
  cursor: ${(props) => (props.$interactive ? "pointer" : "default")};
  transition: all 0.2s;

  &:hover {
    box-shadow: none;
    border-color: ${(props) => (props.$interactive ? "#3f3f46" : "#27272a")};
    background: ${(props) => (props.$interactive ? "#27272a" : "#18181b")};
  }

  &:focus-visible {
    box-shadow: none;
    outline: 2px solid #00ff41;
    outline-offset: 1px;
  }
`;

const MoreLabel = styled.span`
  color: #00ff41;
  font-weight: bold;
  font-size: 0.7rem;
  margin-left: 4px;
  opacity: 0.8;
  white-space: nowrap;
`;

// --- Lógica de Limpeza de Tipos ---

const cleanTypeString = (propName: string, type: any): string => {
  let raw = type.raw || type.name || "string";

  raw = raw.replace(/ \| undefined/g, "").replace(/ \| null/g, "");

  // TokenOrValue -> Aceita Token + Números + String (Ex: Spacing, FontSize)
  if (raw.includes("TokenOrValue")) {
    return raw.replace(/TokenOrValue<(.+)>/, "$1 | number | string");
  }
  // TokenOrString -> Aceita Token + String (Ex: Colors, FontFamily)
  if (raw.includes("TokenOrString")) {
    return raw.replace(/TokenOrString<(.+)>/, "$1 | string");
  }

  if (propName === "as" || raw.includes("ElementType")) {
    return "React.ElementType";
  }

  if (raw.includes("|")) {
    return raw.replace(/\|/g, " | ");
  }

  return raw;
};

// --- Componente TypeDisplay (Interativo) ---
const TypeDisplay = ({ propName, typeData }: { propName: string; typeData: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const fullType = cleanTypeString(propName, typeData);
  const isLong = fullType.length > 60 && (fullType.match(/\|/g) || []).length > 3;

  if (!isLong) {
    return (
      <InteractiveBadge variant="secondary" size="sm">
        {fullType}
      </InteractiveBadge>
    );
  }

  const parts = fullType.split(" | ");
  const preview = parts.slice(0, 3).join(" | ");
  const remainingCount = parts.length - 3;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <InteractiveBadge
      as="button"
      variant="secondary"
      size="sm"
      $interactive={true}
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      style={{ textAlign: "left" }}
    >
      {isExpanded ? (
        fullType
      ) : (
        <>
          {preview} <span style={{ opacity: 0.5 }}>|</span>
          <MoreLabel>+ {remainingCount}...</MoreLabel>
        </>
      )}
    </InteractiveBadge>
  );
};

export const SystemPropsPage = () => {
  // Acessa as informações geradas automaticamente do Box
  const docgenInfo = (BoxComponent as any).__docgenInfo;
  const propsData = docgenInfo?.props || {};

  return (
    <Box p={8} maxW="1000px" mx="auto" className="animate-fade-in">
      <Heading level="h1" mb={2}>
        System Props
      </Heading>
      <Text fontSize="lg" color="zinc-400" mb={8} lineHeight="relaxed">
        Todos os componentes da Nocturna UI herdam propriedades de estilo utilitárias. Você pode
        usá-las para estilizar rapidamente layout, tipografia, cores e mais, sem escrever CSS extra.
      </Text>

      {/* Renderiza cada categoria definida */}
      {Object.entries(PROP_CATEGORIES).map(([categoryTitle, propKeys]) => {
        // Filtra as props que existem no Box e pertencem a esta categoria
        const categoryProps = propKeys
          .map((key) => ({ key, data: propsData[key] }))
          .filter((item) => item.data); // Remove se não encontrar a prop no Box

        if (categoryProps.length === 0) return null;

        return (
          <Box key={categoryTitle} mb={10}>
            <Heading level="h3" mb={4} color="primary">
              {categoryTitle}
            </Heading>

            <ReferenceContainer>
              <Box p={4} bg="zinc-950" style={{ borderBottom: "1px solid #27272a" }}>
                <Heading level="h4" color="white" fontSize="sm">
                  PROPRIEDADES
                </Heading>
              </Box>

              <Box style={{ overflowX: "auto" }}>
                <GridHeader>
                  <HeaderCell>Prop</HeaderCell>
                  <HeaderCell>Tipo</HeaderCell>
                  <HeaderCell>Descrição</HeaderCell>
                </GridHeader>

                {categoryProps.map(({ key, data }) => (
                  <GridRow key={key}>
                    <Cell>
                      <MobileLabel>Prop</MobileLabel>
                      <PropName>{key}</PropName>
                    </Cell>

                    <Cell>
                      <MobileLabel>Tipo</MobileLabel>
                      <TypeDisplay propName={key} typeData={data.type} />
                    </Cell>

                    <Cell>
                      <MobileLabel>Descrição</MobileLabel>
                      <Text as="div" fontSize="sm" color="zinc-400">
                        {data.description ? <Markdown>{data.description}</Markdown> : "-"}
                      </Text>
                    </Cell>
                  </GridRow>
                ))}
              </Box>
            </ReferenceContainer>
          </Box>
        );
      })}
    </Box>
  );
};
