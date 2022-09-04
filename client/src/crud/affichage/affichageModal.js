import { MdDeleteForever } from "react-icons/md";
import { Popconfirm, Space, Modal, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { connect } from "react-redux";
import { FaEye } from "react-icons/fa";
import AffichageTable from "./affichageTable";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

function AffichageModal(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [allData, setallData] = useState(props.dataProgram);
  const [dataSource, setDataSource] = useState({});
  const componentRef = useRef();

  // console.log("first: => ", props.recordKey);
  // console.log(
  //   "data that im sending to affichage modal =>>>>>>",
  //   props.dataProgram
  // );
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    allData?.map((data, index) => {
      // console.log("ou hadi rahi tet3awed za3ma mor l'insertion?", data);
      if (props.recordKey == data.id_planning) {
        setDataSource(data);
      }
    });
  }, []);
  useEffect(() => {
    setallData(props.dataProgram);
    // console.log("data programmme ya da daaaaa =>", props.dataProgram);
  }, [props.dataProgram]);

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  // console.log("data that im putting in affichageTable => ", dataSource);
  return (
    <React.Fragment>
      {/* <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      /> */}
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
        <AffichageTable
          ref={componentRef}
          program_data={dataSource.program}
          Titre_planning={dataSource.Titre_planning}
          Type_planning={dataSource.Type_planning}
          recordKey={props.recordKeys}
        />
        <Button onClick={handlePrint}>Print this out!</Button>
      </Modal>
    </React.Fragment>
  );
}
export default AffichageModal;

// const mapStateToProps = (state) => ({
//   program_list: state.planningReducer.program,
// });
// export default connect(mapStateToProps, { getProgramme })(PlanningOperations);
