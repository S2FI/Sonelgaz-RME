import {
  AUTHENTICATE_USER,
  ERROR_AUTH,
  UNAUTHENTICATE_USER,
  USER_LIST,
  USER_ROLE,
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
  users: "",
  userRole: "",
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
    case USER_LIST:
      return {
        ...state,
        users: payload,
      };
    case USER_ROLE:
      return {
        ...state,
        userRole: payload,
      };
    default: // need this for default case
      return state;
  }
}
