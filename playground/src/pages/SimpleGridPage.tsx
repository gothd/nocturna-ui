import { SimpleGrid } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/simpleGrid/BasicUsage";
import basicUsageSource from "../examples/simpleGrid/BasicUsage?raw";

export const SimpleGridPage = () => {
  return (
    <DocsViewer component={SimpleGrid as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
