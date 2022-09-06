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
import { Store } from "react-notifications-component";
const { Option } = Select;

const PlanningUpdateForm = (props) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false); //init error state
  const [success, setSuccess] = useState(false);
  const [finish, setFinish] = useState(false);
  const [allData, setallData] = useState(props.programs);

  const [values, setValues] = useState({
    Titre_planning: "",
    Type_planning: "",
    code_visite: "",
    program: {},
  });

  const [entretien, setEntretien] = useState(
    props.type == "Entretien" ? true : false
  );

  const unique = [...new Set(props.listVisite)];
  console.log("uupdate unl;ajdfkdls;fj =>>>", unique);

  useEffect(() => {
    setallData(props.programs);
  }, [JSON.stringify(props.programs)]);

  const InsertNotifUpdate = (message) => {
    Store.addNotification({
      title: "Update",
      message: message,
      type: "info",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };

  const onClick = async () => {
    setFinish(true);
  };

  const onFinish = async (values) => {
    setFinish(true);
    console.log("Success:", values);

    console.log("my update id =>", props.id);
    try {
      const { data } = await updatePlanning(props.id, values);
      setFinish(false);
      setError("");
      setSuccess(data.message);
      InsertNotifUpdate(data.message);
      console.log(data);
      props.getPlanningList();
      props.getProgramme();
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
        initialValue={props.title}
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
        initialValue={props.type}
        rules={[
          {
            required: true,
            message: "Le type est obligatoire",
          },
        ]}
      >
        <Select
          placeholder="Selectionez le type du planning"
          onChange={(value) => {
            if (value === "Entretien") {
              setEntretien(true);
            } else {
              setEntretien(false);
            }
          }}
        >
          <Option value="Visite">Visite</Option>
          <Option value="Entretien">Entretien</Option>
          <Option value="Maintenance">Maintenance</Option>
        </Select>
      </Form.Item>

      {entretien && (
        <Form.Item
          label="Plan Visite"
          name="code_visite"
          value={values.code_visite}
          rules={[
            {
              required: true,
              message: "Le plan visite est obligatoire pour les entretiens",
            },
          ]}
        >
          <Select placeholder="Selectionez le planning de visite">
            {unique.map((code) => (
              <Select.Option value={code} key={code}>
                {code}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}

      <PlanningUpdateForms form={form} finish={finish} program_data={allData} />

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
