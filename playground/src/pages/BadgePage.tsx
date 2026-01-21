import { Badge } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/badge/BasicUsage";
import basicUsageSource from "../examples/badge/BasicUsage?raw";

export const BadgePage = () => {
  return (
    <DocsViewer component={Badge as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
