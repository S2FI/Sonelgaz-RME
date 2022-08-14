import { MdDeleteForever } from "react-icons/md";
import { Popconfirm, Space, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import UserUpdateForm from "../crud/userUpdateForm";
import { BsPencilFill } from "react-icons/bs";
function UserOperations(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <React.Fragment>
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => props.handleDelete(props.recordKey)}
      >
        <Button>
          <MdDeleteForever />
        </Button>
      </Popconfirm>
      <Space>
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
          <UserUpdateForm id={props.recordKey} record={props.record} />
        </Modal>
      </Space>
    </React.Fragment>
  );
}

export default UserOperations;
