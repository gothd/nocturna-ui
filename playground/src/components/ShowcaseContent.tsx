import {
  AbyssScroll,
  AltarMenu,
  CryptModal,
  GrimoireAccordion,
  HexCheckbox,
  NocturnaCard,
  RitualSelect,
  RuneTooltip,
  SigilBadge,
  SoulTabs,
  SpectreSkeletonAvatar,
  SpectreSkeleton,
  useToast,
  VeinInput,
  VesselProgress,
  VoidButton,
} from "nocturna-ui";
import { Copy, Edit, Share, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  padding: 1rem 0;
  width: 100%;
`;

const Unit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const UnitLabel = styled.h3`
  font-family: serif;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #52525b; /* zinc-600 */
  border-bottom: 1px solid #27272a; /* zinc-800 */
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Row = styled.div<{ $gap?: string; $align?: string; $wrap?: string }>`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => props.$wrap || "wrap"};
  gap: ${(props) => props.$gap || "1rem"};
  align-items: ${(props) => props.$align || "center"};
`;

const Stack = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || "1rem"};
  width: 100%;
`;

// Wrapper específico para dar altura ao Scroll, já que ele ocupa 100% do pai
const ScrollContainer = styled.div`
  height: 180px;
  border: 1px solid #27272a;
  width: 100%;
`;

// Item de lista estilizado manualmente para o Scroll
const ListItem = styled.div`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #18181b;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #18181b;
  }

  p {
    color: #a1a1aa;
    font-family: sans-serif;
    font-size: 0.75rem;
    margin: 0;
  }
