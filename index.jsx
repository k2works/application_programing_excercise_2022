import React from "react";
import { render } from "react-dom";
import App from "./src/App.jsx";
render(<App />, document.querySelector("#app"));

import { setUp } from "./src/Dev.js";
setUp();

import "./src/style.css";
import { App as LegacyApp } from "./src/App.js";
import { DB } from "./src/infrastructure/DB.js";

const db = new DB("todo");
db.setup().then(() => {
  const app = new LegacyApp(db);
  app.mount();
});
