import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  DatePicker,
  Select,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlinePlusSquare } from "react-icons/ai";
import InputSelector from "../../components/selectors/inputSelector";
import moment from "moment";
import DefaultSelector from "../../components/selectors/defaultSelector";
import OuvrageSelector from "../../components/selectors/ouvrageSelector";
import { deleteProgram } from "../../api/planning";
import DepartSelector from "../../components/selectors/departSelector";
import { BsPlusLg } from "react-icons/bs";

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
  const [count, setCount] = useState(100000);
  const [rowAdd, setRowAdd] = useState(true);

  let indexSelect = {};
  props.program_data?.map((data, index) => {
    indexSelect[data.id_programme] = {
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
  const [insertOnUpdate, setinsertOnUpdate] = useState({
    [count]: {
      date_debut_programme: moment().format("YYYY-MM-DD"),
      date_fin_programme: moment().format("YYYY-MM-DD"),
    },
  });

  let tableRowData = props.program_data?.map((data, index) => {
    let id = data.id_programme;
    return (data = {
      key: id,
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
                [id]: {
                  ...prevdata[id],
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
        <Select
          value={data.district}
          onChange={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [id]: { ...prevdata[id], district: value },
              };
            })
          }
        >
          <Select.Option value="Belouizdad">Belouizdad</Select.Option>
        </Select>
      ),
      depart: (
        <DefaultSelector
          initdepart={data.depart}
          initcode={data.code_ouvrage}
          getSelectorData={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [id]: {
                  ...prevdata[id],
                  depart: value,
                },
              };
            })
          }
          getSelectorData2={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [id]: {
                  ...prevdata[id],
                  code_ouvrage: value,
                },
              };
            })
          }
        />
      ),
      equipe: (
        <Select
          value={data.nom_equipe_programme}
          style={{
            width: "100%",
          }}
          onChange={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [id]: { ...prevdata[id], nom_equipe_programme: value },
              };
            })
          }
        >
          <Select.Option value="A">A</Select.Option>
          <Select.Option value="B">B</Select.Option>
          <Select.Option value="C">C</Select.Option>
        </Select>
      ),
    });
  });

  const [dataSource, setDataSource] = useState(tableRowData);

  // useEffect(() => {}, []);
  // console.log("hacha el ni3ma ", tableRowData);
  // console.log("hailik el hadra", dataSource);
  const handleDelete = async (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    // const newselectData = selectData.filter((item) => item.key !== key);
    await deleteProgram(key);

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
      title: "Date de planning",
      dataIndex: "mois",
      width: "25%",

      // editable: true,
    },
    {
      title: "District",
      dataIndex: "district",
      align: "center",
    },
    {
      title: "Depart                                 Code ouvrage",
      dataIndex: "depart",
      width: "35%",
      align: "center",
    },

    {
      title: "Equipe",
      dataIndex: "equipe",
      width: "9%",
      align: "center",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Space>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button>
                <MdDeleteForever />
              </Button>
            </Popconfirm>
            <Button
              onClick={() => handleRowAdd(record.key)}
              disabled={record.key >= 10000 ? false : true}
            >
              <BsPlusLg />
            </Button>
          </Space>
        ) : null,
    },
  ];
  const handleRowAdd = (prevkey) => {
    console.log(prevkey);
    const newData = {
      key: count,
      mois: (
        <RangePicker
          defaultValue={[
            moment(insertOnUpdate[prevkey].date_debut_programme),
            moment(insertOnUpdate[prevkey].date_fin_programme),
          ]}
          onChange={(values, dateString) => {
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
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
        <Select
          value={insertOnUpdate[prevkey].district}
          onChange={(value) =>
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], district: value },
              };
            })
          }
        >
          <Select.Option value="Belouizdad">Belouizdad</Select.Option>
        </Select>
      ),
      depart: (
        <DepartSelector
          getSelectorData={(value) =>
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  depart: value,
                },
              };
            })
          }
          getSelectorData2={(value) =>
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  code_ouvrage: value,
                },
              };
            })
          }
        />
      ),
      equipe: (
        <Select
          style={{
            width: "100%",
          }}
          onChange={(value) =>
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], nom_equipe_programme: value },
              };
            })
          }
        >
          <Select.Option value="A">A</Select.Option>
          <Select.Option value="B">B</Select.Option>
          <Select.Option value="C">C</Select.Option>
        </Select>
      ),
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    console.log("handel add count = ", count);
    console.log("row add count data", selectData[count - 1]);
    setinsertOnUpdate((prevdata) => {
      return {
        ...prevdata,
        [count]: {
          ...prevdata[count],
          date_debut_programme: prevdata[prevkey].date_debut_programme,
          date_fin_programme: prevdata[prevkey].date_fin_programme,
          district: prevdata[prevkey].district,
          depart: "70H1C10",
        },
      };
    });
  };
  const handleAdd = () => {
    const newData = {
      key: count,
      mois: (
        <RangePicker
          defaultValue={[moment(), moment()]}
          onChange={(values, dateString) => {
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  date_debut_programme: dateString[0],
                  date_fin_programme: dateString[1],
                },
              };
            });
            setRowAdd(false);
          }}
          format="YYYY/MM/DD"
        />
      ),
      district: (
        <Select
          onChange={(value) =>
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], district: value },
              };
            })
          }
        >
          <Select.Option value="Belouizdad">Belouizdad</Select.Option>
        </Select>
      ),
      depart: (
        <DepartSelector
          getSelectorData={(value) =>
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  depart: value,
                },
              };
            })
          }
          getSelectorData2={(value) =>
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  code_ouvrage: value,
                },
              };
            })
          }
        />
      ),
      equipe: (
        <Select
          style={{
            width: "100%",
          }}
          onChange={(value) =>
            setinsertOnUpdate((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], nom_equipe_programme: value },
              };
            })
          }
        >
          <Select.Option value="A">A</Select.Option>
          <Select.Option value="B">B</Select.Option>
          <Select.Option value="C">C</Select.Option>
        </Select>
      ),
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setRowAdd(false);
    console.log("handel add count = ", count);
    setinsertOnUpdate((prevdata) => {
      return {
        ...prevdata,
        [count]: {
          ...prevdata[count],
          date_debut_programme: moment().format("YYYY-MM-DD"),
          date_fin_programme: moment().format("YYYY-MM-DD"),
          depart: "70H1C10",
        },
      };
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

  console.log("update select DATA => ", selectData);
  console.log("update insert DATA => ", insertOnUpdate);
  useEffect(() => {
    props.form.setFieldsValue({
      program: { update: selectData, insert: insertOnUpdate },
    });
    console.log("==============================", props.form.getFieldsValue());
  }, [props.finish]);
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

export default PlanningUpdateForms;
