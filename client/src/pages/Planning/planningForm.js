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

const PlanningForms = (props) => {
  const [count, setCount] = useState(1);
  const [selectData, setSelectData] = useState({
    [0]: {},
  });

  // const getSelectorData = (selectedValues) => {
  //   setSelectData(selectedValues);
  // };
  const [dataSource, setDataSource] = useState([
    {
      key: "0",

      mois: (
        <RangePicker
          onChange={(values, dateString) =>
            setSelectData((prevdata) => {
              return {
                [0]: {
                  ...prevdata[0],
                  date_debut_programme: dateString[0],
                  date_fin_programme: dateString[1],
                },
              };
            })
          }
          format="YYYY/MM/DD"
        />
      ),

      district: (
        <InputSelector
          option1="district 1"
          option2="district 2"
          name="district"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return { [0]: { ...prevdata[0], district: value } };
            })
          }
        />
      ),
      depart: (
        <InputSelector
          option1="depart 1"
          option2="depart 2"
          name="depart"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return { [0]: { ...prevdata[0], depart: value } };
            })
          }
        />
      ),
      ligne: (
        <InputSelector
          option1="ligne 1"
          option2="ligne 2"
          name="code_ouvrage"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return { [0]: { ...prevdata[0], code_ouvrage: value } };
            })
          }
        />
      ),
      equipe: (
        <InputSelector
          option1="B"
          option2="C"
          name="nom_equipe_programme"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return { [0]: { ...prevdata[0], nom_equipe_programme: value } };
            })
          }
        />
      ),
    },
  ]);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);

    setSelectData((current) => {
      //  create copy of state object

      // remove key from object
      delete current[key];

      return current;
    });
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
      title: "equipe",
      dataIndex: "equipe",
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
            <Button>
              <MdDeleteForever />
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      mois: (
        <RangePicker
          onChange={(values, dateString) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  date_debut_programme: dateString[0],
                  date_fin_programme: dateString[1],
                },
              };
            })
          }
          format="YYYY/MM/DD"
        />
      ),
      district: (
        <InputSelector
          option1="district 1"
          option2="district 2"
          name="district"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], district: value },
              };
            })
          }
        />
      ),
      depart: (
        <InputSelector
          option1="depart 1"
          option2="depart 2"
          name="depart"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], depart: value },
              };
            })
          }
        />
      ),
      ligne: (
        <InputSelector
          option1="ligne 1"
          option2="ligne 2"
          name="code_ouvrage"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], code_ouvrage: value },
              };
            })
          }
        />
      ),
      equipe: (
        <InputSelector
          option1="B"
          option2="C"
          name="nom_equipe_programme"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], nom_equipe_programme: value },
              };
            })
          }
        />
      ),
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    console.log("handel add count = ", count);
    setSelectData((prevdata) => {
      return { ...prevdata, [count]: { ...prevdata[count] } };
    });
  };

  const components = {
    body: {
      row: EditableRow,
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
        // handleSave,
      }),
    };
  });

  // console.log(district + depart + ligne + equipe);
  // console.log(date);
  // setSelectData({
  //   date_debut: date.date_debut,
  //   date_fin: date.date_fin,
  //   district: district,
  //   depart: depart,
  //   ligne: ligne,
  //   equipe: equipe,
  // });
  console.log(selectData);
  useEffect(() => {
    props.form.setFieldsValue({
      program: selectData,
    });
  }, [selectData]);
  //  console.log(count);

  // console.log(programData);
  return (
    <React.Fragment>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Form.Item
        name="program"
        rules={[
          {
            required: true,
            message: "obligatoire",
          },
        ]}
      >
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          tableLayout="fixed"
        />
      </Form.Item>
      {/* <Form.Item name="date" /> */}
    </React.Fragment>
  );
};

export default PlanningForms;
