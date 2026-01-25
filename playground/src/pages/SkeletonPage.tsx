import { Skeleton, SkeletonAvatar, SkeletonCard, SkeletonLine } from "nocturna-ui";
import { DocsViewer, type ComponentWithDocgen } from "../components/DocsViewer";
import { ComponentShowcase } from "../components/ComponentShowcase";

import { BasicUsage } from "../examples/skeleton/BasicUsage";
import basicUsageSource from "../examples/skeleton/BasicUsage?raw";

export const SkeletonPage = () => {
  return (
    <DocsViewer
      component={Skeleton as ComponentWithDocgen}
      presets={[SkeletonLine, SkeletonCard, SkeletonAvatar] as ComponentWithDocgen[]}
    >
      <ComponentShowcase title="Uso Básico" code={basicUsageSource}>
        <BasicUsage />
      </ComponentShowcase>
    </DocsViewer>
  );
};
