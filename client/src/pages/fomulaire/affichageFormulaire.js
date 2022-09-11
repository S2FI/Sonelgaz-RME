import { MdDeleteForever } from "react-icons/md";
import { Popconfirm, Space, Modal, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import EntTable from "./entTable";
import VisTable from "./visTable";
import MaintTable from "./maintTable";

function AffichageFormulaire(props) {
  const [visible, setVisible] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    if (props.visibilite == true) {
      setVisible(true);
      //   keyData();
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
        className="formModal"
        title={"Affichage Formulaire"}
        visible={visible}
        onCancel={handleCancel}
        footer={[]}
      >
        {props.type === "Entretien" ? (
          <EntTable
            ref={componentRef}
            Titre_Formulaire="form ent"
            Type_Formulaire={props.type}
            list={props.list_ent[props.recordKey]}
          />
        ) : props.type === "Visite" ? (
          <VisTable
            ref={componentRef}
            Titre_Formulaire="form visite"
            Type_Formulaire={props.type}
            list={props.list_vis[props.recordKey]}
          />
        ) : (
          <MaintTable
            ref={componentRef}
            Titre_Formulaire="form maintenance"
            Type_Formulaire={props.type}
            list={props.list_main[props.recordKey]}
          />
        )}
        <Button onClick={handlePrint}>Print this out!</Button>
      </Modal>
    </React.Fragment>
  );
}
export default AffichageFormulaire;
