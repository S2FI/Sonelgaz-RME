import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/actions/authAction";
import avatar from "../../images/avatar.png";
import {
  ADMIN_PATH,
  DASHBOARD_ROUTE,
  DEFAULT_PATH,
  USERLIST_ROUTE,
} from "../../static/staticPath";

const Login = (props) => {
  const [route, setRoute] = useState("/");
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login(values);
  };
  useEffect(() => {
    // console.log(localStorage.getItem("UserRole"));
    switch (localStorage.getItem("UserRole")) {
      case "User":
        setRoute(DASHBOARD_ROUTE);
        break;

      case "Chef":
        setRoute(DASHBOARD_ROUTE);
        break;

      case "Ing":
        setRoute(DASHBOARD_ROUTE);
        break;

      case "Admin":
        setRoute(ADMIN_PATH);
        break;
    }
  });

  const redirectPage = <Navigate to={route} />;
  const loginPage = (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="login-box">
        <img src={avatar} className="avatar" />
        <p className="login-title">SONELGAZ-RME</p>

        <div className="fields-box">
          <p>Nom d'utilisateur</p>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={values.username}
            placeholder="Nom d'utilisateur"
            required
          />

          <p>Mot de passe</p>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            value={values.password}
            className="form-control"
            id="password"
            name="password"
            placeholder="Mot de passe"
            required
          />

          <div style={{ color: "red", margin: "10px 0" }}>{props.error}</div>

          <input type="submit" name="submit" value="Se connecter" />
        </div>
      </form>
    </div>
  );
  {
    if (props.isAuth) return redirectPage;
    else return loginPage;
  }
};
const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  error: state.authReducer.errorMessage,
});
export default connect(mapStateToProps, { login })(Login);
