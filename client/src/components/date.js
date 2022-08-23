import { Cascader, Form, Input, Select, Space, DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";
const { Option } = Select;
const Date = (props) => {
  const [values, setValues] = useState("");
  const { RangePicker } = DatePicker;

  const defDeb =
    props.date_debut === null ? moment() : moment(props.date_debut);
  const defin = props.date_fin === null ? moment() : moment(props.date_fin);

  const handelChange = (values, dateString) => {
    props.getSelectorData(values, dateString);
  };
  return (
    <RangePicker
      allowEmpty={true}
      onChange={handelChange}
      format="YYYY/MM/DD"
    />
  );
};

export default Date;