`;

export const ShowcaseContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxVoid, setCheckboxVoid] = useState(false);
  const [checkboxBlood, setCheckboxBlood] = useState(true);
  const [selectValue, setSelectValue] = useState("");
  const [progressValue, setProgressValue] = useState(10);

  // Hook do Toast
  const { toast } = useToast();

  // Efeito para animar a barra de progresso
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Dados Mockados
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

  const menuItems = [
    {
      id: "edit",
      label: "Editar Alma",
      icon: <Edit size={16} />,
      onClick: () => console.log("Edit"),
    },
    {
      id: "copy",
      label: "Duplicar",
      icon: <Copy size={16} />,
      onClick: () => console.log("Copy"),
    },
    {
      id: "share",
      label: "Compartilhar",
      icon: <Share size={16} />,
      onClick: () => console.log("Share"),
    },
    {
      id: "delete",
      label: "Expurgar",
      icon: <Trash2 size={16} />,
      onClick: () => console.log("Delete"),
      danger: true,
    },
  ];

  // Conteúdo para o AbyssScroll
  const scrollContent = Array.from({ length: 10 }).map((_, i) => (
    <ListItem key={i}>
      <p>Registro do Grimório #{i + 1} — Pacto selado em escuridão.</p>
    </ListItem>
  ));

  const showcaseTabs = [
    {
      id: "sacred",
      label: "Primitivos Sagrados",
      content: (
        <Grid>
          {/* Coluna 1: Botões e Menus */}
          <Unit>
            <UnitLabel>Botões & Menus</UnitLabel>
            <Stack $gap="1.5rem">
              <Row>
                <VoidButton onClick={() => console.log("Void Click")}>
                  Void
                </VoidButton>
                <VoidButton variant="blood">Blood</VoidButton>
                {/* Menu variante Void */}
                <AltarMenu items={menuItems} variant="void" />
              </Row>
              <Row $align="center">
                <VoidButton size="sm">Small</VoidButton>
                {/* Menu variante Blood alinhado à esquerda */}
                <AltarMenu
                  items={menuItems}
                  variant="blood"
                  align="left"
                  trigger={
                    <VoidButton size="sm" variant="blood">
                      Menu
                    </VoidButton>
                  }
                />
              </Row>
            </Stack>
          </Unit>

          {/* Coluna 2: Badges e Tooltips */}
          <Unit>
            <UnitLabel>Inígnias & Tooltips</UnitLabel>
            <Row $gap="1.5rem">
              <RuneTooltip content="Emblema Sólido do Vazio" position="top">
                <div tabIndex={0} style={{ display: "inline-flex" }}>
                  {" "}
                  {/* Wrapper para foco no Tooltip */}
                  <SigilBadge styleType="solid">Void</SigilBadge>
                </div>
              </RuneTooltip>

              <RuneTooltip
                content="Marca Amaldiçoada"
                position="right"
                variant="blood"
              >
                <div tabIndex={0} style={{ display: "inline-flex" }}>
                  <SigilBadge variant="blood" styleType="solid">
                    Cursed
                  </SigilBadge>
                </div>
              </RuneTooltip>

              <SigilBadge>Outline</SigilBadge>
              <SigilBadge variant="blood" size="sm">
                Ritual
              </SigilBadge>
            </Row>
          </Unit>
        </Grid>
      ),
    },
    {
      id: "forms",
      label: "Rituais de Entrada",
      content: (
        <Grid>
          <Unit>
            <UnitLabel>Campos de Veia (Inputs)</UnitLabel>
            <VeinInput label="Nome da Entidade" placeholder="Ex: Malphas" />
            <VeinInput
              size="sm"
              label="Chave do Pacto"
              variant="blood"
              error="O pacto exige uma alma válida."
            />
          </Unit>

          <Unit>
            <UnitLabel>Seleção & Feedback</UnitLabel>
            <RitualSelect
              label="Alinhamento"
              options={selectOptions}
              value={selectValue}
              onChange={setSelectValue}
            />
            <div style={{ marginTop: "1rem" }}>
              <VoidButton
                style={{ width: "100%" }}
                onClick={() =>
                  toast({
                    title: "Presságio Recebido",
                    description: "Os espíritos sussurram seu nome.",
                    type: "success",
                    variant: "void",
                  })
                }
              >
                Invocar Toast
              </VoidButton>
            </div>
          </Unit>

          <Unit>
            <UnitLabel>Selos (Checkboxes)</UnitLabel>
            <Stack $gap="1rem">
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
            </Stack>
          </Unit>
        </Grid>
      ),
    },
    {
      id: "deep",
      label: "Superfícies Profundas",
      content: (
        <Grid>
          <Unit>
            <UnitLabel>Estruturas & Loading</UnitLabel>
            <GrimoireAccordion items={accordionItems} />

            <Stack $gap="1rem" style={{ marginTop: "1rem" }}>
              <UnitLabel>Espectros (Skeleton)</UnitLabel>
              <Row $gap="1rem" $align="center">
                <SpectreSkeletonAvatar size="md" variant="blood" />
                <Stack $gap="0.5rem" style={{ flex: 1 }}>
                  <SpectreSkeleton width="80%" variant="blood" />
                  <SpectreSkeleton
                    width="50%"
                    height="0.5rem"
                    variant="blood"
                  />
                </Stack>
              </Row>
            </Stack>
          </Unit>

          <Unit>
            <UnitLabel>Recipientes (Cards & Progress)</UnitLabel>
            <NocturnaCard title="Vessel Status" variant="void">
              <Stack $gap="1.5rem">
                <VesselProgress
                  value={progressValue}
                  label="Sincronização de Alma"
                  showValue
                />
                <VesselProgress
                  mode="indeterminate"
                  variant="blood"
                  label="Conexão de Sangue"
                />
              </Stack>
            </NocturnaCard>
          </Unit>

          <Unit>
            <UnitLabel>Pergaminhos & Portais</UnitLabel>

            <ScrollContainer>
              {/* O maxHeight="100%" garante que o scroll ocupe o ScrollContainer */}
              <AbyssScroll maxHeight="100%">{scrollContent}</AbyssScroll>
            </ScrollContainer>

            <VoidButton
              onClick={() => setIsModalOpen(true)}
              style={{ width: "100%" }}
            >
              Abrir a Cripta
            </VoidButton>

            <CryptModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="A Cripta se Abre"
              description="Você acessou uma área restrita da Nocturna UI. Deseja prosseguir com o ritual?"
            >
              <Row
                $gap="1rem"
                style={{ justifyContent: "flex-end", marginTop: "1rem" }}
              >
                <VoidButton
                  onClick={() => setIsModalOpen(false)}
                  variant="blood"
                >
                  Confirmar
                </VoidButton>
                <VoidButton onClick={() => setIsModalOpen(false)}>
                  Recuar
                </VoidButton>
              </Row>
            </CryptModal>
          </Unit>
        </Grid>
      ),
    },
  ];

  return <SoulTabs tabs={showcaseTabs} variant="blood" />;
};
