import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { connect, useSelector } from "react-redux";

const App = (props) => {
  const PrivateRoutes = () => {
    // const { isAuth } = props.isAuth;
    return <>{props.isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
  };

  const RestrictedRoutes = () => {
    // const { isAuth } = useSelector((state) => state.auth);
    return <>{!props.isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});
export default connect(mapStateToProps, {})(App);
