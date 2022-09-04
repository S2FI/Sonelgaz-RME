import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createPlanning } from "../../api/planning";
import PlanningForms from "./planningForm";
import {
  getPlanningList,
  getProgramme,
  getOuvrageData,
} from "../../redux/actions/planningAction";
import DepartSelector from "../../components/selectors/departSelector";
const { Option } = Select;

const PlanningFormInfos = (props) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false); //init error state
  const [success, setSuccess] = useState(false);
  const [finish, setFinish] = useState(false);
  const [dataOuvrage, setDataOuvrage] = useState(props.ouvrage_list);

  const [values, setValues] = useState({
    Titre_planning: "",
    Type_planning: "",
    code_visite: "",
    user_created: localStorage.getItem("Username"),
    program: {},
  });
  // console.log("la79et pien louvrage =>", dataOuvrage);
  // const insertProgram = (selectData) => {
  //   setProgramData(selectData);
  // }=;
  const onClick = async (values) => {
    setFinish(true);
    // setDate(true);
  };
  const onFinish = async (values) => {
    // Object.keys(values.program).forEach(async (key, index) => {
    //   console.log("first keys =>", key);
    //   console.log(
    //     "first keys =>",
    //     values.program[key].hasOwnProperty("date_debut_programme")
    //   );

    //   if (values.program[key].hasOwnProperty("date_debut_programme") == false) {
    //     setDate(false);
    //     return true;.
    //   }
    // });
    // console.log("first keys =>", date);
    // if (date == false) {
    //   console.log("est que rah yedkhol hna wla non?");
    //   setError("Veuillez indiquer la date");
    // } else {
    setFinish(true);
    console.log("Success:", values);
    try {
      const { data } = await createPlanning(values);
      setError("");
      setSuccess(data.message);
      console.log(data);
      props.getPlanningList();
      props.getProgramme();
      setFinish(false);
      props.handleOk();
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
      {/* <DepartSelector /> */}

      <PlanningForms form={form} finish={finish} />

      <Form.Item name="submit">
        <Button key="submit" type="primary" htmlType="submit" onClick={onClick}>
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
  ouvrage_list: state.planningReducer.data,
});
export default connect(mapStateToProps, {
  getPlanningList,
  getProgramme,
  getOuvrageData,
})(PlanningFormInfos);
