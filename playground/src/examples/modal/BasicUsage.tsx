import styled from "styled-components";
import { Modal, Button, Card, Input } from "nocturna-ui";
import { useState } from "react";

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

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
          <Button onClick={() => setOpenModal("form")} variant="accent">
            Form Modal
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
        <ModalFooter>
          <Button variant="primary" onClick={close}>
            Entendido
          </Button>
        </ModalFooter>
      </Modal>

      {/* Danger Modal */}
      <Modal
        isOpen={openModal === "danger"}
        onClose={close}
        title="Confirmar Expurgo"
        description="Esta ação irá deletar permanentemente o registro da realidade."
        variant="danger"
      >
        <ModalFooter>
          <Button variant="primary" onClick={close}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={close}>
            Confirmar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Form Modal */}
      <Modal isOpen={openModal === "form"} onClose={close} title="Novo Protocolo" variant="accent">
        <FormColumn>
          <Input label="Nome do Protocolo" variant="accent" placeholder="Ex: Fantasma" />
          <Input label="Chave de Acesso" variant="accent" type="password" />
          <Button variant="accent" style={{ marginTop: "1rem" }} onClick={close}>
            Salvar
          </Button>
        </FormColumn>
      </Modal>
    </Layout>
  );
};
