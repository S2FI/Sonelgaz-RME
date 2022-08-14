import { PLANNING_LIST } from "../../static/staticVar";

const initialState = {
  plan: "",
};

export default function (state = initialState, { payload, type }) {
  switch (type) {
    case PLANNING_LIST:
      return {
        ...state,
        plan: payload,
      };

    default: // need this for default case
      return state;
  }
}
