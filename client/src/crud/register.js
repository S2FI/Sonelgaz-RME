import { useState } from "react";
import { onRegistration } from "../api/auth";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { getUserList } from "../redux/actions/authAction";
import { connect } from "react-redux";
import { Store } from "react-notifications-component";
const Register = (props) => {
  const [values, setValues] = useState({
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
      title: "Inscription",
      message: message,
      type: "success",
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
      title: "Registration",
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
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const { data } = await onRegistration(values); // wait for register Post request (api/auth.js)
      setError("");
      setSuccess(data.message);
      setValues({ username: "", password: "", role: "" }); // init values after success
      props.getUserList();
      InsertNotifSuccess(
        "Le compte de l'utilisateur " +
          values.username +
          " a ete creer avec succees"
      );
      props.handleOk();
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
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          value={values.username}
          rules={[
            {
              required: true,
              message: "Nom d'utilisateur est obligatoire",
            },
          ]}
        >
          <Input placeholder="Entrer le nom d'utilisateur" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value={values.password}
          rules={[
            {
              required: true,
              message: " Le mot de passe est obligatoire!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          value={values.role}
          rules={[
            {
              required: true,
              message: "Le role est obligatoire",
            },
          ]}
        >
          <Select placeholder="Designer le role">
            <Select.Option value="User">User</Select.Option>
            <Select.Option value="Chef" disabled>
              Chef
            </Select.Option>
            <Select.Option value="Ing">Ing</Select.Option>
            <Select.Option value="Admin" disabled>
              Admin
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Nom"
          name="nom"
          value={values.nom}
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
          value={values.prenom}
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
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
          <div style={{ color: "green", margin: "10px 0" }}>{success}</div>
        </Form.Item>
      </Form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  usersList: state.authReducer.users,
});
export default connect(mapStateToProps, { getUserList })(Register);
