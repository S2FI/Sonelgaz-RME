import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  USERLIST_ROUTE,
} from "../static/staticPath";

const PrivateRoutes = (props) => {
  const [checker, setchecker] = useState(localStorage.getItem("UserRole"));
  // console.log(checker);
  useEffect(() => {
    switch (localStorage.getItem("UserRole")) {
      case "Chef":
        setchecker("User");
        break;

      case "Ing":
        setchecker("User");
        break;
    }
  });

  return (
    <>
      {props.isAuth ? (
        checker === props.permitted ? (
          <Outlet />
        ) : (
          <>
            <div> unauthorised </div>
          </>
        )
      ) : (
        <Navigate to={LOGIN_ROUTE} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  role: state.authReducer.userRole,
});
export default connect(mapStateToProps, {})(PrivateRoutes);
