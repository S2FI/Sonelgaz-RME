import { Divider, Table } from "antd";
import React from "react";

const EntTable = React.forwardRef((props, ref) => {
  const data = props.list?.map((data) => {
    return (data = {
      key: data.id_form,
      date_procedure: data.date_procedure?.split("T")[0],
      titre_formulaire: data.titre_formulaire,
      code_ouvrage: data.code_ouvrage,
      longueur_visiter: data.longueur_visiter + " km",
      heures_debut: data.heures_debut,
      heures_fin: data.heures_fin,
      ligne_depart: data.ligne_depart,
      elagage: data.elagage + " m^3",
      armements: data.armements,
      conducteur_ebreche: data.conducteur_ebreche,
      fil_fer_degager: data.fil_fer_degager,
      nbr_isolateur_casse: data.nbr_isolateur_casse,
      pont_detache: data.pont_detache,
      nid_cigogne_oiseau: data.nid_cigogne_oiseau,
      portee_dereglee: data.portee_dereglee,
      support_incline: data.support_incline,
      observation: data.observation,
      chef: data.created_user_form,
      signature: data.signature,
    });
  });
  console.log("this is the lelouch data =>", data);
  const defaultColumns = [
    {
      title: "Date de Formulaire",
      dataIndex: "date_procedure",
      width: "5%",
      //   align: "center",
      fixed: "left",
    },
    {
      title: "Titre de formulaire",
      dataIndex: "titre_formulaire",
      width: "10%",
      //   align: "center",
    },
    {
      title: "Poste de depart",
      dataIndex: "ligne_depart",
      //   align: "center",
    },

    {
      title: "Code ouvrage",
      dataIndex: "code_ouvrage",
      width: "6%",
      //   align: "center",
    },

    {
      title: "Heure de debut",
      dataIndex: "heures_debut",
      //   width: "10%",
      align: "center",
    },
    {
      title: "Heure de fin",
      dataIndex: "heures_fin",
      //   width: "10%",
      align: "center",
    },
    {
      title: "Longueur visiter",
      dataIndex: "longueur_visiter",
      //   width: "10%",
      align: "center",
    },
    {
      title: "armements",
      dataIndex: "armements",
      //   width: "10%",
      align: "center",
    },
    {
      title: "conducteur ebreche",
      dataIndex: "conducteur_ebreche",
      //   width: "10%",
      align: "center",
    },
    {
      title: "Elagage",
      dataIndex: "elagage",
      //   width: "10%",
      align: "center",
    },
    {
      title: "fil fer degager",
      dataIndex: "fil_fer_degager",
      //   width: "10%",
      align: "center",
    },
    {
      title: "nbr isolateur casse",
      dataIndex: "nbr_isolateur_casse",
      //   width: "10%",
      align: "center",
    },
    {
      title: "pont detache",
      dataIndex: "pont_detache",
      //   width: "10%",
      align: "center",
    },
    {
      title: "portee dereglee",
      dataIndex: "portee_dereglee",
      //   width: "10%",
      align: "center",
    },
    {
      title: "support incline",
      dataIndex: "support_incline",
      //   width: "10%",
      align: "center",
    },
    {
      title: "nid cigogne oiseau",
      dataIndex: "nid_cigogne_oiseau",
      //   width: "10%",
      align: "center",
    },

    {
      title: "Observation",
      dataIndex: "observation",
      width: "20%",
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

      <b style={{ fontFamily: "Segoe UI", fontSize: "20px" }}>
        Les fomrulaires d'entretiens{" "}
      </b>
      <Divider orientation="left" style={{ fontFamily: "Segoe UI" }}>
        Tableaux des formulaires{" "}
      </Divider>
      <div>
        <Table
          className="ent"
          bordered
          dataSource={data}
          columns={defaultColumns}
          tableLayout="fixed"
          scroll={{
            x: 2400,
          }}
        />
        {/* <p style={{ marginLeft: "75%", fontSize: 16 }}>
          <b>Auteur :</b> {props.list[0].created_user_form}
        </p>
        <p style={{ marginLeft: "75%", fontSize: 13 }}>
          <b>Signature :</b> {props.list[0].signature}
        </p> */}
      </div>
    </div>
  );
});

export default EntTable;
