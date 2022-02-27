import React from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./app/main";
import rootReducer from "./reducers";

import "./style.css";
const dev = require("./Dev.js");
let apiUrl = "http://localhost:3000/api";
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://ape2022.herokuapp.com/api";
}
dev.setUp();

const store = configureStore({
  reducer: rootReducer,
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
