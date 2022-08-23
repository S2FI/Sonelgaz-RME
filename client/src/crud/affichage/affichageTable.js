import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  DatePicker,
  Select,
  Tag,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";

const AffichageTable = (props) => {
  //   let ouvrage = props.program_data.code_ouvrage.map((data, index) => {
  //     return <p> data</p>;
  //   });
  // console.log(props.program_data[0].code_ouvrage);

  let tableRowData = props.program_data?.map((data, index) => {
    // console.log("first => ", data.code_ouvrage);
    const ouvrage =
      data.code_ouvrage != null
        ? data.code_ouvrage.map((data) => <b> {data} </b>)
        : [""];

    return (data = {
      key: index,
      mois: (
        <p>
          {data.date_debut_programme}...
          {data.date_fin_programme}
        </p>
      ),
      district: data.district,
      depart: data.depart,
      code_ouvrage: ouvrage,

      equipe: data.nom_equipe_programme,
    });
  });

  const [dataSource, setDataSource] = useState(tableRowData);

  // useEffect(() => {}, []);
  console.log("hacha el ni3ma ", tableRowData);
  console.log("hailik el hadra", dataSource);

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
      title: "code_ouvrage",
      dataIndex: "code_ouvrage",
    },
    {
      title: "equipe",
      dataIndex: "equipe",
    },
  ];

  return (
    <React.Fragment>
      <p>
        <b>Titre planning :</b> {props.Titre_planning}
      </p>
      <p>
        <b>Type planning :</b> {props.Type_planning}
      </p>
      <Table
        bordered
        dataSource={dataSource}
        columns={defaultColumns}
        tableLayout="fixed"
      />
    </React.Fragment>
  );
};

export default AffichageTable;
