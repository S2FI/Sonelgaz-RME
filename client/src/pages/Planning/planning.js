import MainLayout from "../../Layout/mainLayout";
import { BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { deletePlanning, getPlanning } from "../../api/planning";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import {
  getPlanningList,
  getProgramme,
  getOuvrageData,
} from "../../redux/actions/planningAction";
import PlanningOperations from "../../crud/planning/planningOperations";
import AffichageModal from "../../crud/affichage/affichageModal";
import { Store } from "react-notifications-component";
const Planning = (props) => {
  const [loading, setloading] = useState(true);
  const [dataPlanning, setDataPlanning] = useState(props.planning_list);
  const [dataProgram, setDataProgram] = useState(props.program_list);
  const [key, setkey] = useState("");
  const [updatekey, setupdatekey] = useState("");
  const [visible, setVisible] = useState(false);
  const [updateVisible, setupdateVisible] = useState(false);
  const [visiteList, setvisiteList] = useState([]);

  useEffect(() => {
    props.getPlanningList();
    props.getProgramme();
    props.getOuvrageData();
  }, []);

  useEffect(() => {
    setDataPlanning(props.planning_list);
    props.planning_list?.map((data) => {
      if (data.Type_planning == "Visite") {
        setvisiteList((prevdata) => {
          return [...prevdata, data.Titre_planning];
        });
      }
    });
    setloading(false);
  }, [props.planning_list]);

  console.log(visiteList);

  useEffect(() => {
    setDataProgram(props.program_list);
  }, [props.program_list]);

  const InsertNotifError = (message) => {
    Store.addNotification({
      title: "Delete",
      message: "Planning has been deleted",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };
  const handleDelete = async (key) => {
    const newData = Object.values(dataPlanning).filter(
      (item) => item.key !== key
    );
    await deletePlanning(key);
    InsertNotifError();
    setDataPlanning(newData);
  };
  //modal functions
  const showModal = (bool) => {
    setVisible(bool);
  };
  const showupdateModal = (bool) => {
    setupdateVisible(bool);
  };

  const planning_columns = [
    {
      title: "Date de creation",
      dataIndex: "date",
      key: "date",
      sorter: true,
    },
    {
      title: "Titre de planning",
      dataIndex: "Titre_planning",
      key: "Titre_planning",
      sorter: false,
    },

    {
      title: "Type",
      dataIndex: "Type_planning",
      key: "Type_planning",
      render: (tag) => (
        <React.Fragment>
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        </React.Fragment>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setVisible(true);
              setkey(record.key);
              // setDataProgram(props.program_list);
            }}
          >
            <FaEye />
          </Button>
          {localStorage.getItem("UserRole") === "Ing" && (
            <React.Fragment>
              <Button
                onClick={() => {
                  setupdateVisible(true);
                  setupdatekey(record.key);
                  // setDataProgram(props.program_list);
                }}
              >
                <BsPencilFill />
              </Button>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <Button>
                  <MdDeleteForever />
                </Button>
              </Popconfirm>
            </React.Fragment>
          )}
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {props.program_list.length === 0 && props.planning_list.length != 0 ? (
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
            sharedData={dataPlanning}
            listVisite={visiteList}
            sharedColumns={planning_columns}
            header={"Planning"}
            loading={loading}
          />
          <AffichageModal
            recordKey={key}
            visibilite={visible}
            dataProgram={dataProgram}
            modalEtatChanger={showModal}
          />
          <PlanningOperations
            recordKey={updatekey}
            visibilite={updateVisible}
            listVisite={visiteList}
            dataProgram={dataProgram}
            modalEtatChanger={showupdateModal}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  planning_list: state.planningReducer.plan,
  program_list: state.planningReducer.program,
  ouvrage_list: state.planningReducer.data,
});
export default connect(mapStateToProps, {
  getPlanningList,
  getProgramme,
  getOuvrageData,
})(Planning);
