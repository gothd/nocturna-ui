import { Input } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/input/BasicUsage";
import basicUsageSource from "../examples/input/BasicUsage?raw";

export const InputPage = () => {
  return (
    <DocsViewer component={Input as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
