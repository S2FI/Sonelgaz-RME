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
import OuvrageSelector from "../../components/selectors/ouvrageSelector";
import { connect } from "react-redux";
import DepartSelector from "../../components/selectors/departSelector";
import CodeSelector from "../../components/selectors/codeSelector";

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
  const [rowAdd, setRowAdd] = useState(true);

  const [selectData, setSelectData] = useState({
    [0]: {
      date_debut_programme: "2012/12/12",
      date_fin_programme: "2012/12/12",
    },
  });
  console.log("rahi tel7a9 alaise =>", props.ouvrage_list);
  let depart_options = [];
  Object.keys(props.ouvrage_list).forEach(async (key, index) => {
    depart_options.push(key);
  });

  console.log("ou hadou les departs =>", depart_options);

  const [departState, setdepartState] = useState(
    props.ouvrage_list[depart_options[0]]
  );
  const [codeState, setcodeState] = useState(
    props.ouvrage_list[depart_options[0]][0]
  );

  // const getSelectorData = (sele ctedValues) => {
  //   setSelectData(selectedValues);
  // };
  const [dataSource, setDataSource] = useState([
    {
      key: "0",

      mois: (
        <RangePicker
          defaultValue={[moment("2012-12-12"), moment("2012-12-12")]}
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
            setRowAdd(false);
          }}
          format="YYYY/MM/DD"
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
        // <DepartSelector/>
        <Select
          onChange={(value) => {
            setdepartState(props.ouvrage_list[value]);
            console.log(
              "value on change depart =>>>>",
              props.ouvrage_list[value]
            );
            setcodeState(props.ouvrage_list[value][0]);
            setSelectData((prevdata) => {
              return { ...prevdata, [0]: { ...prevdata[0], depart: value } };
            });
          }}
        >
          {depart_options.map((depart) => (
            <Select.Option value={depart} key={depart}>
              {depart}
            </Select.Option>
          ))}
        </Select>
      ),
      ligne: (
        <Select
          mode="multiple"
          maxTagCount="responsive"
          style={{
            width: "100%",
          }}
          onChange={(value) => {
            setcodeState(value);
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [0]: { ...prevdata[0], code_ouvrage: value },
              };
            });
          }}
        >
          {departState.map((code) => (
            <Select.Option value={code} key={code}>
              {code}
            </Select.Option>
          ))}
        </Select>
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
      title: "mois",
      dataIndex: "mois",
      width: "25%",
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
      width: "20%",
    },
    {
      title: "equipe",
      dataIndex: "equipe",
      width: "9%",
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
            <Button>
              <AiOutlinePlusSquare />
            </Button>
          </React.Fragment>
        ) : null,
    },
  ];
  //onClick={handleRowAdd} disabled={rowAdd}
  // const handleRowAdd = () => {
  //   const newData = {
  //     key: count,
  //     mois: (
  //       <RangePicker
  //         defaultValue={[
  //           moment(selectData[count - 1].date_debut_programme),
  //           moment(selectData[count - 1].date_fin_programme),
  //         ]}
  //         //[
  //         //   // moment(selectData[count - 1].date_debut_programme),
  //         //   // moment(selectData[count - 1].date_fin_programme),
  //         // ]}
  //         onChange={(values, dateString) =>
  //           setSelectData((prevdata) => {
  //             return {
  //               ...prevdata,
  //               [count]: {
  //                 ...prevdata[count],
  //                 date_debut_programme: dateString[0],
  //                 date_fin_programme: dateString[1],
  //               },
  //             };
  //           })
  //         }
  //         format="YYYY/MM/DD"
  //       />
  //     ),
  //     district: (
  //       <InputSelector
  //         option1="district 1"
  //         option2="district 2"
  //         name="district"
  //         getSelectorData={(value) =>
  //           setSelectData((prevdata) => {
  //             return {
  //               ...prevdata,
  //               [count]: { ...prevdata[count], district: value },
  //             };
  //           })
  //         }
  //       />
  //     ),
  //     depart: (
  //       <InputSelector
  //         option1="depart 1"
  //         option2="depart 2"
  //         name="depart"
  //         getSelectorData={(value) =>
  //           setSelectData((prevdata) => {
  //             return {
  //               ...prevdata,
  //               [count]: { ...prevdata[count], depart: value },
  //             };
  //           })
  //         }
  //       />
  //     ),
  //     ligne: (
  //       <InputSelector
  //         option1="ligne 1"
  //         option2="ligne 2"
  //         name="code_ouvrage"
  //         getSelectorData={(value) =>
  //           setSelectData((prevdata) => {
  //             return {
  //               ...prevdata,
  //               [count]: { ...prevdata[count], code_ouvrage: value },
  //             };
  //           })
  //         }
  //       />
  //     ),
  //     equipe: (
  //       <InputSelector
  //         option1="B"
  //         option2="C"
  //         name="nom_equipe_programme"
  //         getSelectorData={(value) =>
  //           setSelectData((prevdata) => {
  //             return {
  //               ...prevdata,
  //               [count]: { ...prevdata[count], nom_equipe_programme: value },
  //             };
  //           })
  //         }
  //       />
  //     ),
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  //   console.log("handel add count = ", count);
  //   setSelectData((prevdata) => {
  //     return { ...prevdata, [count]: { ...prevdata[count] } };
  //   });
  // };

  const handleAdd = () => {
    const newData = {
      key: count,
      mois: (
        <RangePicker
          defaultValue={[moment("2012-12-12"), moment("2012-12-12")]}
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
            setRowAdd(false);
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
        <Select
          style={{
            width: "100%",
          }}
          onChange={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], depart: value },
              };
            })
          }
        >
          {depart_options.map((depart) => (
            <Select.Option key={depart}>{depart}</Select.Option>
          ))}
        </Select>
      ),
      ligne: (
        <Select
          mode="multiple"
          maxTagCount="responsive"
          style={{
            width: "100%",
          }}
          onChange={(value) =>
            setSelectData((prevdata) => {
              return {
                ...prevdata,
                [count]: { ...prevdata[count], code_ouvrage: value },
              };
            })
          }
        >
          {" "}
          {departState.map((code) => (
            <Select.Option key={code}>{code}</Select.Option>
          ))}
        </Select>
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
          date_debut_programme: "2012/12/12",
          date_fin_programme: "2012/12/12",
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
  console.log("depart data", departState);
  console.log("code data ", codeState);

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

const mapStateToProps = (state) => ({
  ouvrage_list: state.planningReducer.data,
});
export default connect(mapStateToProps, {})(PlanningForms);
