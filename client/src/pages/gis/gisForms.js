import { Popconfirm, Space, Modal, Button, Table } from "antd";
import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import { useReactToPrint } from "react-to-print";
import EntTable from "../fomulaire/entTable";
import VisTable from "../fomulaire/visTable";
import MaintTable from "../fomulaire/maintTable";

const GisForm = React.forwardRef((props, ref) => {
  const [progvisible, setprogvisible] = useState(false);
  let visite = [];
  let ent = [];
  let maint = [];
  props.list.map((data) => {
    if ("id_form_visite" in data) {
      visite.push(data);
    } else if ("id_form_entretien" in data) {
      ent.push(data);
    } else if ("id_form_maintenance" in data) {
      maint.push(data);
    }
  });
  useEffect(() => {
    if (props.visibilite == true) {
      setprogvisible(true);
    }
  }, [props.visibilite]);
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setprogvisible(false);
    props.hidemodal();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const componentRef = useRef();

  return (
    <React.Fragment>
      <Modal
        width={1200}
        style={{
          top: 20,
        }}
        visible={progvisible}
        onCancel={handleCancel}
        className="formModal"
        footer={[]}
      >
        {props.isent === true ? (
          <EntTable ref={componentRef} list={ent} />
        ) : props.isvisite === true ? (
          <VisTable ref={componentRef} list={visite} />
        ) : props.ismaint === true ? (
          <MaintTable ref={componentRef} list={maint} />
        ) : null}

        <Button type="primary" onClick={handlePrint}>
          Imprimer
        </Button>
      </Modal>
    </React.Fragment>
  );
});
export default GisForm;
