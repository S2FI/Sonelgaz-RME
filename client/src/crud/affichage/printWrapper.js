import AffichageTable from "./affichageTable";

const PrintWrapper = (props) => {
  <AffichageTable
    ref={props.dam}
    program_data={props.program_data}
    Titre_planning={props.Titre_planning}
    Type_planning={props.Type_planning}
  />;
};

export default PrintWrapper;
