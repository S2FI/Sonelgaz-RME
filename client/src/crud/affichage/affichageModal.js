import { Popconfirm, Space, Modal, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import AffichageTable from "./affichageTable";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import ReactLoading from "react-loading";
function AffichageModal(props) {
  const [visible, setVisible] = useState(false);
  const componentRef = useRef();
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <React.Fragment>
      <Modal
        style={{
          top: 1,
        }}
        width={1200}
        title="Affichage du planning"
        visible={visible}
        onCancel={handleCancel}
        footer={[]}
      >
        {Object.keys(key_data).length === 0 ? (
          <ReactLoading type="spin" color="orange" height={667} width={375} />
        ) : (
          <AffichageTable
            ref={componentRef}
            program_data={program_list_data}
            Titre_planning={key_data.Titre_planning}
            Type_planning={key_data.Type_planning}
            code_visite={key_data.code_visite}
            user={key_data.user_created}
            recordKey={props.recordKeys}
          />
        )}
        <Button type="primary" onClick={handlePrint}>
          Imprimer
        </Button>
      </Modal>
    </React.Fragment>
  );
}
export default AffichageModal;
