import { getFullPlanning, getOuvrage, getPlanning } from "../../api/planning";
import {
  OUVRAGE_LIST,
  PLANNING_LIST,
  PROGRAM_LIST,
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
