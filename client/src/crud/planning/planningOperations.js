import { MdDeleteForever } from "react-icons/md";
import { Popconfirm, Space, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { getProgramme } from "../../redux/actions/planningAction";
import PlanningUpdateFormInfos from "./planningUpdateFormInfos";
import { connect } from "react-redux";

function PlanningOperations(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [allData, setallData] = useState(props.dataProgram);
  const [dataSource, setDataSource] = useState({});

  // console.log("first: => ", props.recordKey);

  // console.log(allData);

  useEffect(() => {
    props.dataProgram.map((data, index) => {
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
        <BsPencilFill />
      </Button>

      <Modal
        title="Update Planning"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        <PlanningUpdateFormInfos
          programs={dataSource}
          id={props.recordKey}
          record={props.record}
        />
      </Modal>
    </React.Fragment>
  );
}
export default PlanningOperations;

// const mapStateToProps = (state) => ({
//   program_list: state.planningReducer.program,
// });
// export default connect(mapStateToProps, { getProgramme })(PlanningOperations);
