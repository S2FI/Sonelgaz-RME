import { Divider, Select, Space } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
const { Option } = Select;

const DefaultSelector = (props) => {
  let depart_options = [];
  Object.keys(props.ouvrage_list).forEach(async (key, index) => {
    depart_options.push(key);
  });

  // console.log("ou hadou les departs =>", depart_options);

  const [departState, setdepartState] = useState(
    props.ouvrage_list[props.initdepart]
  );
  const [codeState, setcodeState] = useState(props.initcode);

  const handleProvinceChange = (value) => {
    props.getSelectorData(value);
    setdepartState(props.ouvrage_list[value]);
    setcodeState([]);
  };

  const onSecondCityChange = (value) => {
    props.getSelectorData2(value);
    setcodeState(value);
  };

  return (
    <Space>
      <Select
        defaultValue={props.initdepart}
        style={{
          width: 120,
        }}
        onChange={handleProvinceChange}
      >
        {depart_options.map((depart) => (
          <Select.Option value={depart} key={depart}>
            {depart}
          </Select.Option>
        ))}
      </Select>
      <Divider type="vertical" />
      <Select
        style={{
          width: 180,
        }}
        mode="multiple"
        maxTagCount="responsive"
        value={codeState}
        onChange={onSecondCityChange}
      >
        {departState.map((code) => (
          <Select.Option value={code} key={code}>
            {code}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};

const mapStateToProps = (state) => ({
  ouvrage_list: state.planningReducer.data,
});
export default connect(mapStateToProps, {})(DefaultSelector);
