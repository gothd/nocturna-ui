import {
  AbyssSeparator,
  CryptModal,
  GrimoireAccordion,
  HexCheckbox,
  NocturnaCard,
  RitualSelect,
  SigilBadge,
  SoulTabs,
  VeinInput,
  VoidButton,
} from "nocturna-ui";
import { useState } from "react";
import styled from "styled-components";

// --- Styled Components de Layout ---

const ShowcaseContainer = styled.main`
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
  font-family: "Playfair Display", serif;
`;

const Header = styled.header`
  text-align: center;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 10vw, 5rem);
  letter-spacing: -4px;
  text-transform: uppercase;
  line-height: 0.9;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-style: italic;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
`;

const TabContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-top: 2rem;
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  padding: 1rem 0;
`;

const ComponentUnit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const UnitLabel = styled.h3`
  font-family: serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #3f3f46;
  border-bottom: 1px solid #18181b;
  padding-bottom: 0.5rem;
`;

// --- Componente de Exibição ---

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxVoid, setCheckboxVoid] = useState(false);
  const [checkboxBlood, setCheckboxBlood] = useState(true);
  const [selectValue, setSelectValue] = useState("");

  const accordionItems = [
    {
      id: "1",
      title: "O Vazio Desperta",
      content:
        "Nas profundezas da escuridão, a interface emerge. Formas brutalistas encontram a elegância gótica em uma dança de sombras e luz.",
    },
    {
      id: "2",
      title: "Rituais de Sangue",
      content:
        "Acentos carmesim atravessam a escuridão, marcando interações com o peso da intenção. Cada clique, um ritual.",
    },
  ];

  const selectOptions = [
    { value: "void", label: "Abraçar o Vazio" },
    { value: "blood", label: "Pacto de Sangue" },
    { value: "shadow", label: "Reino das Sombras" },
  ];

  // Organização das Abas (SoulTabs)
  const showcaseTabs = [
    {
      id: "sacred",
      label: "Primitivos Sagrados",
      content: (
        <ComponentGrid>
          <ComponentUnit>
            <UnitLabel>Botões do Vazio</UnitLabel>
            <div className="flex gap-4">
              <VoidButton>Void Ghost</VoidButton>
              <VoidButton variant="blood">Blood Offering</VoidButton>
            </div>
          </ComponentUnit>

          <ComponentUnit>
            <UnitLabel>Inígnias (Sigils)</UnitLabel>
            <div className="flex flex-wrap gap-2">
              <SigilBadge styleType="solid">Void</SigilBadge>
              <SigilBadge variant="blood" styleType="solid">
                Cursed
              </SigilBadge>
              <SigilBadge>Outline</SigilBadge>
              <SigilBadge variant="blood" size="sm">
                Ritual
              </SigilBadge>
            </div>
          </ComponentUnit>

          <ComponentUnit>
            <UnitLabel>Cartões de Almas</UnitLabel>
            <NocturnaCard
              title="Grimório"
              description="Contém os segredos da interface."
              variant="blood"
            >
              <VoidButton variant="blood" size="sm">
                Abrir
              </VoidButton>
            </NocturnaCard>
          </ComponentUnit>
        </ComponentGrid>
      ),
    },
    {
      id: "forms",
      label: "Rituais de Entrada",
      content: (
        <ComponentGrid>
          <ComponentUnit>
            <UnitLabel>Campos de Veia (Inputs)</UnitLabel>
            <VeinInput label="Nome da Entidade" placeholder="Ex: Malphas" />
            <VeinInput
              size="sm"
              label="Pacto"
              variant="blood"
              error="O pacto exige uma alma válida."
            />
          </ComponentUnit>

          <ComponentUnit>
            <UnitLabel>Seleção Ritual</UnitLabel>
            <RitualSelect
              label="Alinhamento"
              options={selectOptions}
              value={selectValue}
              onChange={setSelectValue}
            />
          </ComponentUnit>

          <ComponentUnit>
            <UnitLabel>Selo Hexagonal (Checkbox)</UnitLabel>
            <HexCheckbox
              label="Aceitar os termos do Vazio"
              checked={checkboxVoid}
              onChange={(e) => setCheckboxVoid(e.target.checked)}
            />
            <HexCheckbox
              variant="blood"
              label="Vincular alma ao projeto"
              checked={checkboxBlood}
              onChange={(e) => setCheckboxBlood(e.target.checked)}
            />
          </ComponentUnit>
        </ComponentGrid>
      ),
    },
    {
      id: "deep",
      label: "Superfícies Profundas",
      content: (
        <ComponentGrid>
          <ComponentUnit>
            <UnitLabel>Acordeão de Grimório</UnitLabel>
            <GrimoireAccordion items={accordionItems} />
          </ComponentUnit>

          <ComponentUnit>
            <UnitLabel>Portal da Cripta (Modal)</UnitLabel>
            <VoidButton onClick={() => setIsModalOpen(true)}>
              Invocação
            </VoidButton>
            <CryptModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="A Cripta se Abre"
              description="Você acessou uma área restrita da Nocturna UI. Deseja prosseguir com o ritual?"
            >
              <div className="flex gap-4">
                <VoidButton
                  onClick={() => setIsModalOpen(false)}
                  variant="blood"
                >
                  Sim
                </VoidButton>
                <VoidButton onClick={() => setIsModalOpen(false)}>
                  Não
                </VoidButton>
              </div>
            </CryptModal>
          </ComponentUnit>
        </ComponentGrid>
      ),
    },
  ];

  return (
    <ShowcaseContainer>
      <Header>
        <Title>Nocturna UI</Title>
        <Subtitle>
          Componentes forjados no brutalismo e na estética gótica.
        </Subtitle>
      </Header>

      <AbyssSeparator label="✦" />

      <TabContentWrapper>
        <SoulTabs tabs={showcaseTabs} variant="blood" />
      </TabContentWrapper>

      <div className="mt-20 w-full max-w-4xl">
        <AbyssSeparator label="Finis" variant="void" />
        <p className="text-center text-zinc-800 uppercase tracking-widest text-xs">
          v0.0.2 • Desenvolvido com 🖤 por <b>gothd</b>
        </p>
      </div>
    </ShowcaseContainer>
  );
}

export default App;
