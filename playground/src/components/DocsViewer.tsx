/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, type ReactNode, type KeyboardEvent } from "react";
import styled from "styled-components";
import Markdown from "react-markdown";
import { Card, Box, Text, Heading, Badge } from "nocturna-ui";
import { Link } from "react-router-dom";

// --- Interfaces ---
interface DocgenProp {
  defaultValue: { value: string } | null;
  description: string;
  name: string;
  required: boolean;
  type: { name: string; raw?: string; value?: { value: string }[] };
}

export type ComponentWithDocgen = React.ComponentType<unknown> & {
  __docgenInfo?: {
    description: string;
    displayName: string;
    props: Record<string, DocgenProp>;
  };
};

// --- Styled Components ---

const ReferenceContainer = styled(Card)`
  border: 1px solid #27272a;
  overflow: hidden;
  padding: 0;
  background: transparent;
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

// Badge Interativa com foco visual para acessibilidade
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

  /* Estilo de foco para navegação por teclado */
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

const SYSTEM_PROPS_KEYS = new Set([
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
  "w",
  "h",
  "minW",
  "maxW",
  "minH",
  "maxH",
  "display",
  "bg",
  "color",
  "opacity",
  "rounded",
  "fontSize",
  "fontWeight",
  "fontFamily",
  "lineHeight",
  "textAlign",
  "as",
  "ref",
]);

const cleanTypeString = (propName: string, type: any): string => {
  let raw = type.raw || type.name || "string";
  raw = raw.replace(/ \| undefined/g, "").replace(/ \| null/g, "");
  if (propName === "as" || raw.includes("ElementType")) {
    return "React.ElementType";
  }
  if (raw.includes("TokenOrValue")) {
    return raw.replace(/TokenOrValue<(.+)>/, "$1 | number | string");
  }
  if (raw.includes("TokenOrString")) {
    return raw.replace(/TokenOrString<(.+)>/, "$1 | string");
  }
  if (raw.includes("|")) {
    return raw.replace(/\|/g, " | ");
  }
  return raw;
};

// --- Componente TypeDisplay (Com Acessibilidade) ---
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

  // Handler para teclado (Enter ou Espaço)
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Evita scroll da página com espaço
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
      // Props de Acessibilidade
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? "Encolher detalhes do tipo" : "Expandir todos os tipos"}
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

// --- Main Component ---

export const DocsViewer = ({
  component,
  children,
  presets,
}: {
  component: ComponentWithDocgen;
  presets?: ComponentWithDocgen[];
  children?: ReactNode;
}) => {
  const info = component.__docgenInfo;

  if (!info)
    return (
      <Box p={8}>
        <Text>Sem documentação.</Text>
      </Box>
    );

  const { displayName, description, props } = info;
  const isBox = displayName === "Box";

  const filteredProps = Object.entries(props || {})
    .filter(([key]) => isBox || !SYSTEM_PROPS_KEYS.has(key))
    .sort(([a], [b]) => a.localeCompare(b));

  const presetsInfo =
    presets &&
    presets
      .map((p) => p.__docgenInfo)
      .filter((p) => !!p)
      .map((preset) => {
        const { props } = preset;
        const filteredProps = Object.entries(props || {})
          .filter(([key]) => !SYSTEM_PROPS_KEYS.has(key))
          .sort(([a], [b]) => a.localeCompare(b));
        return { ...preset, props: filteredProps };
      });

  return (
    <Box my="3rem" className="animate-fade-in">
      <Box mb={8}>
        <Heading level="h1" mb={4}>
          {displayName}
        </Heading>
        <Text as="div" fontSize="lg" color="zinc-400" lineHeight="relaxed">
          <Markdown>{description}</Markdown>
        </Text>
      </Box>

      {!isBox && (
        <Box p={4} mb={8} bg="rgba(0, 255, 65, 0.05)" style={{ borderLeft: "4px solid #00FF41" }}>
          <Text fontSize="sm" color="zinc-300">
            Este componente suporta todas as{" "}
            <Link
              to="/system-props"
              style={{ color: "#00FF41", fontWeight: "bold", textDecoration: "none" }}
            >
              System Props
            </Link>
            .
          </Text>
        </Box>
      )}

      {children && (
        <Box mb={10}>
          <Heading level="h3" mb={6} color="primary">
            Exemplos
          </Heading>
          {children}
        </Box>
      )}

      <ReferenceContainer>
        <Box p={4} bg="zinc-950" style={{ borderBottom: "1px solid #27272a" }}>
          <Heading level="h4" color="white">
            Referência da API
          </Heading>
        </Box>

        <Box style={{ overflowX: "auto" }}>
          <GridHeader>
            <HeaderCell>Prop</HeaderCell>
            <HeaderCell>Tipo</HeaderCell>
            <HeaderCell>Padrão</HeaderCell>
            <HeaderCell>Descrição</HeaderCell>
          </GridHeader>

          {filteredProps.length > 0 ? (
            filteredProps.map(([key, prop]) => (
              <GridRow key={key}>
                <Cell>
                  <MobileLabel>Prop</MobileLabel>
                  <PropName>{prop.name}</PropName>
                  {prop.required && (
                    <Text as="span" color="danger" fontSize="xs" ml={1}>
                      *
                    </Text>
                  )}
                </Cell>

                <Cell>
                  <MobileLabel>Tipo</MobileLabel>
                  <TypeDisplay propName={prop.name} typeData={prop.type} />
                </Cell>

                <Cell>
                  <MobileLabel>Padrão</MobileLabel>
                  <Text fontFamily="mono" fontSize="xs" color="zinc-500">
                    {prop.defaultValue ? (
                      <InteractiveBadge>
                        {prop.defaultValue.value.replace(/"/g, "")}
                      </InteractiveBadge>
                    ) : (
                      "-"
                    )}
                  </Text>
                </Cell>

                <Cell>
                  <MobileLabel>Descrição</MobileLabel>
                  <Text as="div" fontSize="sm" color="zinc-400">
                    {prop.description ? <Markdown>{prop.description}</Markdown> : "-"}
                  </Text>
                </Cell>
              </GridRow>
            ))
          ) : (
            <Box p={8} style={{ textAlign: "center", fontStyle: "italic", opacity: 0.5 }}>
              Nenhuma propriedade específica encontrada.
            </Box>
          )}
        </Box>

        {presetsInfo &&
          presetsInfo.length > 0 &&
          presetsInfo.map((preset) => (
            <React.Fragment key={preset.displayName}>
              <Box mt={8} mb={4} p={4}>
                <Heading level="h3" mb={4}>
                  {preset.displayName}
                </Heading>
                <Text as="div" fontSize="base" color="zinc-400" lineHeight="relaxed">
                  <Markdown>{preset.description}</Markdown>
                </Text>
              </Box>

              <Box style={{ overflowX: "auto" }}>
                <GridHeader>
                  <HeaderCell>Prop</HeaderCell>
                  <HeaderCell>Tipo</HeaderCell>
                  <HeaderCell>Padrão</HeaderCell>
                  <HeaderCell>Descrição</HeaderCell>
                </GridHeader>

                {preset.props.length > 0 ? (
                  preset.props.map(([key, prop]) => (
                    <GridRow key={key}>
                      <Cell>
                        <MobileLabel>Prop</MobileLabel>
                        <PropName>{prop.name}</PropName>
                        {prop.required && (
                          <Text as="span" color="danger" fontSize="xs" ml={1}>
                            *
                          </Text>
                        )}
                      </Cell>

                      <Cell>
                        <MobileLabel>Tipo</MobileLabel>
                        <TypeDisplay propName={prop.name} typeData={prop.type} />
                      </Cell>

                      <Cell>
                        <MobileLabel>Padrão</MobileLabel>
                        <Text fontFamily="mono" fontSize="xs" color="zinc-500">
                          {prop.defaultValue ? (
                            <InteractiveBadge>
                              {prop.defaultValue.value.replace(/"/g, "")}
                            </InteractiveBadge>
                          ) : (
                            "-"
                          )}
                        </Text>
                      </Cell>

                      <Cell>
                        <MobileLabel>Descrição</MobileLabel>
                        <Text as="div" fontSize="sm" color="zinc-400">
                          {prop.description ? <Markdown>{prop.description}</Markdown> : "-"}
                        </Text>
                      </Cell>
                    </GridRow>
                  ))
                ) : (
                  <Box p={8} style={{ textAlign: "center", fontStyle: "italic", opacity: 0.5 }}>
                    Nenhuma propriedade específica encontrada.
                  </Box>
                )}
              </Box>
            </React.Fragment>
          ))}
      </ReferenceContainer>
    </Box>
  );
};
