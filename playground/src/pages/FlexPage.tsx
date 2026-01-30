import { Flex } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/flex/BasicUsage";
import basicUsageSource from "../examples/flex/BasicUsage?raw";

export const FlexPage = () => {
  return (
    <DocsViewer component={Flex as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
