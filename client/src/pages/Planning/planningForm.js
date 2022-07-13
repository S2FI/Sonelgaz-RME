import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  DatePicker,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import InputSelector from "../../components/inputSelector";
const EditableContext = React.createContext(null);
const { RangePicker } = DatePicker;

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const PlanningForms = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      mois: (
        <Space direction="vertical" size={12}>
          <RangePicker />
        </Space>
      ),
      district: (
        <InputSelector
          defaultValue="district"
          option1="district 1"
          option2="district 2"
        />
      ),
      depart: (
        <InputSelector
          defaultValue="depart"
          option1="depart 1"
          option2="depart 2"
        />
      ),
      ligne: (
        <InputSelector
          defaultValue="ligne"
          option1="ligne 1"
          option2="ligne 2"
        />
      ),
      poste: (
        <InputSelector
          defaultValue="poste"
          option1="poste 1"
          option2="poste 2"
        />
      ),
      Criticite: (
        <InputSelector defaultValue="Faible" option1="Moyen" option2="Eleve" />
      ),
    },
  ]);
  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "mois",
      dataIndex: "mois",
      width: "30%",
      // editable: true,
    },
    {
      title: "district",
      dataIndex: "district",
    },
    {
      title: "depart",
      dataIndex: "depart",
    },
    {
      title: "ligne",
      dataIndex: "ligne",
    },
    {
      title: "poste",
      dataIndex: "poste",
    },
    {
      title: "Criticite",
      dataIndex: "Criticite",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>
              <MdDeleteForever />
            </a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      mois: (
        <Space direction="vertical" size={12}>
          <RangePicker />
        </Space>
      ),
      district: (
        <Form.Item
          rules={[
            {
              required: true,
              message: "district est obligatoire",
            },
          ]}
        >
          <InputSelector option1="district 1" option2="district 2" />
        </Form.Item>
      ),
      depart: (
        <InputSelector
          defaultValue="depart"
          option1="depart 1"
          option2="depart 2"
        />
      ),
      ligne: (
        <InputSelector
          defaultValue="ligne"
          option1="ligne 1"
          option2="ligne 2"
        />
      ),
      poste: (
        <InputSelector
          defaultValue="poste"
          option1="poste 1"
          option2="poste 2"
        />
      ),
      Criticite: (
        <InputSelector defaultValue="Faible" option1="Moyen" option2="Elevé" />
      ),
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        tableLayout="fixed"
      />
    </div>
  );
};

export default PlanningForms;
