import React from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./app/App";
import rootReducer from "./reducers";
import "./style.css";

const dev = require("./Dev.js");
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
