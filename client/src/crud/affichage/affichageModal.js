import { MdDeleteForever } from "react-icons/md";
import { Popconfirm, Space, Modal, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { connect } from "react-redux";
import { FaEye } from "react-icons/fa";
import AffichageTable from "./affichageTable";

function AffichageModal(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataSource, setDataSource] = useState({});

  // console.log("first: => ", props.recordKey);

  useEffect(() => {
    props.dataProgram?.map((data, index) => {
      if (props.recordKey == data.id_planning) {
        setDataSource(data);
      }
    });
  }, [props.recordKey]);

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <React.Fragment>
      <Button onClick={showModal}>
        <FaEye />
      </Button>

      <Modal
        title={"Affichage Planning"}
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        {/* program_data={allData.program} */}
        <AffichageTable
          program_data={dataSource.program}
          Titre_planning={dataSource.Titre_planning}
          Type_planning={dataSource.Type_planning}
        />
      </Modal>
    </React.Fragment>
  );
}
export default AffichageModal;

// const mapStateToProps = (state) => ({
//   program_list: state.planningReducer.program,
// });
// export default connect(mapStateToProps, { getProgramme })(PlanningOperations);
