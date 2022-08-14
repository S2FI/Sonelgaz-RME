import { getPlanning } from "../../api/planning";
import { PLANNING_LIST } from "../../static/staticVar";

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
