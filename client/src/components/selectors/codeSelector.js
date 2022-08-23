import { Cascader, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
const { Option } = Select;
const CodeSelector = (props) => {
  const [values, setValues] = useState("");
  const [departState, setdepartState] = useState(props.codeData);
  const [codeState, setcodeState] = useState(props.codeValue);

  //   const options = [];

  //   for (let i = 0; i < 100000; i++) {
  //     const value = `${i.toString(36)}${i}`;
  //     options.push({
  //       label: value,
  //       value,
  //     });
  //   }
  //   const defVal = props.initValue === null ? [""] : props.initValue;

  console.log("selector depart =>", departState);
  console.log("selector code =>", codeState);
  const handelChange = (values) => {
    props.getSelectorData(values);
    setdepartState(props.codeData);
    setcodeState(props.codeValue);
    // setValues(values);
  };
  return (
    <Form.Item
      name={props.name}
      //   initialValue={defVal}
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
        value={codeState}
      >
        {departState.map((code) => (
          <Option key={code}>{code}</Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CodeSelector;
