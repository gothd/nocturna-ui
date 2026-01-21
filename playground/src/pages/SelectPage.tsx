import { Select } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/select/BasicUsage";
import basicUsageSource from "../examples/select/BasicUsage?raw";

export const SelectPage = () => {
  return (
    <DocsViewer component={Select as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
