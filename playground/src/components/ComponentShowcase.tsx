import React, { useState } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Code, Eye } from "lucide-react";

// --- Styled Components ---

const Wrapper = styled.div`
  margin: 2rem 0;
  border: 1px solid #27272a;
  border-radius: 0; /* Brutalista */
  overflow: hidden;
  background-color: #050505;
  display: flex;
  flex-direction: column;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #27272a;
  background-color: #000;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  cursor: pointer;

  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => (props.$active ? "#fff" : "#71717a")};

  /* Indicador de tab ativa (Primary White) */
  border-bottom: 2px solid ${(props) => (props.$active ? "#fff" : "transparent")};
  transition: all 0.2s;

  &:hover {
    color: #fff;
  }
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid #27272a;
  color: #a1a1aa;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0;
  transition: all 0.2s;

  &:hover {
    color: #fff;
    border-color: #fff;
    background-color: #27272a;
  }
`;

const PreviewArea = styled.div`
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #050505;

  /* Grid Sutil */
  background-image:
    linear-gradient(to right, #18181b 1px, transparent 1px),
    linear-gradient(to bottom, #18181b 1px, transparent 1px);
  background-size: 40px 40px;

  min-height: 250px;
  border-bottom: 1px solid #27272a;
  position: relative;
`;

const CodeWrapper = styled.div`
  font-size: 0.875rem;
  max-height: 400px;
  overflow-y: auto;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #09090b;
  }
  &::-webkit-scrollbar-thumb {
    background: #27272a;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #3f3f46;
  }

  & > pre {
    margin: 0 !important;
    border-radius: 0 !important;
    padding: 1.5rem !important;
    background-color: #09090b !important;
    font-family: "JetBrains Mono", monospace !important;
  }
`;

interface ComponentShowcaseProps {
  children: React.ReactNode;
  code: string;
  title?: string;
}

export const ComponentShowcase = ({ children, code }: ComponentShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Wrapper>
      <Toolbar>
        <Tabs>
          <TabButton $active={activeTab === "preview"} onClick={() => setActiveTab("preview")}>
            <Eye size={16} strokeWidth={1.5} /> Preview
          </TabButton>
          <TabButton $active={activeTab === "code"} onClick={() => setActiveTab("code")}>
            <Code size={16} strokeWidth={1.5} /> Código
          </TabButton>
        </Tabs>

        {activeTab === "code" && (
          <CopyButton onClick={handleCopy} title="Copiar código">
            {copied ? (
              // Secondary Color (Green)
              <Check size={14} color="#00FF41" />
            ) : (
              <Copy size={14} />
            )}
          </CopyButton>
        )}
      </Toolbar>

      {activeTab === "preview" ? (
        <PreviewArea>{children}</PreviewArea>
      ) : (
        <CodeWrapper>
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            showLineNumbers={false}
            wrapLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </CodeWrapper>
      )}
    </Wrapper>
  );
};
