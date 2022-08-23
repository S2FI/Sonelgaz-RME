import { Cascader, Form, Input, Select, Space } from "antd";
import { useState } from "react";
const { Option } = Select;
const OuvrageSelector = (props) => {
  const [values, setValues] = useState("");

  const options = [];

  for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    options.push({
      label: value,
      value,
    });
  }
  const defVal = props.initValue === null ? [""] : props.initValue;

  const handelChange = (values) => {
    props.getSelectorData(values);
  };
  return (
    <Form.Item
      name={props.name}
      initialValue={defVal}
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
          width: 90,
        }}
        mode="multiple"
        options={options}
      />
    </Form.Item>
  );
};

export default OuvrageSelector;
