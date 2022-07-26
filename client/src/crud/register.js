import { useState } from "react";
import { onRegistration } from "../api/auth";
import { Button, Checkbox, Form, Input } from "antd";

const Register = () => {
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
    } catch (error) {
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
          <Input />
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
          <Input />
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

export default Register;
