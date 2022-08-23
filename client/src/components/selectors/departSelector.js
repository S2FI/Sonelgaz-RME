import { Select } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
const { Option } = Select;

const DepartSelector = (props) => {
  let depart_options = [];
  Object.keys(props.ouvrage_list).forEach(async (key, index) => {
    depart_options.push(key);
  });

  // console.log("ou hadou les departs =>", depart_options);

  const [departState, setdepartState] = useState(
    props.ouvrage_list[depart_options[0]]
  );
  const [codeState, setcodeState] = useState(
    props.ouvrage_list[depart_options[0]][0]
  );

  const handleProvinceChange = (value) => {
    setdepartState(props.ouvrage_list[value]);
    setcodeState(props.ouvrage_list[value][0]);
  };

  const onSecondCityChange = (value) => {
    setcodeState(value);
  };

  return (
    <>
      <Select
        defaultValue={depart_options[0]}
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
      <Select
        style={{
          width: 120,
        }}
        mode="multiple"
        value={codeState}
        onChange={onSecondCityChange}
      >
        {departState.map((code) => (
          <Select.Option value={code} key={code}>
            {code}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

const mapStateToProps = (state) => ({
  ouvrage_list: state.planningReducer.data,
});
export default connect(mapStateToProps, {})(DepartSelector);
