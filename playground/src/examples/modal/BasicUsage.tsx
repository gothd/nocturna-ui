import { Terminal } from "lucide-react";
import { Badge, Button, Card, Modal, Text } from "nocturna-ui";
import { useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const BasicUsage = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const close = () => setOpenModal(null);

  return (
    <Layout>
      <Card title="Interrupções de Fluxo">
        <ButtonGroup>
          <Button onClick={() => setOpenModal("info")} variant="primary">
            Info Modal
          </Button>
          <Button onClick={() => setOpenModal("danger")} variant="danger">
            Delete Modal
          </Button>
          <Button onClick={() => setOpenModal("ghost")} variant="ghost">
            <Terminal size={16} style={{ marginRight: 8 }} />
            System Log (Ghost)
          </Button>
        </ButtonGroup>
      </Card>

      {/* Info Modal */}
      <Modal
        isOpen={openModal === "info"}
        onClose={close}
        title="Transmissão Recebida"
        description="Dados criptografados foram interceptados no setor 4."
        variant="primary"
      >
        <Text color="zinc-400">
          A análise preliminar indica origem corporativa. Deseja iniciar a descriptografia?
        </Text>
        <ModalFooter>
          <Button variant="ghost" onClick={close}>
            Ignorar
          </Button>
          <Button variant="primary" onClick={close}>
            Iniciar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Danger Modal */}
      <Modal
        isOpen={openModal === "danger"}
        onClose={close}
        title="Confirmar Expurgo"
        description="Esta ação é irreversível."
        variant="danger"
      >
        <Text color="danger">
          Você está prestes a deletar permanentemente o registro da realidade.
        </Text>
        <ModalFooter>
          <Button variant="primary" onClick={close}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={close}>
            CONFIRMAR
          </Button>
        </ModalFooter>
      </Modal>

      {/* Ghost Modal (HUD Style) */}
      <Modal
        isOpen={openModal === "ghost"}
        onClose={close}
        title="System Logs"
        variant="ghost"
        size="lg"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text fontFamily="mono" fontSize="xs" color="zinc-500">
              TIMESTAMP
            </Text>
            <Text fontFamily="mono" fontSize="xs" color="zinc-500">
              EVENT
            </Text>
          </div>
          <div
            style={{
              borderTop: "1px solid #27272a",
              padding: "0.5rem 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text fontFamily="mono" fontSize="sm" color="zinc-400">
              23:45:01
            </Text>
            <Badge size="sm" variant="secondary">
              CONNECTED
            </Badge>
          </div>
          <div
            style={{
              borderTop: "1px solid #27272a",
              padding: "0.5rem 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text fontFamily="mono" fontSize="sm" color="zinc-400">
              23:45:12
            </Text>
            <Badge size="sm" variant="warning">
              WARNING
            </Badge>
          </div>
          <div
            style={{
              borderTop: "1px solid #27272a",
              padding: "0.5rem 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text fontFamily="mono" fontSize="sm" color="zinc-400">
              23:46:05
            </Text>
            <Text fontFamily="mono" fontSize="sm" color="zinc-500">
              Packet loss detected
            </Text>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
