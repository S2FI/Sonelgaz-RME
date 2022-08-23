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
import { AiOutlinePlusSquare } from "react-icons/ai";
import InputSelector from "../../components/selectors/inputSelector";
import moment from "moment";
import DefaultSelector from "../../components/selectors/defaultSelector";
import OuvrageSelector from "../../components/selectors/ouvrageSelector";

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

const PlanningUpdateForms = (props) => {
  const [count, setCount] = useState(1);
  const [rowAdd, setRowAdd] = useState(true);

  let indexSelect = {};
  props.program_data.map((data, index) => {
    indexSelect[index] = {
      date_debut_programme: data.date_debut_programme,
      date_fin_programme: data.date_fin_programme,
      district: data.district,
      depart: data.depart,
      code_ouvrage: data.code_ouvrage,
      nom_equipe_programme: data.nom_equipe_programme,
    };
  });
  // console.log("lindex", indexSelect);
  const [selectData, setSelectData] = useState(indexSelect);
  const [defaultData, setdefaultData] = useState({
    date_debut_programme: "",
    date_fin_programme: "",
    district: "",
  });

  let tableRowData = props.program_data.map((data, index) => {
    return (data = {
      key: index,
      mois: (
        <RangePicker
          defaultValue={[
            moment(data.date_debut_programme),
            moment(data.date_fin_programme),
          ]}
          onChange={(values, dateString) => {
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [index]: {
                  ...prevdata[index],
                  date_debut_programme: dateString[0],
                  date_fin_programme: dateString[1],
                },
              };
            });
          }}
          format="YYYY/MM/DD"
        />
      ),
      district: (
        <DefaultSelector
          initValue={data.district}
          option1="district 1"
          option2="district 2"
          name="district"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [index]: { ...prevdata[index], district: value },
              };
            })
          }
        />
      ),
      depart: (
        <DefaultSelector
          initValue={data.depart}
          option1="depart 1"
          option2="depart 2"
          name="depart"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [index]: { ...prevdata[index], depart: value },
              };
            })
          }
        />
      ),
      ligne: (
        <OuvrageSelector
          initValue={data.code_ouvrage}
          name="code_ouvrage"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [index]: { ...prevdata[index], code_ouvrage: value },
              };
            })
          }
        />
      ),
      equipe: (
        <DefaultSelector
          initValue={data.nom_equipe_programme}
          option1="B"
          option2="C"
          name="nom_equipe_programme"
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [index]: { ...prevdata[index], nom_equipe_programme: value },
              };
            })
          }
        />
      ),
    });
  });

  const [dataSource, setDataSource] = useState(tableRowData);

  // useEffect(() => {}, []);
  // console.log("hacha el ni3ma ", tableRowData);
  // console.log("hailik el hadra", dataSource);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    // const newselectData = selectData.filter((item) => item.key !== key);
    setSelectData((current) => {
      delete current[key];
      console.log(
        "new updatedata: ",
        newData,
        "          new updateSelectData",
        selectData
      );
      return current;
    });
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
      rowSpan: 4,
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
          <React.Fragment>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button>
                <MdDeleteForever />
              </Button>
            </Popconfirm>
            <Button disabled={rowAdd}>
              <AiOutlinePlusSquare />
            </Button>
          </React.Fragment>
        ) : null,
    },
  ];

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

  console.log("update select DATA => ", selectData);
  useEffect(() => {
    props.form.setFieldsValue({
      program: selectData,
    });
    // console.log("==============================", props.form.getFieldsValue());
  }, [props.finish]);
  //  console.log(count);

  // console.log(programData);
  return (
    <React.Fragment>
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

export default PlanningUpdateForms;
