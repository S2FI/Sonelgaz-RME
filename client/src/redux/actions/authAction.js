import { getIP, getUsers, onLogin, onLogout } from "../../api/auth";
import {
  AUTHENTICATE_USER,
  ERROR_AUTH,
  UNAUTHENTICATE_USER,
  USER_LIST,
  USER_ROLE,
} from "../../static/staticVar";

export const login = (values) => async (dispatch) => {
  try {
    await onLogin(values);
    const { username, password } = values;
    // const UserIp = await getIP();
    // console.log(UserIp);
    const role = await getUsers();
    //get user role with the same username
    const userRole = role.data.find((obj) => {
      return obj.username == username;
    });
    //const userIP = await getIP();
    dispatch({
      type: AUTHENTICATE_USER,
    });

    dispatch({
      type: USER_ROLE,
      payload: userRole.role,
    });
    // Storage items
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("Username", username);
    localStorage.setItem("UserRole", userRole.role);
    localStorage.setItem("UserIp", "111111");
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_AUTH,
      payload: error.response.data.error,
    });
  }
};

export const getUserList = () => async (dispatch) => {
  try {
    const userlist = await getUsers();
    const users = userlist.data.map((user) => {
      return (user = { ...user, key: user.id });
    });
    dispatch({
      type: USER_LIST,
      payload: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await onLogout();

    dispatch({
      type: UNAUTHENTICATE_USER,
    });
    localStorage.removeItem("isAuth");
    localStorage.removeItem("Username");
    localStorage.removeItem("UserRole");
    localStorage.removeItem("UserIp");
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_AUTH,
      payload: error.response.data.error,
    });
  }
};
