import { useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { connect } from "react-redux";
import { onUpdate } from "../api/auth";
import { getUserList } from "../redux/actions/authAction";

const UserUpdateForm = (props) => {
  const [updateValues, setUpdateValues] = useState({
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
  // };0
  const onFinish = async (updateValues) => {
    try {
      const { data } = await onUpdate(props.id, updateValues);

      setError("");
      setSuccess(data.message);
      setUpdateValues({ username: "", password: "", role: "" });
      props.getUserList();
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
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value={updateValues.password}
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
          initialValue={props.record.role}
          value={updateValues.role}
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
            Update
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
export default connect(mapStateToProps, { getUserList })(UserUpdateForm);
