import { Space, Tag } from "antd";
import { MdDeleteForever } from "react-icons/md";
import MainLayout from "../Layout/mainLayout";

const trace_data = [
  {
    key: "1",
    user: "admin",
    role: "Admin",
    ip: localStorage.getItem("UserIp"),
    operation: "modifier planning",
  },
];
const trace_columns = [
  {
    title: "Nom d'utilisateur",
    dataIndex: "user",
    key: "user",
    sorter: true,
  },
  {
    title: "Le Role",
    dataIndex: "role",
    key: "role",
    sorter: false,
  },
  {
    title: "IP d'utilisateur",
    dataIndex: "ip",
    key: "ip",
    sorter: false,
  },
  {
    title: "Operation effectue",
    dataIndex: "operation",
    key: "operation",
    sorter: false,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>
          <MdDeleteForever />
        </a>
      </Space>
    ),
  },
];

const Tracabilite = () => {
  return (
    <MainLayout
      sharedData={trace_data}
      sharedColumns={trace_columns}
      header="Tracabilite"
    />
  );
};

export default Tracabilite;
