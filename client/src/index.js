import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
console.log("sss");
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);