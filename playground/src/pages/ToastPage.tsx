import { Toast } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/toast/BasicUsage";
import basicUsageSource from "../examples/toast/BasicUsage?raw";

export const ToastPage = () => {
  return (
    <DocsViewer component={Toast as ComponentWithDocgen}>
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
