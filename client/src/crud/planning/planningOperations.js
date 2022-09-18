import { Modal } from "antd";
import React, { useEffect, useState } from "react";

import PlanningUpdateFormInfos from "./planningUpdateFormInfos";

import ReactLoading from "react-loading";
function PlanningOperations(props) {
  const [visible, setVisible] = useState(false);

  // const [allData, setallData] = useState(props.dataProgram);
  // const [dataSource, setDataSource] = useState({});
  const [program_list_data, setprogram_list_data] = useState([]);
  const [key_data, setkey_data] = useState({});

  const keyData = () => {
    props.dataProgram.map((data, index) => {
      if (props.recordKey == data.id_planning) {
        setkey_data(data);
        setprogram_list_data(data.program);
      }
    });
  };

  useEffect(() => {
    if (props.visibilite == true) {
      setVisible(true);
      keyData();
    }
  }, [props.visibilite]);

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    props.modalEtatChanger(false);
  };

  const handleOk = () => {
    setVisible(false);
    props.modalEtatChanger(false);
    console.log("la79et i guess");
  };

  return (
    <React.Fragment>
      <Modal
        width={1200}
        style={{
          top: 1,
        }}
        title="Modification du planning"
        visible={visible}
        destroyOnClose="true"
        onCancel={handleCancel}
        footer={[]}
      >
        {program_list_data.length === 0 ? (
          <ReactLoading type="spin" color="orange" height={667} width={375} />
        ) : (
          <PlanningUpdateFormInfos
            title={key_data.Titre_planning}
            type={key_data.Type_planning}
            code_visite={key_data.code_visite}
            programs={program_list_data}
            id={props.recordKey}
            handleOk={handleOk}
            listVisite={props.listVisite}
          />
        )}
      </Modal>
    </React.Fragment>
  );
}
export default PlanningOperations;

// const mapStateToProps = (state) => ({
//   program_list: state.planningReducer.program,
// });
// export default connect(mapStateToProps, { getProgramme })(PlanningOperations);
