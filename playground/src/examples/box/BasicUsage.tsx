import styled from "styled-components";
import { Box, Text } from "nocturna-ui";

// Container apenas para centralizar o exemplo na tela
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const BasicUsage = () => {
  return (
    <Wrapper>
      {/* Box agindo como um container responsivo colorido */}
      <Box bg="zinc-900" p={6} m="auto" w="full" maxW="400px" className="border border-zinc-800">
        <Box bg="accent" w={12} h={12} p={2} mb={4}>
          <Text textAlign="center" fontWeight="bold" color="black">
            UI
          </Text>
        </Box>

        <Text color="white" fontWeight="bold" fontSize="lg" mb={2}>
          Componente Box
        </Text>

        <Text color="zinc-400" fontSize="sm">
          Este card foi construído inteiramente com componentes Box e Text, sem escrever uma única
          linha de CSS ou styled-component dedicado.
        </Text>
      </Box>

      {/* Box Polimórfico (as="button") */}
      <Box
        as="button"
        bg="secondary"
        color="black"
        p={3}
        w="full"
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        Click Me (I am a Box)
      </Box>
    </Wrapper>
  );
};
