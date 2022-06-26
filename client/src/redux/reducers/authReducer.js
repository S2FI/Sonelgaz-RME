import {
  AUTHENTICATE_USER,
  ERROR_AUTH,
  UNAUTHENTICATE_USER,
} from "../../static/staticVar";

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");

  if (isAuth && JSON.parse(isAuth) === true) {
    return true;
  }

  return false;
};

const initialState = {
  isAuth: userAuthFromLocalStorage(),
  errorMessage: "",
};

export default function (state = initialState, { payload, type }) {
  switch (type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuth: true,
      };
    case UNAUTHENTICATE_USER:
      return {
        ...state,
        isAuth: false,
      };
    case ERROR_AUTH:
      return {
        ...state,
        errorMessage: payload,
      };
    default: // need this for default case
      return state;
  }
}
