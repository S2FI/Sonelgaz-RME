import { Table } from "antd";
import React from "react";

const MaintTable = React.forwardRef((props, ref) => {
  const data = props.list?.map((data) => {
    return (data = {
      key: data.id_form,
      date_procedure: data.date_procedure?.split("T")[0],
      titre_formulaire: data.titre_formulaire,
      code_ouvrage: data.code_ouvrage,
      raison_de_panne: data.raison_de_panne,
      description: data.description,
      chef: data.created_user_form,
      signature: data.signature,
    });
  });
  console.log("this is the lelouch data =>", data);
  const defaultColumns = [
    {
      title: "Date de Formulaire",
      dataIndex: "date_procedure",
      width: "10%",
      //   align: "center",
    },
    {
      title: "Titre de formulaire",
      dataIndex: "titre_formulaire",
      width: "15%",
      //   align: "center",
    },

    {
      title: "Code ouvrage",
      dataIndex: "code_ouvrage",
      width: "15%",
      //   align: "center",
    },
    {
      title: "Raison de panne",
      dataIndex: "raison_de_panne",
      width: "15%",
      //   align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "25%",
      //   align: "center",
    },
    {
      title: "Chef equipe",
      dataIndex: "chef",
      align: "center",
      //   align: "center",
    },
    {
      title: "Signature",
      dataIndex: "signature",
      align: "center",
      //   align: "center",
    },
  ];

  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {"\
   @page { size: landscape; }\
"}
      </style>
      <p>
        <b>Titre formulaire :</b> {props.Titre_Formulaire}
      </p>
      <p>
        <b>Type formulaire :</b> {props.Type_Formulaire}
      </p>
      <Table
        bordered
        dataSource={data}
        columns={defaultColumns}
        tableLayout="fixed"
      />
      {/* <p style={{ marginLeft: "75%", fontSize: 16 }}>
        <b>Auteur :</b> {props.list[0].created_user_form}
      </p>
      <p style={{ marginLeft: "75%", fontSize: 13 }}>
        <b>Signature :</b> {props.list[0].signature}
      </p> */}
    </div>
  );
});

export default MaintTable;
