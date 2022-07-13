import { useState } from "react";
import { onRegistration } from "../../api/auth";

const Register = () => {
  const said = "2";
  const [values, setValues] = useState({
    // init
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(false); //init error state
  const [success, setSuccess] = useState(false); // init success state

  const onChange = (e) => {
    //allow data entry in input tags
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    // submit action
    e.preventDefault();

    try {
      const { data } = await onRegistration(values); // wait for register Post request (api/auth.js)

      setError("");
      setSuccess(data.message);
      setValues({ username: "", password: "", role: "" }); // init values after success
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <h1>Register</h1>

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
            placeholder="password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            value={values.role}
            className="form-control"
            id="role"
            name="role"
            placeholder="role"
            required
          />
        </div>

        <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
        <div style={{ color: "green", margin: "10px 0" }}>{success}</div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
