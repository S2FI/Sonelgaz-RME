import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import { connect, useSelector } from "react-redux";
import Container from "./Layout/container";
import UserList from "./admin/user";
import {
  ADMIN_PATH,
  DASHBOARD_ROUTE,
  DEFAULT_PATH,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "./static/staticPath";

const App = (props) => {
  const PrivateRoutes = () => {
    // const { isAuth } = props.isAuth;
    return <>{props.isAuth ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />}</>;
  };

  const AdminRoutes = () => {
    const role = "admin";
    return (
      <>
        if (props.isAuth && role == "admin") {<Outlet />}
        else if (props.isAuth && role == "user")
        {<Navigate to={DASHBOARD_ROUTE} />}
        else {<Navigate to={LOGIN_ROUTE} />}
      </>
    );
  };

  const RestrictedRoutes = () => {
    // const { isAuth } = useSelector((state) => state.auth);
    return (
      <>{!props.isAuth ? <Outlet /> : <Navigate to={DASHBOARD_ROUTE} />}</>
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminRoutes />}>
          <Route path={ADMIN_PATH} element={<UserList />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path={DEFAULT_PATH} element={<Container />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          {/* <Route path={REGISTER_ROUTE} element={<Register />} /> */}
          <Route path={LOGIN_ROUTE} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});
export default connect(mapStateToProps, {})(App);
