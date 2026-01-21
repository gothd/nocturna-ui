import { Scroll } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/scroll/BasicUsage";
import basicUsageSource from "../examples/scroll/BasicUsage?raw";

export const ScrollPage = () => {
  return (
    <DocsViewer component={Scroll as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
