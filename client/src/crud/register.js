import { useState } from "react";
import { onRegistration } from "../api/auth";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { getUserList } from "../redux/actions/authAction";
import { connect } from "react-redux";
const Register = (props) => {
  const [values, setValues] = useState({
    // init
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(false); //init error state
  const [success, setSuccess] = useState(false); // init success state

  // const onChange = (e) => {
  //   //allow data entry in input tags
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const { data } = await onRegistration(values); // wait for register Post request (api/auth.js)

      setError("");
      setSuccess(data.message);
      setValues({ username: "", password: "", role: "" }); // init values after success
      props.getUserList();
      props.handleOk();
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
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
              message: "Please input your username!",
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
              message: "Please input your password!",
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
              message: "Please input the user role",
            },
          ]}
        >
          <Select placeholder="Designer le role">
            <Select.Option value="User">User</Select.Option>
            <Select.Option value="Chef">Chef</Select.Option>
            <Select.Option value="Ing">Ing</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
          </Select>
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
