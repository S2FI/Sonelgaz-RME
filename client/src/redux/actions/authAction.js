import { onLogin, onLogout } from "../../api/auth";
import {
  AUTHENTICATE_USER,
  ERROR_AUTH,
  UNAUTHENTICATE_USER,
} from "../../static/staticVar";

export const login = (values) => async (dispatch) => {
  try {
    await onLogin(values);
    const { username, password } = values;
    console.log(username);
    dispatch({
      type: AUTHENTICATE_USER,
    });
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("Username", username);
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_AUTH,
      payload: error.response.data.errors[0].msg,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await onLogout();

    dispatch({
      type: UNAUTHENTICATE_USER,
    });
    localStorage.removeItem("isAuth");
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_AUTH,
      payload: error.response.data.errors[0].msg,
    });
  }
};
