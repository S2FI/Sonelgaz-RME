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
import { CgPlayListAdd } from "react-icons/cg";
import { BsPlusLg } from "react-icons/bs";
import moment from "moment";
import { connect } from "react-redux";
import DepartSelector from "../../components/selectors/departSelector";

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
    [0]: {
      date_debut_programme: moment().endOf("day").format("YYYY-MM-DD"),
      date_fin_programme: moment().endOf("day").format("YYYY-MM-DD"),
      depart: "70H1C10",
    },
  });

  const [dataSource, setDataSource] = useState([
    {
      key: "0",

      mois: (
        <RangePicker
          disabledDate={(d) =>
            !d ||
            d.isAfter("2023-12-31") ||
            d.isSameOrBefore(moment().endOf("day"))
          }
          defaultValue={[moment().endOf("day"), moment().endOf("day")]}
          onChange={(values, dateString) => {
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [0]: {
                  ...prevdata[0],
                  date_debut_programme: dateString[0],
                  date_fin_programme: dateString[1],
                },
              };
            });
          }}
          // format="YYYY/MM/DD"
        />
      ),

      district: (
        <Select
          onChange={(value) =>
            setSelectData((prevdata) => {
              return { ...prevdata, [0]: { ...prevdata[0], district: value } };
            })
          }
        >
          <Select.Option value="Belouizdad">Belouizdad</Select.Option>
        </Select>
      ),
      depart: (
        <DepartSelector
          getSelectorData={(value) => {
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [0]: {
                  ...prevdata[0],
                  depart: value,
                },
              };
            });
          }}
          getSelectorData2={(value) => {
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [0]: {
                  ...prevdata[0],
                  code_ouvrage: value,
                },
              };
            });
          }}
        />
      ),
      equipe: (
        <Select
          style={{
            width: "100%",
          }}
          onChange={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [0]: { ...prevdata[0], nom_equipe_programme: value },
              };
            })
          }
        >
          <Select.Option value="A">A</Select.Option>
          <Select.Option value="B">B</Select.Option>
          <Select.Option value="C">C</Select.Option>
        </Select>
      ),
    },
  ]);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    // const newselectData = selectData.filter((item) => item.key !== key);
    setSelectData((current) => {
      delete current[key];
      console.log("new data: ", newData, "           SelectData", selectData);
      return current;
    });
  };

  const defaultColumns = [
    {
      title: "Date de planning",
      dataIndex: "mois",
      width: "25%",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      sortDirections: ["descend", "ascend"],

      // editable: true,
    },
    {
      title: "District",
      dataIndex: "district",
      align: "center",
    },
    {
      title: "Depart                                 Code_ouvrage",
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
      title: "Operation",
      dataIndex: "operation",
      align: "center",
      width: "15%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Space>
            <Button
              style={{
                background: "#1890ff",
                borderColor: "#1890ff",
                color: "#ffff",
              }}
              onClick={() => handleRowAdd(record.key)}
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
            moment(selectData[prevkey].date_debut_programme),
            moment(selectData[prevkey].date_fin_programme),
          ]}
          onChange={(values, dateString) => {
            setSelectData((prevdata) => {
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
          value={selectData[prevkey].district}
          onChange={(value) =>
            setSelectData((prevdata) => {
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
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  depart: value,
                },
              };
            })
          }
          getSelectorData2={(value) => {
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  code_ouvrage: value,
                },
              };
            });
          }}
        />
      ),
      equipe: (
        <Select
          style={{
            width: "100%",
          }}
          onChange={(value) =>
            setSelectData((prevdata) => {
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
    setSelectData((prevdata) => {
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
            setSelectData((prevdata) => {
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
            setSelectData((prevdata) => {
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
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  depart: value,
                },
              };
            })
          }
          getSelectorData2={(value) => {
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: {
                  ...prevdata[count],
                  code_ouvrage: value,
                },
              };
            });
          }}
        />
      ),
      equipe: (
        <Select
          style={{
            width: "100%",
          }}
          onChange={(value) =>
            setSelectData((prevdata) => {
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
    setSelectData((prevdata) => {
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

  console.log("insertion select Data", selectData);

  useEffect(() => {
    props.form.setFieldsValue({
      program: selectData,
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
      {/* <Form.Item name="date" /> */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  ouvrage_list: state.planningReducer.data,
});
export default connect(mapStateToProps, {})(PlanningForms);
