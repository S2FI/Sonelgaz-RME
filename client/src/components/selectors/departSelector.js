import { Divider, Select, Space } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
const { Option } = Select;

const DepartSelector = (props) => {
  let depart_options = [];
  Object.keys(props.ouvrage_list).forEach(async (key, index) => {
    depart_options.push(key);
  });
  // const [optionsSelected, setOptionsSelected] = useState([]);
  // console.log("ou hadou les departs =>", depart_options);

  const [departState, setdepartState] = useState([]);
  const [codeState, setcodeState] = useState([]);

  const handleProvinceChange = (value) => {
    props.getSelectorData(value);
    setdepartState(props.ouvrage_list[value]);
    setcodeState([]);
  };

  const onSecondCityChange = (value) => {
    props.getSelectorData2(value);
    setcodeState(value);
  };
  //const filteredOptions = departState?.filter((o) => !codeState.includes(o));

  return (
    <Space>
      <Select
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
        allowClear="true"
        style={{
          width: 180,
        }}
        mode="multiple"
        // maxTagCount="responsive"
        value={codeState}
        onChange={onSecondCityChange}
      >
        {departState?.map((code) => (
          <Select.Option
            value={code}
            key={code}
            // disabled={
            //   codeState.length > 2
            //     ? codeState.includes(code)
            //       ? false
            //       : true
            //     : false
            // }
          >
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
export default connect(mapStateToProps, {})(DepartSelector);
