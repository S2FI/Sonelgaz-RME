import { useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { connect } from "react-redux";
import { onUpdate } from "../api/auth";
import { getUserList } from "../redux/actions/authAction";
import { Store } from "react-notifications-component";
const UserUpdateForm = (props) => {
  const [updateValues, setUpdateValues] = useState({
    // init
    username: "",
    password: "",
    role: "",
    nom: "",
    prenom: "",
  });
  const [error, setError] = useState(false); //init error state
  const [success, setSuccess] = useState(false); // init success state

  const InsertNotifSuccess = (message) => {
    Store.addNotification({
      title: "Modification",
      message: message,
      type: "info",
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
  const InsertNotifError = (message) => {
    Store.addNotification({
      title: "Modification",
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
  const onFinish = async (updateValues) => {
    try {
      const { data } = await onUpdate(props.id, updateValues);

      setError("");
      setSuccess(data.message);
      setUpdateValues({ username: "", password: "", role: "" });
      props.getUserList();
      props.hidemymodal();
      InsertNotifSuccess("Le compte a ete modifier avec succees");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      InsertNotifError(error.response.data.error);
      setSuccess("");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        key={props.id}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          initialValue={props.record.username}
          value={updateValues.username}
          rules={[
            {
              required: true,
              message: "Nom d'utilisateur est obligatoire",
            },
          ]}
        >
          <Input
            disabled={
              props.record.username === "amine" ||
              props.record.username === "farid" ||
              props.record.username === "ahmed"
                ? true
                : false
            }
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value={updateValues.password}
          rules={[
            {
              required: true,
              message: "Le mot de passe est obligatoire!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          initialValue={props.record.role}
          value={updateValues.role}
          rules={[
            {
              required: true,
              message: "Le role est obligatoire",
            },
          ]}
        >
          <Select placeholder="Designer le role">
            <Select.Option
              value="User"
              disabled={
                props.record.username === "amine" ||
                props.record.username === "farid" ||
                props.record.username === "ahmed"
                  ? true
                  : false
              }
            >
              User
            </Select.Option>
            <Select.Option
              value="Chef"
              disabled={
                props.record.username === "amine" ||
                props.record.username === "farid" ||
                props.record.username === "ahmed"
                  ? false
                  : true
              }
            >
              Chef
            </Select.Option>
            <Select.Option
              value="Ing"
              disabled={
                props.record.username === "amine" ||
                props.record.username === "farid" ||
                props.record.username === "ahmed"
                  ? true
                  : false
              }
            >
              Ing
            </Select.Option>
            <Select.Option value="Admin" disabled>
              Admin
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Nom"
          name="nom"
          value={updateValues.nom}
          initialValue={props.record.nom}
          rules={[
            {
              required: true,
              message: "Le nom est obligatoire",
            },
          ]}
        >
          <Input placeholder="Entrer le nom" />
        </Form.Item>
        <Form.Item
          label="Prenom"
          name="prenom"
          initialValue={props.record.prenom}
          value={updateValues.prenom}
          rules={[
            {
              required: true,
              message: "Le prenom est obligatoire",
            },
          ]}
        >
          <Input placeholder="Entrer le prenom" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
        <Form.Item>
          <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  usersList: state.authReducer.users,
});
export default connect(mapStateToProps, { getUserList })(UserUpdateForm);
