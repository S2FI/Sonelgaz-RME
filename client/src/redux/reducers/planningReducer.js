import {
  OUVRAGE_LIST,
  PLANNING_LIST,
  PROGRAM_LIST,
} from "../../static/staticVar";

const initialState = {
  plan: "",
  program: [],
  data: [],
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

    default: // need this for default case
      return state;
  }
}
