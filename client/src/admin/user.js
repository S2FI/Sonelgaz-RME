import { Popconfirm, Space, Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { connect } from "react-redux";
import { onDelete } from "../api/auth";
import UserUpdateForm from "../crud/userUpdateForm";
import MainLayout from "../Layout/mainLayout";
import { getUserList } from "../redux/actions/authAction";

const UserList = (props) => {
  // modal setup
  const [modal, contextHolder] = Modal.useModal();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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

  const [userList, setUserList] = useState(props.usersList);

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
      render: (_, record) =>
        UserList.length >= 1 ? (
          <>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button>
                <MdDeleteForever />
              </Button>
            </Popconfirm>
            <Space>
              <>
                <Button onClick={showModal}>
                  <BsPencilFill />
                </Button>

                <Modal
                  title="Update"
                  visible={visible}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  footer={[]}
                >
                  <UserUpdateForm id={record.key} />
                </Modal>
              </>
            </Space>
          </>
        ) : null,
    },
  ];

  return (
    <MainLayout
      sharedData={userList}
      sharedColumns={user_columns}
      header={"UserList"}
    />
  );
};

const mapStateToProps = (state) => ({
  usersList: state.authReducer.users,
});
export default connect(mapStateToProps, { getUserList })(UserList);
