import "./src/style.css";
import { App } from "./src/App.js";
import { DB } from "./src/DB.js";
import { setUp } from "./src/Dev.js";
const db = new DB();
db.open(() => {
  const app = new App(db);
  app.mount();
});
setUp();
