import { Alert, Button, Modal } from "antd";
import { createContext, useState } from "react";
import PlanningForms from "../pages/Planning/planningForm";
const ModalComponent = (props) => {
  const [modal, contextHolder] = Modal.useModal();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("");
    alert("Hello! I am an alert box!!");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      {props.header === "Planning" && (
        <Button type="primary" onClick={showModal}>
          Ajouter Planning
        </Button>
      )}
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <PlanningForms />
        {/*call planningForm component where the editable table is*/}
      </Modal>
    </>
  );
};

export default ModalComponent;
