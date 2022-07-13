import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Auth/login";
import { connect, useSelector } from "react-redux";
import Container from "./Layout/container";
import PrivateRoutes from "./admin/authorisation";
import {
  ADMIN_PATH,
  DASHBOARD_ROUTE,
  DEFAULT_PATH,
  LOGIN_ROUTE,
  PLANNING_ROUTE,
  REGISTER_ROUTE,
  USERLIST_ROUTE,
} from "./static/staticPath";
import Dashboard from "./pages/dashboard";

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<PrivateRoutes permitted="Chef" />}>
          <Route path={DEFAULT_PATH} element={<Container />} />
        </Route>
        <Route element={<PrivateRoutes permitted="Ing" />}>
          <Route path={DEFAULT_PATH} element={<Container />} />
        </Route> */}
        <Route element={<PrivateRoutes permitted="User" />}>
          <Route path={DEFAULT_PATH} element={<Container />} />
        </Route>

        <Route element={<PrivateRoutes permitted="Admin" />}>
          <Route path={ADMIN_PATH} element={<Container />} />
        </Route>
        <Route path={LOGIN_ROUTE} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});
export default connect(mapStateToProps, {})(App);
