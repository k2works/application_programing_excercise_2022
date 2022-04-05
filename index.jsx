import React from "react";
import { createRoot } from "react-dom/client";
import "./src/style.css";
import App from "./src/App.jsx";
import { DB } from "./src/infrastructure/DB.js";
const db = new DB("todo");
db.setup().then(() => {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<App db={db} />);
});

import { setUp } from "./src/Dev.js";
setUp();
