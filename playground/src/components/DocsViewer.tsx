import React, { type ReactNode } from "react";
import styled from "styled-components";
import Markdown from "react-markdown";
import { AbyssSeparator, NocturnaCard, SigilBadge } from "nocturna-ui";

interface DocgenType {
  name: string;
  raw?: string;
  value?: { value: string }[];
}

interface DocgenProp {
  defaultValue: { value: string } | null;
  description: string;
  name: string;
  required: boolean;
  type: DocgenType;
}

interface DocgenInfo {
  description: string;
  displayName: string;
  props: Record<string, DocgenProp>;
}

export type ComponentWithDocgen = React.ComponentType<unknown> & {
  __docgenInfo?: DocgenInfo;
};

interface DocsViewerProps {
  component: ComponentWithDocgen;
  presets?: ComponentWithDocgen[];
  children?: ReactNode;
}

// --- Styled Components ---

const ViewerWrapper = styled.div`
  width: 100%;
  margin: 3rem 0;
  animation: fadeIn 0.7s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HeaderSection = styled.div`
  padding: 2rem 1.5rem;
  background-color: #000;
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ComponentTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.25rem;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: -0.025em;
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PresetTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: -0.025em;
  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ComponentDescription = styled.div`
  font-family: system-ui, sans-serif;
  color: #a1a1aa;
  font-size: 1.125rem;
  line-height: 1.75;
  max-width: 48rem;

  /* Estilos para Markdown */
  strong {
    color: #fff;
    font-weight: 600;
  }
  code {
    background: #18181b;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.9em;
    border: 1px solid #27272a;
    color: #e4e4e7;
  }
  p {
    margin-bottom: 0.75rem;
  }
  p:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
  }
  li {
    margin-bottom: 0.25rem;
  }
`;

const PresetDescription = styled(ComponentDescription)`
  font-size: 1rem;
`;

// Header da Tabela
const GridHeader = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #27272a;
    background-color: rgba(0, 0, 0, 0.5);
    color: #71717a;
    font-family: "Playfair Display", serif;
    font-size: 0.875rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const HeaderCol = styled.div<{ $span: number }>`
  grid-column: span ${(props) => props.$span} / span ${(props) => props.$span};
`;

const PropRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(24, 24, 27, 0.5);
  transition: background-color 0.2s;
  position: relative; /* Contexto para o sticky do filho */

  &:hover {
    background-color: rgba(24, 24, 27, 0.3);
  }
  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    padding: 1.5rem;
    align-items: start;
  }
`;

const NameCol = styled.div`
  /* Mobile: Sticky ativado */
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #000; /* Fundo opaco para não misturar texto ao rolar */
  margin: -1.5rem -1.5rem 0 -1.5rem; /* Compensa o padding do PropRow */
  padding: 1.5rem 1.5rem 1rem 1.5rem; /* Recoloca o padding + respiro */
  border-bottom: 1px solid #18181b; /* Separador sutil no mobile */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);

  /* Desktop: Sticky removido */
  @media (min-width: 768px) {
    grid-column: span 3 / span 3;
    position: static; /* Remove sticky */
    background-color: transparent;
    margin: 0;
    padding: 0;
    border-bottom: none;
    box-shadow: none;
  }
`;

const PropNameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const PropName = styled.span`
  font-family: monospace;
  font-size: 0.875rem;
  color: #ddd6fe;
  font-weight: 700;
  word-break: break-all;
`;

const RequiredBadge = styled.span`
  font-size: 0.625rem;
  color: #ef4444;
  border: 1px solid rgba(127, 29, 29, 0.5);
  background-color: rgba(69, 10, 10, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DataCol = styled.div<{ $span: number }>`
  @media (min-width: 768px) {
    grid-column: span ${(props) => props.$span} / span ${(props) => props.$span};
  }
`;

const MobileLabel = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #52525b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  font-family: "Playfair Display", serif;
  @media (min-width: 768px) {
    display: none;
  }
`;

const TypeBadgesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const DefaultValue = styled.span`
  font-family: monospace;
  font-size: 0.75rem;
  color: #d4d4d8;
  background-color: #18181b;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #27272a;
  display: inline-block;
  word-break: break-all;
`;

const DescriptionText = styled.div`
  font-size: 0.875rem;
  color: #a1a1aa;
  line-height: 1.6;
  text-wrap: balance;

  /* Estilos para Markdown dentro da tabela */
  strong {
    color: #fff;
    font-weight: 600;
  }
  code {
    background: #18181b;
    padding: 0.1em 0.3em;
    border-radius: 0.2rem;
    font-family: monospace;
    font-size: 0.85em;
    border: 1px solid #27272a;
    color: #e4e4e7;
  }
  p {
    margin-bottom: 0.5rem;
  }
  p:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: disc;
    padding-left: 1.2rem;
    margin-bottom: 0.5rem;
  }
  li {
    margin-bottom: 0.25rem;
  }
