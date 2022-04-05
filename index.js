import "./src/style.css";
import { App } from "./src/App.js";
import { DB } from "./src/infrastructure/DB.js";
import { setUp } from "./src/Dev.js";

const db = new DB("todo");
db.setup().then(() => {
  const app = new App(db);
  app.mount();
});
setUp();
