import { Separator } from "nocturna-ui";
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
  width: 250px;
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
  font-size: clamp(0.65625rem, 2.25vw, 1.5rem);
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
  const nav: { to: string; label: string }[] = [
    { to: "/accordion", label: "Accordion" },
    { to: "/badge", label: "Badge" },
    { to: "/button", label: "Button" },
    { to: "/card", label: "Card" },
    { to: "/checkbox", label: "Checkbox" },
    { to: "/input", label: "Input" },
    { to: "/menu", label: "Menu" },
    { to: "/modal", label: "Modal" },
    { to: "/progress", label: "Progress" },
    { to: "/scroll", label: "Scroll" },
    { to: "/select", label: "Select" },
    { to: "/separator", label: "Separator" },
    { to: "/skeleton", label: "Skeleton" },
    { to: "/tabs", label: "Tabs" },
    { to: "/toast", label: "Toast" },
    { to: "/tooltip", label: "Tooltip" },
  ];

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo to="/">
          Nocturna <span>UI</span>
        </Logo>

        <Separator label="Componentes" variant="primary" />

        <NavList>
          {nav
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((item) => (
              <StyledLink key={item.to} to={item.to}>
                {item.label}
              </StyledLink>
            ))}
        </NavList>
      </Sidebar>

      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};
