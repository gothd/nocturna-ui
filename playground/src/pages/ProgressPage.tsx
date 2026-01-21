import { Progress } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/progress/BasicUsage";
import basicUsageSource from "../examples/progress/BasicUsage?raw";

export const ProgressPage = () => {
  return (
    <DocsViewer component={Progress as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
