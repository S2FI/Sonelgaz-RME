import MainLayout from "../../Layout/mainLayout";
import { Button, Space, Tag, Tooltip } from "antd";
import { FaEye } from "react-icons/fa";
import { connect } from "react-redux";
import {
  getMaintenanceForms,
  getVisiteForms,
  getEntretienForms,
} from "../../redux/actions/planningAction";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import AffichageFormulaire from "./affichageFormulaire";

const Formulaires = (props) => {
  const [modalType, setmodalType] = useState("");
  const [visite, setvisite] = useState([]);
  const [entretien, setentretien] = useState([]);
  const [maintenance, setmaintenance] = useState([]);
  const [key, setkey] = useState("");
  const [visible, setVisible] = useState(false);

  const getAllForms = async () => {
    await props.getVisiteForms();
    await props.getMaintenanceForms();
    await props.getEntretienForms();
  };
  useEffect(() => {
    getAllForms();
  }, []);

  const displayV = (list) => {
    let vis = [];
    Object.keys(list)?.forEach(async (key) => {
      let data = list[key][0];
      vis.push({
        key: key,
        title: "Les formulaires de:  [ " + data.titleplan + " ]",
        type: [data.typeForm],
      });
    });
    if (vis.length != 0) {
      setvisite(vis);
    }
  };
  const displayE = (list) => {
    let vis = [];
    Object.keys(list)?.forEach(async (key) => {
      let data = list[key][0];
      vis.push({
        key: key,
        title: "Les formulaires de:  [ " + data.titleplan + " ]",
        type: [data.typeForm],
      });
    });
    if (vis.length != 0) {
      setentretien(vis);
    }
  };
  const displayM = (list) => {
    let vis = [];
    Object.keys(list)?.forEach(async (key) => {
      let data = list[key][0];

      vis.push({
        key: key,
        // date: data.date?.split("T")[0],
        title: "Les formulaires de:  [ " + data.titleplan + " ]",
        type: [data.typeForm],
      });
    });
    if (vis.length != 0) {
      setmaintenance(vis);
    }
  };
  useEffect(() => {
    displayV(props.visite_list);
    displayE(props.entretien_list);
    displayM(props.maintenance_list);
  }, [props.visite_list, props.entretien_list, props.maintenance_list]);

  // console.log("MAINTENNCE =>", maintenance);
  // console.log("ENTRETIEN =>", entretien);
  // console.log("VISITE =>", visite);
  // console.log(loading);
  const showModal = (bool) => {
    setVisible(bool);
  };
  const forms_columns = [
    {
      title: "Titre de planning",
      dataIndex: "title",
      key: "title",
      sorter: false,
      width: "50%",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (tags) => (
        <>
          {tags?.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Afficher le formulaire">
            <Button
              style={{
                background: "#1890ff",
                borderColor: "#1890ff",
                color: "#ffff",
              }}
              onClick={() => {
                setVisible(true);
                setkey(record.key);
                setmodalType(record.type[0]);
                // setDataProgram(props.program_list);
              }}
            >
              <FaEye />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <React.Fragment>
      {visite.length == 0 &&
      entretien.length == 0 &&
      maintenance.length == 0 &&
      props.visite_list.length == 0 ? (
        <ReactLoading
          type="spin"
          color="orange"
          height={667}
          width={375}
          className="Loading"
        />
      ) : (
        <React.Fragment>
          <MainLayout
            sharedData={[...visite, ...entretien, ...maintenance]}
            sharedColumns={forms_columns}
            header="Formulaire"
          />
          <AffichageFormulaire
            recordKey={key}
            visibilite={visible}
            list_vis={props.visite_list}
            list_ent={props.entretien_list}
            list_main={props.maintenance_list}
            type={modalType}
            modalEtatChanger={showModal}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  maintenance_list: state.planningReducer.Main,
  visite_list: state.planningReducer.Vis,
  entretien_list: state.planningReducer.Ent,
});
export default connect(mapStateToProps, {
  getMaintenanceForms,
  getVisiteForms,
  getEntretienForms,
})(Formulaires);
