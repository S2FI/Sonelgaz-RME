import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { login } from "../../redux/actions/authAction";

const Login = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login(values);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <h1>Login</h1>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            username
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={values.username}
            placeholder="username"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            value={values.password}
            className="form-control"
            id="password"
            name="password"
            placeholder="passwod"
            required
          />
        </div>

        <div style={{ color: "red", margin: "10px 0" }}>{props.error}</div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.authReducer.errorMessage,
});
export default connect(mapStateToProps, { login })(Login);
