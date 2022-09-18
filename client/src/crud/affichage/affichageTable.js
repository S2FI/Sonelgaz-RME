import { Table } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import photo_impression from "../../images/photo_impression.png";

const AffichageTable = React.forwardRef((props, ref) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(
      props.program_data?.map((data, index) => {
        const ouvrage =
          data.code_ouvrage != null
            ? data.code_ouvrage.map((data, index) => (
                <b key={index + 50}> {data} </b>
              ))
            : [""];
        console.log(moment(data.date_debut_programme));
        return (data = {
          key: index,

          debut: data.date_debut_programme,
          fin: data.date_fin_programme,
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
      title: "Date de debut",
      dataIndex: "debut",
      //width: "25%",
      align: "center",
      sorter: true,
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: "Date de fin",
      dataIndex: "fin",
      // width: "25%",
      align: "center",
      sorter: true,
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
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
      <div style={{ marginBottom: "20px" }}>
        <img
          src={photo_impression}
          alt="BigCo Inc. logo"
          style={{ width: "100%" }}
        />
      </div>
      <style type="text/css" media="print">
        {"\
   @page { size: landscape; }\
"}
      </style>
      <p style={{ fontSize: "16px" }}>
        <b>Titre du planning :</b> {props.Titre_planning}
      </p>
      <p style={{ fontSize: "16px" }}>
        <b>Type du planning :</b> {props.Type_planning}
      </p>
      {props.Type_planning !== "Visite" ? (
        <p style={{ fontSize: "16px" }}>
          <b>Plan visite :</b> {props.code_visite}
        </p>
      ) : null}
      <Table
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
