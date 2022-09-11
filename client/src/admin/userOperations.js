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
  const hidemodal = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <Space>
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => props.handleDelete(props.recordKey)}
        disabled={
          props.record.username === "admin" || props.record.role === "Chef"
            ? true
            : false
        }
      >
        <Button
          disabled={
            props.record.username === "admin" || props.record.role === "Chef"
              ? true
              : false
          }
        >
          <MdDeleteForever />
        </Button>
      </Popconfirm>

      <Button
        onClick={showModal}
        disabled={props.record.username === "admin" ? true : false}
      >
        <BsPencilFill />
      </Button>

      <Modal
        title="Update"
        visible={visible}
        destroyOnClose="true"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}
      >
        <UserUpdateForm
          id={props.recordKey}
          record={props.record}
          hidemymodal={hidemodal}
        />
      </Modal>
    </Space>
  );
}

export default UserOperations;
