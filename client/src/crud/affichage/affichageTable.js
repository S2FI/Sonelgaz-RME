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
import ReactToPrint from "react-to-print";

const AffichageTable = React.forwardRef((props, ref) => {
  //   let ouvrage = props.program_data.code_ouvrage.map((data, index) => {
  //     return <p> data</p>;
  //   });
  // console.log(props.program_data[0].code_ouvrage);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(
      props.program_data?.map((data, index) => {
        // console.log("first => ", data.code_ouvrage);
        const ouvrage =
          data.code_ouvrage != null
            ? data.code_ouvrage.map((data, index) => (
                <b key={index + 50}> {data} </b>
              ))
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
      })
    );
  }, [props.program_data]);

  const defaultColumns = [
    {
      title: "Date de Planning",
      dataIndex: "mois",
      width: "25%",
      align: "center",
      // editable: true,
    },
    {
      title: "District",
      dataIndex: "district",

      align: "center",
    },
    {
      title: "Depart",
      dataIndex: "depart",
      align: "center",
    },
    {
      title: "Code ouvrage",
      dataIndex: "code_ouvrage",
      width: "30%",
      align: "center",
    },
    {
      title: "Equipe",
      dataIndex: "equipe",
      width: "10%",
      align: "center",
    },
  ];

  return (
    <div ref={ref}>
      <p>
        <b>Titre planning :</b> {props.Titre_planning}
      </p>
      <p>
        <b>Type planning :</b> {props.Type_planning}
      </p>
      {props.Type_planning == "Entretien" ? (
        <p>
          <b>Plan visite :</b> {props.code_visite}
        </p>
      ) : null}
      <Table
        bordered
        dataSource={dataSource}
        columns={defaultColumns}
        tableLayout="fixed"
      />
      <p style={{ marginLeft: "75%", fontSize: 16 }}>
        <b>Auteur :</b> {props.user}
      </p>
    </div>
  );
});

export default AffichageTable;
