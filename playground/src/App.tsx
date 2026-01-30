import { ToastProvider } from "nocturna-ui";
import { HashRouter, Route, Routes } from "react-router-dom"; // Troca para HashRouter
import { DocsLayout } from "./layout/DocsLayout";
import { AccordionPage } from "./pages/AccordionPage";
import { BadgePage } from "./pages/BadgePage";
import { BoxPage } from "./pages/BoxPage";
import { ButtonPage } from "./pages/ButtonPage";
import { CardPage } from "./pages/CardPage";
import { CheckboxPage } from "./pages/CheckboxPage";
import { FlexPage } from "./pages/FlexPage";
import { GridPage } from "./pages/GridPage";
import { HeadingPage } from "./pages/HeadingPage";
import { Home } from "./pages/Home";
import { InputPage } from "./pages/InputPage";
import { MenuPage } from "./pages/MenuPage";
import { ModalPage } from "./pages/ModalPage";
import { ProgressPage } from "./pages/ProgressPage";
import { ScrollPage } from "./pages/ScrollPage";
import { SelectPage } from "./pages/SelectPage";
import { SeparatorPage } from "./pages/SeparatorPage";
import { SimpleGridPage } from "./pages/SimpleGridPage";
import { SkeletonPage } from "./pages/SkeletonPage";
import { StackPage } from "./pages/StackPage";
import { TabsPage } from "./pages/TabsPage";
import { TextPage } from "./pages/TextPage";
import { ToastPage } from "./pages/ToastPage";
import { TooltipPage } from "./pages/TooltipPage";
import { SystemPropsPage } from "./pages/SystemPropsPage";

function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<DocsLayout />}>
            <Route index element={<Home />} />

            <Route path="accordion" element={<AccordionPage />} />
            <Route path="badge" element={<BadgePage />} />
            <Route path="button" element={<ButtonPage />} />
            <Route path="card" element={<CardPage />} />
            <Route path="checkbox" element={<CheckboxPage />} />
            <Route path="input" element={<InputPage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="modal" element={<ModalPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="scroll" element={<ScrollPage />} />
            <Route path="select" element={<SelectPage />} />
            <Route path="separator" element={<SeparatorPage />} />
            <Route path="skeleton" element={<SkeletonPage />} />
            <Route path="tabs" element={<TabsPage />} />
            <Route path="toast" element={<ToastPage />} />
            <Route path="tooltip" element={<TooltipPage />} />
            <Route path="box" element={<BoxPage />} />
            <Route path="flex" element={<FlexPage />} />
            <Route path="grid" element={<GridPage />} />
            <Route path="simple-grid" element={<SimpleGridPage />} />
            <Route path="stack" element={<StackPage />} />
            <Route path="heading" element={<HeadingPage />} />
            <Route path="text" element={<TextPage />} />
            <Route path="system-props" element={<SystemPropsPage />} />

            <Route
              path="*"
              element={<div className="p-10">Página não encontrada no abismo.</div>}
            />
          </Route>
        </Routes>
      </HashRouter>
    </ToastProvider>
  );
}

export default App;
