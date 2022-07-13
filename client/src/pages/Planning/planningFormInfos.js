import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import PlanningForms from "./planningForm";
const { Option } = Select;

const PlanningFormInfos = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      labelCol={{
        span: 2,
      }}
    >
      <Form.Item
        label="Titre"
        name="Titre"
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
        name="type"
        rules={[
          {
            required: true,
            message: "Le type est obligatoire",
          },
        ]}
      >
        <Select placeholder="Selectionez le type du planning">
          <Option value="Maintenance">Visite</Option>
          <Option value="Entretien">Entretien</Option>
        </Select>
      </Form.Item>

      <PlanningForms />

      <Form.Item name="submit">
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={props.savePlanning}
        >
          Enregistrer planning
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PlanningFormInfos;
