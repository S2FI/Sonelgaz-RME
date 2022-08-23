import MainLayout from "../../Layout/mainLayout";
import { BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { deletePlanning, getPlanning } from "../../api/planning";
import { connect } from "react-redux";
import {
  getPlanningList,
  getProgramme,
  getOuvrageData,
} from "../../redux/actions/planningAction";
import PlanningOperations from "../../crud/planning/planningOperations";
import AffichageModal from "../../crud/affichage/affichageModal";

const Planning = (props) => {
  const [loading, setloading] = useState(true);
  const [dataPlanning, setDataPlanning] = useState(props.planning_list);
  // const [dataProgram, setDataProgram] = useState(props.program_list);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // }, []);
  const loadAllData = async () => {
    await props.getPlanningList();
    await props.getProgramme();
    await props.getOuvrageData();
  };

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    console.log(loading);
    setDataPlanning(props.planning_list);
    setloading(false);
  }, [props.planning_list]);

  console.log("ouvrage props =>", props.ouvrage_list);

  const handleDelete = async (key) => {
    const newData = Object.values(dataPlanning).filter(
      (item) => item.key !== key
    );

    await deletePlanning(key);
    setDataPlanning(newData);
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
          <AffichageModal
            recordKey={record.key}
            record={record}
            dataProgram={props.program_list}
          />
          {localStorage.getItem("UserRole") === "Ing" && (
            <React.Fragment>
              <PlanningOperations
                recordKey={record.key}
                record={record}
                dataProgram={props.program_list}
              />
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
    <MainLayout
      sharedData={dataPlanning}
      sharedColumns={planning_columns}
      header={"Planning"}
      loading={loading}
    />
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
