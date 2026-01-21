import { VoidButton } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/button/BasicUsage";
import basicUsageSource from "../examples/button/BasicUsage?raw";

export const ButtonPage = () => {
  return (
    <DocsViewer component={VoidButton as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
