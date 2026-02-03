import {
  Skeleton,
  SkeletonAvatar,
  SkeletonLine,
  SkeletonCard,
  Card,
  VStack,
  HStack,
  Box,
} from "nocturna-ui";

export const BasicUsage = () => {
  return (
    <VStack gap={8} w="full">
      {/* 1. Composição Manual (Atomic) */}
      <Card title="Composição Manual">
        <HStack gap={4} align="center">
          <SkeletonAvatar size="lg" />
          <VStack gap={2} w="full">
            <SkeletonLine w="60%" h="1.2rem" />
            <SkeletonLine w="40%" />
          </VStack>
        </HStack>
        <Skeleton h="100px" w="full" mt={4} />
      </Card>

      {/* 2. Preset de Card (Secondary Theme) */}
      <Card title="Presets de Card (Secondary)" variant="secondary">
        <VStack gap={4}>
          <SkeletonCard variant="secondary" />
          {/* Card sem título, apenas linhas */}
          <SkeletonCard variant="secondary" lines={2} hasTitle={false} />
        </VStack>
      </Card>

      {/* 3. Variante Accent & Grid */}
      <Card title="Dados Críticos (Accent)" variant="accent">
        <Box
          display="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}
        >
          <Box>
            <HStack gap={4} mb={4} align="center">
              <SkeletonAvatar variant="accent" size="sm" />
              <SkeletonLine variant="accent" w="50%" />
            </HStack>
            <SkeletonCard variant="accent" lines={2} hasTitle={false} />
          </Box>
          <Box>
            <HStack gap={4} mb={4} align="center">
              <SkeletonAvatar variant="accent" size="sm" />
              <SkeletonLine variant="accent" w="50%" />
            </HStack>
            <SkeletonCard variant="accent" lines={2} hasTitle={false} />
          </Box>
        </Box>
      </Card>
    </VStack>
  );
};
