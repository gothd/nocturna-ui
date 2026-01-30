import { Heading, Text } from "nocturna-ui";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #050505; /* Abyss Black */
  color: #fff;
  font-family: "Playfair Display", serif;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 288px;
  border-right: 1px solid #27272a;
  padding: 2rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #27272a;
  }
`;

const Logo = styled(NavLink)`
  font-size: clamp(1.125rem, 2.25vw, 1.5rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
  text-decoration: none;
  background: linear-gradient(to bottom, #fff, #71717a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
    font-family: serif;
    font-style: italic;
    /* Cyber Goth Accent (Phantom Pink) */
    color: #ff007f;
    -webkit-text-fill-color: #ff007f;
    text-shadow: 0px 0px 8px rgba(255, 0, 127, 0.5);
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;

  /* Scrollbar customizada */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #27272a;
    border-radius: 2px;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #a1a1aa;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 0;
  transition: all 0.2s;
  font-family: system-ui, sans-serif;
  border-left: 1px solid transparent;

  &:hover {
    color: #fff;
    background-color: #18181b;
    border-left-color: #52525b;
  }

  &.active {
    color: #fff;
    background-color: #101010;
    /* Active Border: Primary (White) */
    border-left: 2px solid #fff;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 3rem 4rem;
  max-width: 1200px;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const DocsLayout = () => {
  const nav: Record<string, { to: string; label: string }[]> = {
    Conceitos: [{ to: "/system-props", label: "System Props" }],
    Layout: [
      { to: "/box", label: "Box" },
      { to: "/flex", label: "Flex" },
      { to: "/grid", label: "Grid" },
      { to: "/simple-grid", label: "Simple Grid" },
      { to: "/stack", label: "Stack" },
      { to: "/scroll", label: "Scroll" }, // Movido de UI para Layout
    ],
    Tipografia: [
      { to: "/heading", label: "Heading" },
      { to: "/text", label: "Text" },
    ],
    Formulário: [
      { to: "/button", label: "Button" },
      { to: "/checkbox", label: "Checkbox" },
      { to: "/input", label: "Input" },
      { to: "/select", label: "Select" },
    ],
    "Exibição de Dados": [
      { to: "/accordion", label: "Accordion" },
      { to: "/badge", label: "Badge" },
      { to: "/card", label: "Card" },
      { to: "/separator", label: "Separator" },
    ],
    Feedback: [
      { to: "/progress", label: "Progress" },
      { to: "/skeleton", label: "Skeleton" },
      { to: "/toast", label: "Toast" },
    ],
    Overlay: [
      { to: "/menu", label: "Menu" },
      { to: "/modal", label: "Modal" },
      { to: "/tooltip", label: "Tooltip" },
    ],
    Navegação: [{ to: "/tabs", label: "Tabs" }],
  };

  const categoryOrder = [
    "Conceitos",
    "Layout",
    "Tipografia",
    "Formulário",
    "Exibição de Dados",
    "Feedback",
    "Overlay",
    "Navegação",
  ];

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo to="/">
          Nocturna <span>UI</span>
        </Logo>

        <Heading level="h6" style={{ marginBottom: "1.5rem" }}>
          Componentes
        </Heading>

        <NavList>
          {categoryOrder.map((category) => (
            <React.Fragment key={category}>
              <Text as="span" style={{ marginBottom: "0.5rem", opacity: 0.8 }}>
                {category}
              </Text>
              {nav[category]
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((item, index, array) => (
                  <StyledLink
                    key={item.to}
                    to={item.to}
                    style={{ ...(index === array.length - 1 && { marginBottom: "1rem" }) }}
                  >
                    {item.label}
                  </StyledLink>
                ))}
            </React.Fragment>
          ))}
        </NavList>
      </Sidebar>

      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};
