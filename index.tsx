import * as React from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./src/app/App";
import rootReducer from "./src/reducers";
import "./src/style.css";
import { DB } from "./src/infrastructure/DB";
const db = new DB("todo");

db.setup().then(() => {
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
});

const Dev = require("./src/Dev.js");
Dev.setUp();
