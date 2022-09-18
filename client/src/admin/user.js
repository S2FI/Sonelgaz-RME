import { Modal } from "antd";
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { onDelete } from "../api/auth";
import MainLayout from "../Layout/mainLayout";
import { getUserList } from "../redux/actions/authAction";
import UserOperations from "./userOperations";
import { Store } from "react-notifications-component";
const UserList = (props) => {
  // modal setup
  const [modal, contextHolder] = Modal.useModal();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [userList, setUserList] = useState(props.usersList);

  const InsertNotifError = (message) => {
    Store.addNotification({
      title: "Suppression",
      message: message,
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
    InsertNotifError("L'utilisateur a ete supprimer avec success");
    setUserList(newData);
  };

  const user_columns = [
    {
      title: "Nom d'utilisateur",
      dataIndex: "username",
      key: "username",
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
      align: "center",
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
