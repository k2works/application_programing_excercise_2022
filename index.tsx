import * as React from "react";
import { createRoot } from "react-dom/client";
import "./src/style.css";
import App from "./src/App";
import { DB } from "./src/infrastructure/DB";
const db = new DB("todo");
db.setup().then(() => {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(<App db={db} />);
  }
});

const Dev = require("./src/Dev.js");
Dev.setUp();
