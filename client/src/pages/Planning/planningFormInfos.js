import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createPlanning } from "../../api/planning";
import PlanningForms from "./planningForm";
import {
  getPlanningList,
  getProgramme,
  getOuvrageData,
} from "../../redux/actions/planningAction";
import { Store } from "react-notifications-component";
import { onActionTrack } from "../../api/auth";
const { Option } = Select;

const PlanningFormInfos = (props) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false); //init error state
  const [finish, setFinish] = useState(false);
  const [arr, setArr] = useState([]);
  const [values, setValues] = useState({
    Titre_planning: "",
    Type_planning: "",
    code_visite: "",
    program: {},
  });

  const [entretien, setEntretien] = useState(false);
  const unique = [...new Set(props.listVisite)];

  function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
  }
  const InsertNotifSuccess = (message) => {
    Store.addNotification({
      title: "Insert",
      message: message,
      type: "success",
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
  const InsertNotifError = (message) => {
    Store.addNotification({
      title: "Insert",
      message: message,
      type: "danger",
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

  const onClick = async (values) => {
    setFinish(true);
  };
  const onFinish = async (values) => {
    const valuesToTrack = {
      tracked_user: localStorage.getItem("Username"),
      user_role: localStorage.getItem("UserRole"),
      action_tracked: "a cree un planning",
    };
    setFinish(true);
    const valuesToInsert = {
      ...values,
      user_created: localStorage.getItem("Username"),
    };
    console.log("Success:", valuesToInsert);
    console.log(values.program);
    try {
      let list = [];
      Object.keys(values.program).forEach(async (key) => {
        console.log(key);
        list.push(...values.program[key].code_ouvrage);
      });
      if (checkIfArrayIsUnique(list) === false) {
        InsertNotifError("ERROR : code d'ouvrage dupliquer");
        setFinish(false);
      } else {
        const { data } = await createPlanning(valuesToInsert);
        setError("");
        InsertNotifSuccess(data.message);
        await onActionTrack(valuesToTrack);
        console.log(data);
        props.getPlanningList();
        props.getProgramme();
        props.handleOk();
        setFinish(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      InsertNotifError("Insertion failed");
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
        <Select
          placeholder="Selectionez le type du planning"
          onChange={(value) => {
            if (value != "Visite") {
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
              message:
                "Un plan visite est obligatoire pour entretien/maintenance ",
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
      <PlanningForms form={form} finish={finish} />

      <Form.Item name="submit">
        <Button key="submit" type="primary" htmlType="submit" onClick={onClick}>
          Enregistrer planning
        </Button>
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
