import { Popconfirm, Space, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { connect } from "react-redux";
import { onDelete } from "../api/auth";
import UserUpdateForm from "../crud/userUpdateForm";
import MainLayout from "../Layout/mainLayout";
import { getUserList } from "../redux/actions/authAction";
import UserOperations from "./userOperations";

const UserList = (props) => {
  // modal setup
  const [modal, contextHolder] = Modal.useModal();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [userList, setUserList] = useState(props.usersList);

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  //get Userlist
  useEffect(() => {
    props.getUserList();
  }, []);

  useEffect(() => {
    setUserList(props.usersList);
    setloading(false);
  }, [props.usersList]);

  const handleDelete = async (key) => {
    const newData = Object.values(userList).filter((item) => item.key !== key);

    await onDelete(key);
    setUserList(newData);
  };

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
      title: "operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, record, index) =>
        UserList.length >= 1 ? (
          <UserOperations
            recordKey={record.key}
            record={record}
            handleDelete={handleDelete}
          />
        ) : null,
    },
  ];

  return (
    <MainLayout
      sharedData={userList}
      sharedColumns={user_columns}
      header={"UserList"}
      loading={loading}
    />
  );
};

const mapStateToProps = (state) => ({
  usersList: state.authReducer.users,
});
export default connect(mapStateToProps, { getUserList })(UserList);
