import MainLayout from "../../Layout/mainLayout";
import { BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { deletePlanning, getPlanning } from "../../api/planning";
import { connect } from "react-redux";
import { getPlanningList } from "../../redux/actions/planningAction";

const Planning = (props) => {
  const [dataPlanning, setDataPlanning] = useState(props.planning_list);

  useEffect(() => {
    props.getPlanningList();
  }, []);

  useEffect(() => {
    setDataPlanning(props.planning_list);
  }, [props.planning_list]);

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
          <Button>
            <FaEye />
          </Button>
          {localStorage.getItem("UserRole") === "Ing" && (
            <React.Fragment>
              <Button>
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
    <MainLayout
      sharedData={dataPlanning}
      sharedColumns={planning_columns}
      header={"Planning"}
    />
  );
};

const mapStateToProps = (state) => ({
  planning_list: state.planningReducer.plan,
});
export default connect(mapStateToProps, { getPlanningList })(Planning);
