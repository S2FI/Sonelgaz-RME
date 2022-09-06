import {
  getFormEntretien,
  getFormMaintenance,
  getFormVisite,
  getFullPlanning,
  getOuvrage,
  getPlanning,
} from "../../api/planning";
import {
  ENTRETIEN_LIST,
  MAINTENANCE_LIST,
  OUVRAGE_LIST,
  PLANNING_LIST,
  PROGRAM_LIST,
  VISITE_LIST,
} from "../../static/staticVar";

export const getPlanningList = () => async (dispatch) => {
  try {
    const planning_data = await getPlanning();

    const plan = planning_data.data.map((data) => {
      let date = data.date_planning.split("T");
      return (data = { ...data, key: data.id_planning, date: date[0] });
    });
    dispatch({
      type: PLANNING_LIST,
      payload: plan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProgramme = () => async (dispatch) => {
  try {
    const updatePlan = await getFullPlanning();
    const program = updatePlan.data.map((data, index) => {
      return (data = { ...data, key: data.id_planning });
    });
    // console.log("first ============> ", program);
    dispatch({
      type: PROGRAM_LIST,
      payload: program,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOuvrageData = () => async (dispatch) => {
  try {
    const { data } = await getOuvrage();

    console.log("first ============> ", data);
    dispatch({
      type: OUVRAGE_LIST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMaintenanceForms = () => async (dispatch) => {
  try {
    const maintenance_data = await getFormMaintenance();

    const Main = maintenance_data.data.map((data, index) => {
      let mykey;
      Object.keys(data).forEach(async (key) => {
        mykey = key;
        console.log("keys", data[mykey]);
      });

      return (data = { ...data, [mykey]: data[mykey] });
    });

    dispatch({
      type: MAINTENANCE_LIST,
      payload: Main,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getEntretienForms = () => async (dispatch) => {
  try {
    const planning_data = await getFormEntretien();

    const plan = planning_data.data.map((data) => {
      let date = data.date_planning.split("T");
      return (data = { ...data, key: data.id_planning, date: date[0] });
    });
    dispatch({
      type: ENTRETIEN_LIST,
      payload: plan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getVisiteForms = () => async (dispatch) => {
  try {
    const planning_data = await getFormVisite();

    const plan = planning_data.data.map((data) => {
      let date = data.date_planning.split("T");
      return (data = { ...data, key: data.id_planning, date: date[0] });
    });
    dispatch({
      type: VISITE_LIST,
      payload: plan,
    });
  } catch (error) {
    console.log(error);
  }
};
