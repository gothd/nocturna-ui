import { ToastProvider } from "nocturna-ui";
import { HashRouter, Route, Routes } from "react-router-dom"; // Troca para HashRouter
import { DocsLayout } from "./layout/DocsLayout";
import { AccordionPage } from "./pages/AccordionPage";
import { BadgePage } from "./pages/BadgePage";
import { ButtonPage } from "./pages/ButtonPage";
import { CardPage } from "./pages/CardPage";
import { CheckboxPage } from "./pages/CheckboxPage";
import { Home } from "./pages/Home";
import { InputPage } from "./pages/InputPage";
import { MenuPage } from "./pages/MenuPage";
import { ModalPage } from "./pages/ModalPage";
import { ProgressPage } from "./pages/ProgressPage";
import { ScrollPage } from "./pages/ScrollPage";
import { SelectPage } from "./pages/SelectPage";
import { SeparatorPage } from "./pages/SeparatorPage";
import { SkeletonPage } from "./pages/SkeletonPage";
import { TabsPage } from "./pages/TabsPage";
import { TooltipPage } from "./pages/TooltipPage";
import { ToastPage } from "./pages/ToastPage";

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
