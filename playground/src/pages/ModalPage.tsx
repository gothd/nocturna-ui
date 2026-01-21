import { Modal } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/modal/BasicUsage";
import basicUsageSource from "../examples/modal/BasicUsage?raw";

export const ModalPage = () => {
  return (
    <DocsViewer component={Modal as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
