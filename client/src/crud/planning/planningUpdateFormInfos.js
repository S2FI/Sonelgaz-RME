import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getProgramme,
  getPlanningList,
} from "../../redux/actions/planningAction";
import PlanningFormInfos from "../../pages/Planning/planningFormInfos";
import PlanningUpdateForms from "./planningUpdateForms";
import {
  deleteProgram,
  getFullPlanning,
  updatePlanning,
} from "../../api/planning";
import { Store } from "react-notifications-component";
import { onActionTrack } from "../../api/auth";
const { Option } = Select;

const PlanningUpdateForm = (props) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false); //init error state
  const [finish, setFinish] = useState(false);
  const [allData, setallData] = useState(props.programs);
  const [rowdeleted, setrowdeleted] = useState([]);
  const [values, setValues] = useState({
    Titre_planning: "",
    Type_planning: "",
    code_visite: "",
    program: {},
  });

  const [entretien, setEntretien] = useState(
    props.type !== "Visite" ? true : false
  );

  const unique = [...new Set(props.listVisite)];
  const deletingRows = (key) => {
    setrowdeleted((prevKeys) => {
      return [...prevKeys, key];
    });
  };
  const handleDelete = async (listKeys) => {
    if (listKeys?.length !== 0) {
      listKeys?.map(async (keys) => {
        await deleteProgram(keys);
      });
    }
  };
  console.log("delte row keys =>", rowdeleted);
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
  const InsertNotifError = (message) => {
    Store.addNotification({
      title: "Update",
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
  function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
  }
  const onClick = async () => {
    setFinish(true);
  };

  const onFinish = async (values) => {
    setFinish(true);
    const valuesToTrack = {
      tracked_user: localStorage.getItem("Username"),
      user_role: localStorage.getItem("UserRole"),
      action_tracked: "a modifier un planning",
    };
    console.log("Success:", values);

    try {
      let list = [];
      Object.keys(values.program.update).forEach(async (key) => {
        console.log(key);
        list.push(...values.program.update[key].code_ouvrage);
      });
      Object.keys(values.program.insert).forEach(async (key) => {
        console.log(key);
        list.push(...values.program.insert[key].code_ouvrage);
      });
      if (checkIfArrayIsUnique(list) === false) {
        InsertNotifError("ERROR : code d'ouvrage dupliquer");
        setFinish(false);
      } else {
        const { data } = await updatePlanning(props.id, values);
        setFinish(false);
        InsertNotifUpdate(data.message);
        console.log(data);
        handleDelete(rowdeleted);
        await onActionTrack(valuesToTrack);
        setrowdeleted([]);
        props.getPlanningList();
        props.getProgramme();
        props.handleOk();
      }
    } catch (error) {
      console.log(error);
      InsertNotifError("Update failed");
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
            if (value != "Entretien") {
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
          initialValue={props.code_visite}
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

      <PlanningUpdateForms
        form={form}
        finish={finish}
        program_data={allData}
        deletingRows={deletingRows}
      />

      <Form.Item name="submit">
        <Button key="submit" type="primary" htmlType="submit" onClick={onClick}>
          Modifier planning
        </Button>
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
