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

  const handleOk = () => {
    setVisible(false);
    console.log("la79et i guess");
  };

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
              Ajouter un planning
            </Button>
          )}
          <Modal
            width={1200}
            title="Creation d'un planning"
            visible={visible}
            destroyOnClose="true"
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[]}
          >
            <PlanningFormInfos
              handleOk={handleOk}
              listVisite={props.listVisite}
            />
          </Modal>
        </>
      )}
      {localStorage.getItem("UserRole") === "Admin" && (
        <>
          {props.header === "UserList" && (
            <Button type="primary" onClick={showModal}>
              Ajouter un utilisateur
            </Button>
          )}
          <Modal
            title="Creation d'un utilisateur"
            destroyOnClose="true"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[]}
          >
            <Register handleOk={handleOk} />
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
