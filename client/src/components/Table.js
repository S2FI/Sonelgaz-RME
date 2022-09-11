import { Button, Input, Table } from "antd";

import { connect } from "react-redux";
import ModalComponent from "./modal";
import {
  getMaintenanceForms,
  getVisiteForms,
  getEntretienForms,
} from "../redux/actions/planningAction";
import React, { useState } from "react";
import ReactLoading from "react-loading";

const TableComponent = (props) => {
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const timer =
  // }, []);
  const getAllForms = async () => {
    setLoading(true);
    props.getVisiteForms();
    props.getMaintenanceForms();
    props.getEntretienForms();
  };
  return (
    <Table
      title={() => (
        <div className="TableTitle">
          <ModalComponent
            width="100%"
            header={props.header}
            listVisite={props.listVisite}
          />
          {props.header == "Formulaire" ? (
            // <p style={{ marginLeft: "35%" }}>
            //   <b style={{ fontSize: 24, fontFamily: "Segoe UI Semibold" }}>
            //     Tableau des formulaires
            //   </b>
            // </p>
            <React.Fragment>
              <Button
                type="primary"
                onClick={() => {
                  getAllForms();
                  setTimeout(() => {
                    setLoading(false);
                  }, 500);
                }}
              >
                Upload
              </Button>
              <div> </div>
              {loading && (
                <ReactLoading type="spin" color="blue" height={30} width={30} />
              )}
            </React.Fragment>
          ) : null}
          {props.header == "Tracabilite" ? (
            <p style={{ marginLeft: "35%" }}>
              <b style={{ fontSize: 24, fontFamily: "Segoe UI Semibold" }}>
                Suivie des utilisateurs
              </b>
            </p>
          ) : null}
        </div>
      )}
      dataSource={props.sharedData}
      columns={props.sharedColumns}
      loading={props.loading}
      pagination={{ pageSize: 7 }}
      bordered
      scroll={{
        y: `60vh`,
      }}
    />
  );
};

export default connect(null, {
  getMaintenanceForms,
  getVisiteForms,
  getEntretienForms,
})(TableComponent);
