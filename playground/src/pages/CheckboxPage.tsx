import { Checkbox } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/checkbox/BasicUsage";
import basicUsageSource from "../examples/checkbox/BasicUsage?raw";

export const CheckboxPage = () => {
  return (
    <DocsViewer component={Checkbox as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
