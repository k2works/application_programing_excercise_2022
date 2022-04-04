import React from "react";
import { render } from "react-dom";
import "./src/style.css";
import App from "./src/App.jsx";
import { DB } from "./src/infrastructure/DB.js";
const db = new DB("todo");
db.setup().then(() => {
  render(<App db={db} />, document.querySelector("#root"));
});

import { setUp } from "./src/Dev.js";
setUp();

