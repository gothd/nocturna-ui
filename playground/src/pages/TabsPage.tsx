import { Tabs } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/tabs/BasicUsage";
import basicUsageSource from "../examples/tabs/BasicUsage?raw";

export const TabsPage = () => {
  return (
    <DocsViewer component={Tabs as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
