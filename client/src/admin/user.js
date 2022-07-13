import { Space, Tag } from "antd";
import { useEffect } from "react";
import { BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { connect } from "react-redux";
import MainLayout from "../Layout/mainLayout";
import { getUserList } from "../redux/actions/authAction";

const user_columns = [
  {
    title: "Nom d'utilisateur",
    dataIndex: "username",
    key: "username",
    sorter: true,
  },
  {
    title: "Le Role",
    dataIndex: "role",
    key: "role",
    sorter: false,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>
          <BsPencilFill />
        </a>
        <a>
          <MdDeleteForever />
        </a>
      </Space>
    ),
  },
];

const UserList = (props) => {
  useEffect(() => {
    props.getUserList();
  }, []);

  return (
    <MainLayout
      sharedData={props.usersList}
      sharedColumns={user_columns}
      header={"UserList"}
    />
  );
};

const mapStateToProps = (state) => ({
  usersList: state.authReducer.users,
});
export default connect(mapStateToProps, { getUserList })(UserList);
