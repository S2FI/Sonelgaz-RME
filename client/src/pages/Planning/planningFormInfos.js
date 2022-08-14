import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createPlanning } from "../../api/planning";
import PlanningForms from "./planningForm";
import { getPlanningList } from "../../redux/actions/planningAction";
const { Option } = Select;

const PlanningFormInfos = (props) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false); //init error state
  const [success, setSuccess] = useState(false);
  const [programData, setProgramData] = useState({});
  const [values, setValues] = useState({
    Titre_planning: "",
    Type_planning: "",
    user_created: localStorage.getItem("Username"),
    program: {},
  });
  // const insertProgram = (selectData) => {
  //   setProgramData(selectData);
  // };
  const onFinish = async (values) => {
    console.log("Success:", values);
    // console.log(values.Titre);
    // console.log(values.type);
    // console.log(values.program);
    console.log(values.program);
    try {
      const { data } = await createPlanning(values);

      setError("");
      setSuccess(data.message);
      console.log(data);
      props.getPlanningList();
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
        span: 2,
      }}
    >
      <Form.Item
        label="Titre"
        name="Titre_planning"
        value={values.Titre_planning}
        rules={[
          {
            required: true,
            message: "Le titre est obligatoire",
          },
        ]}
      >
        <Input placeholder="Entrez le titre du planning" />
      </Form.Item>
      <Form.Item
        label="Type"
        name="Type_planning"
        value={values.Type_planning}
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

      <PlanningForms form={form} />

      <Form.Item name="submit">
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          // onClick={insertProgram}
        >
          Enregistrer planning
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
  planning_list: state.planningReducer.plan,
});
export default connect(mapStateToProps, { getPlanningList })(PlanningFormInfos);
