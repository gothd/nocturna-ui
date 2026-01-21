import { Tooltip } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/tooltip/BasicUsage";
import basicUsageSource from "../examples/tooltip/BasicUsage?raw";

export const TooltipPage = () => {
  return (
    <DocsViewer component={Tooltip as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
