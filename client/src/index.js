import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux";
import App from "./App";
import "antd/dist/antd.min.css";
import "./styles/sideBar.css";
import "./styles/main.css";
import "./styles/PlanningFormsModal.css";
import "./styles/popupStyler.css";
import "./styles/login.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
