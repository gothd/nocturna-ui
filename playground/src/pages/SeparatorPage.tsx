import { Separator } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/separator/BasicUsage";
import basicUsageSource from "../examples/separator/BasicUsage?raw";

export const SeparatorPage = () => {
  return (
    <DocsViewer component={Separator as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
