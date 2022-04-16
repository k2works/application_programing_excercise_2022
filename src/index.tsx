import * as React from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./app/App";
import rootReducer from "./reducers";
import "./style.css";

const store = configureStore({
  reducer: rootReducer,
});

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

if (process.env.NODE_ENV !== "production") {
  const Dev = require("./Dev.js");
  Dev.setUp();
}
