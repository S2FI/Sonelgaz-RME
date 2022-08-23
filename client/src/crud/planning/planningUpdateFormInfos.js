import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getProgramme,
  getPlanningList,
} from "../../redux/actions/planningAction";
import PlanningFormInfos from "../../pages/Planning/planningFormInfos";
import PlanningUpdateForms from "./planningUpdateForms";
import { getFullPlanning, updatePlanning } from "../../api/planning";

const { Option } = Select;

const PlanningUpdateForm = (props) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false); //init error state
  const [success, setSuccess] = useState(false);
  const [finish, setFinish] = useState(false);
  const [allData, setallData] = useState(props.programs);

  const [defaultData, setdefaultData] = useState({
    Titre_planning: "",
    Type_planning: "",
  });

  const [values, setValues] = useState({
    Titre_planning: "",
    Type_planning: "",
    code_visite: "",
    user_created: localStorage.getItem("Username"),
    program: {},
  });
  // useEffect(() => {
  //   props.getProgramme(props.id);
  // }, []);

  useEffect(() => {
    setallData(props.programs);
    console.log("datasourse li tba3tet =>", props.programs);
  }, [JSON.stringify(props.programs)]);

  // console.log("============================********", props.programs);
  // console.log("=========================================", allData.program);
  // const insertProgram = (selectData) => {
  //   setProgramData(selectData);
  // };
  const onClick = async () => {
    setFinish(true);
  };

  const onFinish = async (values) => {
    setFinish(true);
    console.log("Success:", values);
    // console.log(values.Titre);
    // console.log(values.type);
    // console.log(values.program);
    // console.log(values.program);
    console.log("my update id =>", props.id);
    try {
      const { data } = await updatePlanning(props.id, values);
      setFinish(false);
      setError("");
      setSuccess(data.message);
      console.log(data);
      props.getPlanningList();
      props.getProgramme();
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setSuccess("");
    }
  };

  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      form={form}
      labelCol={{
        span: 3,
      }}
    >
      <Form.Item
        label="Titre"
        name="Titre_planning"
        initialValue={allData.Titre_planning}
        value={values.Titre_planning}
        rules={[
          {
            required: true,
            message: "Le titre est obligatoire",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Type"
        name="Type_planning"
        value={values.Type_planning}
        initialValue={allData.Type_planning}
        rules={[
          {
            required: true,
            message: "Le type est obligatoire",
          },
        ]}
      >
        <Select placeholder="Selectionez le type du planning">
          <Option value="Visite">Visite</Option>
          <Option value="Entretien">Entretien</Option>
          <Option value="Maintenance">Maintenance</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Plan Visite"
        name="code_visite"
        value={values.code_visite}
      >
        <Select placeholder="Selectionez le type du planning">
          <Option value="planning visite 1">planning visite 1</Option>
          <Option value="planning visite 2">planning visite 2</Option>
          <Option value=" ">None</Option>
        </Select>
      </Form.Item>

      <PlanningUpdateForms
        form={form}
        finish={finish}
        program_data={allData.program}
      />

      <Form.Item name="submit">
        <Button key="submit" type="primary" htmlType="submit" onClick={onClick}>
          Modifier planning
        </Button>
      </Form.Item>
      <Form.Item>
        <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
        <div style={{ color: "green", margin: "10px 0" }}>{success}</div>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  program_list: state.planningReducer.program,
});
export default connect(mapStateToProps, { getProgramme, getPlanningList })(
  PlanningUpdateForm
);
