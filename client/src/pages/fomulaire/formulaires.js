import MainLayout from "../../Layout/mainLayout";
import { Button, Space, Table, Tag } from "antd";
import { FaEye } from "react-icons/fa";
import { connect } from "react-redux";
import { getMaintenanceForms } from "../../redux/actions/planningAction";
import { useEffect } from "react";

const forms_data = [
  {
    key: "1",
    date: "30-05-2017",
    title: "formulaire annual des ouvrages",

    type: ["Entretien"],
  },
  {
    key: "2",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
];
const forms_columns = [
  {
    title: "Date de creation",
    dataIndex: "date",
    key: "date",
    sorter: true,
  },
  {
    title: "Titre de planning",
    dataIndex: "title",
    key: "title",
    sorter: false,
  },

  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (tags) => (
      <>
        {tags.map((tag) => (
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
    render: (_, record) => (
      <Space size="middle">
        <Button>
          <FaEye />
        </Button>
      </Space>
    ),
  },
];
const Formulaires = (props) => {
  useEffect(() => {
    props.getMaintenanceForms();
  }, []);
  // const unique = [
  //   ...new Set(
  //     props.maintenance_list.map((data) => {
  //       Object.keys(data).forEach(async (key) => {
  //         return data[key];
  //       });
  //     })
  //   ),
  // ];
  console.log("la79et leloucha", props.maintenance_list);
  return (
    <MainLayout
      sharedData={forms_data}
      sharedColumns={forms_columns}
      header="Formulaire"
    />
  );
};

const mapStateToProps = (state) => ({
  maintenance_list: state.planningReducer.Main,
});
export default connect(mapStateToProps, { getMaintenanceForms })(Formulaires);
