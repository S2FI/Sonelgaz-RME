import { Cascader, Form, Input, Select, Space } from "antd";
import { useState } from "react";
const { Option } = Select;
const InputSelector = (props) => {
  const [values, setValues] = useState("");

  const handelChange = (values) => {
    props.getSelectorData(values);
  };
  return (
    <Form.Item
      name={props.name}
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

export default InputSelector;
// <Select
//   onChange={(value) => {
//     setdepartState(props.ouvrage_list[value]);
//     console.log(
//       "value on change depart =>>>>",
//       props.ouvrage_list[value]
//     );
//     setselectedDepart(value);
//     setcodeState(props.ouvrage_list[value][0]);
//     setSelectData((prevdata) => {
//       return { ...prevdata, [0]: { ...prevdata[0], depart: value } };
//     });
//   }}
// >
//   {depart_options.map((depart) => (
//     <Select.Option value={depart} key={depart}>
//       {depart}
//     </Select.Option>
//   ))}
// </Select>

// ligne: (
//   <Select
//     mode="multiple"
//     maxTagCount="responsive"
//     style={{
//       width: "100%",
//     }}
//     onChange={(value) => {
//       setcodeState(value);
//       setSelectData((prevdata) => {
//         return {
//           ...prevdata,
//           [0]: { ...prevdata[0], code_ouvrage: value },
//         };
//       });
//     }}
//   >
//     {
//       // console.log("sssssssssssssssss", listCodeSelectedDepart)
//       renderList()
//     }
//   </Select>
// ),
