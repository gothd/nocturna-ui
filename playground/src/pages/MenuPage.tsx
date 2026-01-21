import { Menu } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/menu/BasicUsage";
import basicUsageSource from "../examples/menu/BasicUsage?raw";

export const MenuPage = () => {
  return (
    <DocsViewer component={Menu as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
