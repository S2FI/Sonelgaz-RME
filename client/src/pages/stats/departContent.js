import { Card } from "antd";
import React, { useState } from "react";
const DepartContent = (props) => {
  const [stats, setStats] = useState({
    elagage: "",
    conducteur_ebreche: "",
    nbr_isolateur_casse: "",
    support_incline: "",
    armements: "",
  });
  let elagage = 0;
  let conducteur_ebreche = 0;
  let nbr_isolateur_casse = 0;
  let support_incline = 0;
  let armements = 0;

  //   console.log("la79etni the most important data=>", props.statdata);
  //   console.log("za3ma inchallah temchi", props.title);

  //   const reconstruct = (list) => {
  props.statdata?.map((data) => {
    if (data.ligne_depart === props.title) {
      nbr_isolateur_casse =
        nbr_isolateur_casse + parseFloat(data.nbr_isolateur_casse);
      armements = armements + parseFloat(data.armements);
      support_incline = support_incline + parseFloat(data.support_incline);
      conducteur_ebreche =
        conducteur_ebreche + parseFloat(data.conducteur_ebreche);
      elagage = elagage + parseFloat(data.elagage);
    }
  });

  const styles = {
    fontFamily: "Segoe UI",
    fontSize: "13px",
    // fontWeight: "bold",
  };
  return (
    <Card
      title={<strong style={{ fontFamily: "Segoe UI" }}>{props.title}</strong>}
      style={{
        width: 300,
        height: 380,
      }}
    >
      <div
        style={
          {
            //   justifyContent: "space-between",
          }
        }
      >
        <p style={styles}>Elagage (m3) : {elagage}</p>
        <p style={styles}>Remplacement ISOLATEUR (U) : {nbr_isolateur_casse}</p>
        <p style={styles}>Reglage conducteurs (km) : {conducteur_ebreche}</p>
        <p style={styles}>Remplacement support (U) : {support_incline}</p>
        <p style={styles}>Remplacement armement (U) : {armements}</p>
      </div>
    </Card>
  );
};
export default DepartContent;
