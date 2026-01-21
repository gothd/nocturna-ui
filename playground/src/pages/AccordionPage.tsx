import { Accordion } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/accordion/BasicUsage";
import basicUsageSource from "../examples/accordion/BasicUsage?raw";

export const AccordionPage = () => {
  return (
    <DocsViewer component={Accordion as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
