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
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";
import DefaultSelector from "../../components/selectors/defaultSelector";
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
  const [selectData, setSelectData] = useState(indexSelect);
  const [insertOnUpdate, setinsertOnUpdate] = useState({});

  let tableRowData = props.program_data?.map((data, index) => {
    let id = data.id_programme;
    return (data = {
      key: id,
      mois: (
        <RangePicker
          disabledDate={(d) =>
            !d ||
            d.isAfter("2023-12-31") ||
            d.isSameOrBefore(moment().endOf("day"))
          }
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
          defaultValue={data.nom_equipe_programme}
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

  const handleDelete = async (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    props.deletingRows(key);
    // await deleteProgram(key);

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
    setinsertOnUpdate((current) => {
      delete current[key];
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
            <Button
              type="primary"
              onClick={() => handleRowAdd(record.key)}
              disabled={record.key >= 10000 ? false : true}
            >
              <BsPlusLg />
            </Button>
            <Popconfirm
              title="êtes-vous sûr?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button type="danger">
                <MdDeleteForever />
              </Button>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];
  const handleRowAdd = (prevkey) => {
    const newData = {
      key: count,
      mois: (
        <RangePicker
          disabledDate={(d) =>
            !d ||
            d.isAfter("2023-12-31") ||
            d.isSameOrBefore(moment().endOf("day"))
          }
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
          disabledDate={(d) =>
            !d ||
            d.isAfter("2023-12-31") ||
            d.isSameOrBefore(moment().endOf("day"))
          }
          defaultValue={[moment().endOf("day"), moment().endOf("day")]}
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
    setinsertOnUpdate((prevdata) => {
      return {
        ...prevdata,
        [count]: {
          ...prevdata[count],
          date_debut_programme: moment().endOf("day").format("YYYY-MM-DD"),
          date_fin_programme: moment().endOf("day").format("YYYY-MM-DD"),
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
    // console.log("==============================", props.form.getFieldsValue());
  }, [props.finish]);
  return (
    <React.Fragment>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Ajouter une ligne
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
          dataSource={dataSource}
          columns={columns}
          tableLayout="fixed"
        />
      </Form.Item>
    </React.Fragment>
  );
};

export default PlanningUpdateForms;
