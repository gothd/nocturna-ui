import { HStack, Stack, VStack } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/stack/BasicUsage";
import basicUsageSource from "../examples/stack/BasicUsage?raw";

export const StackPage = () => {
  return (
    <DocsViewer
      component={Stack as ComponentWithDocgen}
      presets={[VStack, HStack] as ComponentWithDocgen[]}
    >
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
