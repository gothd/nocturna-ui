import { Heading } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/heading/BasicUsage";
import basicUsageSource from "../examples/heading/BasicUsage?raw";

export const HeadingPage = () => {
  return (
    <DocsViewer component={Heading as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