`;

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #52525b;
  font-style: italic;
  font-family: serif;
  border-top: 1px solid #18181b;
  background-color: rgba(9, 9, 11, 0.3);
`;

const ErrorBox = styled.div`
  padding: 1rem;
  border: 1px solid #7f1d1d;
  background-color: rgba(69, 10, 10, 0.2);
  color: #ef4444;
  font-family: monospace;
  font-size: 0.875rem;
`;

const formatType = (type: DocgenType): string[] => {
  let parts: string | undefined;
  if (type.raw) parts = type.raw;
  if (type.name === "enum" && Array.isArray(type.value)) {
    parts = type.value.map((v) => v.value).join(" | ");
  }
  if (!parts) parts = type.name;
  // Faz cleanup de undefined (já usamos o termo "obrigatório" ou "?" em propriedades literais)
  parts = parts.replaceAll(" | undefined", "");
  if (parts.startsWith("(") && parts.endsWith(")")) {
    parts = parts.replace(/^\(|\)$/g, "");
  }
  // Se for objeto literal ou arrow function retorna em um array
  if (
    typeof parts === "string" &&
    (parts.startsWith("{") || parts.startsWith("("))
  ) {
    return [parts];
  }
  return parts.split(" | ");
};

export const DocsViewer = ({
  children,
  component,
  presets,
}: DocsViewerProps) => {
  const docs = component.__docgenInfo;
  const presetsDocs =
    presets && presets.map((p) => p.__docgenInfo).filter((p) => !!p);
  console.log(docs);

  if (!docs) {
    return (
      <ErrorBox>
        Documentação não encontrada. Verifique se o componente está na pasta
        src/components e se o plugin do Vite está ativo.
      </ErrorBox>
    );
  }

  const hasProps = Object.keys(docs.props).length > 0;

  return (
    <ViewerWrapper>
      {/* Overflow visible para sticky funcionar */}
      <NocturnaCard variant="void" style={{ padding: 0, overflow: "visible" }}>
        <HeaderSection>
          <ComponentTitle>{docs.displayName}</ComponentTitle>
          <ComponentDescription>
            <Markdown>{docs.description}</Markdown>
          </ComponentDescription>
        </HeaderSection>

        {/* Showcase do componente */}
        {children}

        <div className="hidden md:block">
          <AbyssSeparator
            label="API Reference"
            variant="void"
            style={{ margin: 0 }}
          />
        </div>
        <div className="block md:hidden">
          <AbyssSeparator label="API" variant="void" style={{ margin: 0 }} />
        </div>

        {hasProps ? (
          <>
            <div style={{ width: "100%", position: "relative" }}>
              <GridHeader>
                <HeaderCol $span={3} style={{ paddingLeft: "0.5rem" }}>
                  Propriedade
                </HeaderCol>
                <HeaderCol $span={3}>Tipo</HeaderCol>
                <HeaderCol $span={2}>Padrão</HeaderCol>
                <HeaderCol $span={4}>Descrição</HeaderCol>
              </GridHeader>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {(Object.values(docs.props) as DocgenProp[]).map((prop) => (
                  <PropRow key={prop.name}>
                    {/* Nome da Propriedade (Sticky no Mobile) */}
                    <NameCol>
                      <PropNameWrapper>
                        <PropName>{prop.name}</PropName>
                        {prop.required && (
                          <RequiredBadge>Obrigatório</RequiredBadge>
                        )}
                      </PropNameWrapper>
                    </NameCol>

                    <DataCol $span={3}>
                      <MobileLabel>Tipo</MobileLabel>
                      <TypeBadgesWrapper>
                        {formatType(prop.type).map((typePart) => (
                          <div key={typePart} style={{ maxWidth: "100%" }}>
                            <SigilBadge
                              size="sm"
                              variant="void"
                              styleType="outline"
                              style={{
                                textTransform: "none",
                                borderColor: "#3f3f46",
                                color: "#d4d4d8",
                                fontFamily: "monospace",
                                whiteSpace: "normal",
                                textAlign: "left",
                                wordBreak: "break-word",
                              }}
                            >
                              {typePart.replace(/^"|"$/g, "")}
                            </SigilBadge>
                          </div>
                        ))}
                      </TypeBadgesWrapper>
                    </DataCol>

                    <DataCol $span={2}>
                      <MobileLabel>Padrão</MobileLabel>
                      <div>
                        {prop.defaultValue ? (
                          <DefaultValue>
                            {prop.defaultValue.value.replace(/"/g, "")}
                          </DefaultValue>
                        ) : (
                          <span
                            style={{
                              fontFamily: "monospace",
                              color: "#3f3f46",
                              opacity: 0.5,
                            }}
                          >
                            -
                          </span>
                        )}
                      </div>
                    </DataCol>

                    <DataCol $span={4}>
                      <MobileLabel>Descrição</MobileLabel>
                      <DescriptionText>
                        {prop.description ? (
                          <Markdown>{prop.description}</Markdown>
                        ) : (
                          <span style={{ fontStyle: "italic", opacity: 0.3 }}>
                            Sem descrição disponível.
                          </span>
                        )}
                      </DescriptionText>
                    </DataCol>
                  </PropRow>
                ))}
              </div>
            </div>

            {presetsDocs?.map((docs) => (
              <React.Fragment key={docs.displayName}>
                <HeaderSection>
                  <PresetTitle>{docs.displayName}</PresetTitle>
                  <PresetDescription>
                    <Markdown>{docs.description}</Markdown>
                  </PresetDescription>
                </HeaderSection>

                <div style={{ width: "100%", position: "relative" }}>
                  <GridHeader>
                    <HeaderCol $span={3} style={{ paddingLeft: "0.5rem" }}>
                      Propriedade
                    </HeaderCol>
                    <HeaderCol $span={3}>Tipo</HeaderCol>
                    <HeaderCol $span={2}>Padrão</HeaderCol>
                    <HeaderCol $span={4}>Descrição</HeaderCol>
                  </GridHeader>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {(Object.values(docs.props) as DocgenProp[]).map((prop) => (
                      <PropRow key={prop.name}>
                        {/* Nome da Propriedade (Sticky no Mobile) */}
                        <NameCol>
                          <PropNameWrapper>
                            <PropName>{prop.name}</PropName>
                            {prop.required && (
                              <RequiredBadge>Obrigatório</RequiredBadge>
                            )}
                          </PropNameWrapper>
                        </NameCol>

                        <DataCol $span={3}>
                          <MobileLabel>Tipo</MobileLabel>
                          <TypeBadgesWrapper>
                            {formatType(prop.type).map((typePart) => (
                              <div key={typePart} style={{ maxWidth: "100%" }}>
                                <SigilBadge
                                  size="sm"
                                  variant="void"
                                  styleType="outline"
                                  style={{
                                    textTransform: "none",
                                    borderColor: "#3f3f46",
                                    color: "#d4d4d8",
                                    fontFamily: "monospace",
                                    whiteSpace: "normal",
                                    textAlign: "left",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {typePart.replace(/^"|"$/g, "")}
                                </SigilBadge>
                              </div>
                            ))}
                          </TypeBadgesWrapper>
                        </DataCol>

                        <DataCol $span={2}>
                          <MobileLabel>Padrão</MobileLabel>
                          <div>
                            {prop.defaultValue ? (
                              <DefaultValue>
                                {prop.defaultValue.value.replace(/"/g, "")}
                              </DefaultValue>
                            ) : (
                              <span
                                style={{
                                  fontFamily: "monospace",
                                  color: "#3f3f46",
                                  opacity: 0.5,
                                }}
                              >
                                -
                              </span>
                            )}
                          </div>
                        </DataCol>

                        <DataCol $span={4}>
                          <MobileLabel>Descrição</MobileLabel>
                          <DescriptionText>
                            {prop.description ? (
                              <Markdown>{prop.description}</Markdown>
                            ) : (
                              <span
                                style={{ fontStyle: "italic", opacity: 0.3 }}
                              >
                                Sem descrição disponível.
                              </span>
                            )}
                          </DescriptionText>
                        </DataCol>
                      </PropRow>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </>
        ) : (
          <EmptyState>
            Este componente é puro e não aceita configurações externas.
          </EmptyState>
        )}
      </NocturnaCard>
    </ViewerWrapper>
  );
};
