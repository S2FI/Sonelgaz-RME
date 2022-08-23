import { Cascader, Form, Input, Select, Space } from "antd";
import { useState } from "react";
const { Option } = Select;
const DefaultSelector = (props) => {
  const [values, setValues] = useState("");

  const handelChange = (values) => {
    props.getSelectorData(values);
  };
  return (
    <Form.Item
      name={props.name}
      initialValue={props.initValue}
      rules={[
        {
          required: true,
          message: "obligatoire",
        },
      ]}
    >
      <Select
        onChange={handelChange}
        style={{
          width: 80,
        }}
      >
        <Option value={props.option1}>{props.option1}</Option>
        <Option value={props.option2}>{props.option2}</Option>
      </Select>
    </Form.Item>
  );
};

export default DefaultSelector;
