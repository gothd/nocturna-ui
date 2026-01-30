import { Grid } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/grid/BasicUsage";
import basicUsageSource from "../examples/grid/BasicUsage?raw";

export const GridPage = () => {
  return (
    <DocsViewer component={Grid as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
