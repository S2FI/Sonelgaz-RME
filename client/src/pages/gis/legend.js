import { AiTwotoneMinusSquare } from "react-icons/ai";
import { CgLoadbar } from "react-icons/cg";
const Legend = (props) => {
  const blue = "#1F4690"; //rgb(31, 70, 144)
  const myblue = "rgb(31, 70, 144)";
  const red = "#B20600";
  const visite = "#ffc100";
  const entretien = "#ff7400";
  const maintenance = "#ff0000";
  const disabled = "#dddddd";
  const green = "#d5ff75";
  return (
    <div
      style={{
        display: "flex",
        background: "black",
        justifyContent: "space-evenly",
        color: "white",
      }}
    >
      <CgLoadbar size={24} color={disabled} />
      : ligne airienne no identifier
      <CgLoadbar size={24} color={blue} />
      : ligne airienne
      <AiTwotoneMinusSquare size={24} color={green} /> : poste
      <CgLoadbar size={24} color={visite} /> : lignes a visité
      <CgLoadbar size={24} color={entretien} /> : lignes a entretenir
      <CgLoadbar size={24} color={maintenance} /> : lignes a maintenir
    </div>
  );
};
export default Legend;
