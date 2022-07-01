import { SettingOutlined } from "@ant-design/icons";
import { Cascader, Input, Select, Space } from "antd";
const { Option } = Select;

const InputSelector = (props) => {
  return (
    <Space direction="vertical">
      <Select defaultValue={props.defaultValue} className="select">
        <Option value={props.option1}>{props.option1}</Option>
        <Option value={props.option2}>{props.option2}</Option>
      </Select>
    </Space>
  );
};

export default InputSelector;