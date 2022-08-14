import { Alert, Button, Modal } from "antd";
import { createContext, useState } from "react";
import { connect } from "react-redux";
import Register from "../crud/register";
import PlanningForms from "../pages/Planning/planningForm";
import PlanningFormInfos from "../pages/Planning/planningFormInfos";
const ModalComponent = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  // const handleOk = () => {
  //   setModalText("");
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //     setConfirmLoading(false);
  //   }, 1000);
  // };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    setModalAlert(false);
  };

  const savePlanning = () => {
    setModalAlert(true);
  };

  return (
    <>
      {/*planning and formulaire modal where we call planning froms component*/}
      {localStorage.getItem("UserRole") === "Ing" && (
        <>
          {props.header === "Planning" && (
            <Button type="primary" onClick={showModal}>
              Ajouter Planning
            </Button>
          )}
          <Modal
            title="Formulaire de planning"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[]}
          >
            <PlanningFormInfos />
          </Modal>
        </>
      )}
      {localStorage.getItem("UserRole") === "Admin" && (
        <>
          <Button type="primary" onClick={showModal}>
            Ajouter un utilisateurs
          </Button>
          <Modal
            title="Inscription"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[]}
          >
            <Register />
          </Modal>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  role: state.authReducer.userRole,
});
export default connect(mapStateToProps, {})(ModalComponent);
