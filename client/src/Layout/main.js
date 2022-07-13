import { Routes, Route } from "react-router-dom";
import Tracabilite from "../admin/tracabilite";
import UserList from "../admin/user";
import Dashboard from "../pages/dashboard";
import Formulaires from "../pages/formulaires";
import Gis from "../pages/gis/gis";
import Notif from "../pages/notifications";
import Planning from "../pages/Planning/planning";
import Statistics from "../pages/stats";
import {
  DASHBOARD_ROUTE,
  FORMULAIRE_ROUTE,
  LOCALISATION_ROUTE,
  NOTIFICATIONS_ROUTE,
  PLANNING_ROUTE,
  STATIC_ROUTE,
  TRACABILITE_ROUTE,
  USERLIST_ROUTE,
} from "../static/staticPath";
import Container from "./container";

const Main = () => {
  return (
    <Routes>
      <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
      <Route path={PLANNING_ROUTE} element={<Planning />} />
      <Route path={FORMULAIRE_ROUTE} element={<Formulaires />} />
      <Route path={LOCALISATION_ROUTE} element={<Gis />} />
      <Route path={NOTIFICATIONS_ROUTE} element={<Notif />} />
      <Route path={STATIC_ROUTE} element={<Statistics />} />
      <Route path={USERLIST_ROUTE} element={<UserList />} />
      <Route path={TRACABILITE_ROUTE} element={<Tracabilite />} />
    </Routes>
  );
};

export default Main;
