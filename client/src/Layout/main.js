import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Formulaires from "../pages/formulaires";
import Gis from "../pages/gis";
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
} from "../static/staticPath";
import Container from "./container";

const Main = () => {
  console.log("first");
  return (
    <Routes>
      <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
      <Route path={PLANNING_ROUTE} element={<Planning />} />
      <Route path={FORMULAIRE_ROUTE} element={<Formulaires />} />
      <Route path={LOCALISATION_ROUTE} element={<Gis />} />
      <Route path={NOTIFICATIONS_ROUTE} element={<Notif />} />
      <Route path={STATIC_ROUTE} element={<Statistics />} />
    </Routes>
  );
};

export default Main;
