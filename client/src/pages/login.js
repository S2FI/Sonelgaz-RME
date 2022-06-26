import { useState } from "react";
import Layout from "../components/layout";
import { connect, useDispatch } from "react-redux";
import { login } from "../redux/actions/authAction";

const Login = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login(values);

    // try {
    //   await onLogin(values)
    //   dispatch(authenticateUser())

    //   localStorage.setItem('isAuth', 'true')
    // } catch (error) {
    //   console.log(error.response.data.errors[0].msg)
    //   setError(error.response.data.errors[0].msg)
    // }
  };

  return (
    <Layout>
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
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  error: state.authReducer.errorMessage,
});
export default connect(mapStateToProps, { login })(Login);