import {
  OUVRAGE_LIST,
  PLANNING_LIST,
  PROGRAM_LIST,
  MAINTENANCE_LIST,
  ENTRETIEN_LIST,
  VISITE_LIST,
} from "../../static/staticVar";

const initialState = {
  plan: [],
  program: [],
  data: [],
  Main: [],
  Vis: [],
  Ent: [],
};

export default function (state = initialState, { payload, type }) {
  switch (type) {
    case PLANNING_LIST:
      return {
        ...state,
        plan: payload,
      };
    case PROGRAM_LIST:
      return {
        ...state,
        program: payload,
      };
    case OUVRAGE_LIST:
      return {
        ...state,
        data: payload,
      };
    case MAINTENANCE_LIST:
      return {
        ...state,
        Main: payload,
      };
    case VISITE_LIST:
      return {
        ...state,
        Vis: payload,
      };
    case ENTRETIEN_LIST:
      return {
        ...state,
        Ent: payload,
      };
    default: // need this for default case
      return state;
  }
}
