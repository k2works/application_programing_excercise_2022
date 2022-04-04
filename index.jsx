import React from "react";
import { render } from "react-dom";
import App from "./src/App.jsx";
import { DB } from "./src/infrastructure/DB.js";
const db = new DB("todo");
render(<App db={db} />, document.querySelector("#root"));

import { setUp } from "./src/Dev.js";
setUp();

import "./src/style.css";
import { App as LegacyApp } from "./src/App.js";

db.setup().then(() => {
  const app = new LegacyApp(db);
  app.mount();
});
