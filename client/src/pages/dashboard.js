import { connect, useDispatch } from "react-redux";
import Layout from "../components/layout";
import { logout } from "../redux/actions/authAction";
const Dashboard = (props) => {
  const dispatch = useDispatch();

  const logout = async () => {
    props.logout();
  };

  return (
    <div>
      <Layout>
        <h1>Dashboard</h1>
        <button onClick={() => logout()} className="btn btn-primary">
          Logout
        </button>
      </Layout>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.authReducer.errorMessage,
});
export default connect(mapStateToProps, { logout })(Dashboard);
