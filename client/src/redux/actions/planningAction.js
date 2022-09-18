import {
  getDetailsOuvrage,
  getFormEntretien,
  getFormMaintenance,
  getFormVisite,
  getFullPlanning,
  getMap,
  getOuvrage,
  getPlanning,
} from "../../api/planning";
import {
  DETAIL_LIST,
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

    const list = maintenance_data.data;
    const myKey = "id_form_maintenance";
    function groupByKey(array, key) {
      return array.reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, {
          [obj[key]]: (hash[obj[key]] || []).concat(obj),
        });
      }, {});
    }
    const Main = groupByKey(list, myKey);

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
    const entretien_data = await getFormEntretien();

    const list = entretien_data.data;
    const myKey = "id_form_entretien";

    function groupByKey(array, key) {
      return array.reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, {
          [obj[key]]: (hash[obj[key]] || []).concat(obj),
        });
      }, {});
    }
    const Ent = groupByKey(list, myKey);
    dispatch({
      type: ENTRETIEN_LIST,
      payload: Ent,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getVisiteForms = () => async (dispatch) => {
  try {
    const Visite_data = await getFormVisite();
    const list = Visite_data.data;
    const myKey = "id_form_visite";

    function groupByKey(array, key) {
      return array.reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, {
          [obj[key]]: (hash[obj[key]] || []).concat(obj),
        });
      }, {});
    }
    const Vis = groupByKey(list, myKey);

    dispatch({
      type: VISITE_LIST,
      payload: Vis,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDetOuvrage = (ouvrage) => async (dispatch) => {
  try {
    const planning_data = await getDetailsOuvrage(ouvrage);

    const Ouvr = planning_data.data.map((data) => {
      let date = data.plan.date_planning.split("T");
      let dateT = data.date_debut_programme.split("T");
      return (data = {
        ...data,
        key: data.id_programme,
        datePlanning: date[0],
        dateProcedure: dateT[0],
      });
    });
    dispatch({
      type: DETAIL_LIST,
      payload: Ouvr,
    });
  } catch (error) {
    console.log(error);
  }
};
