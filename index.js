import "./src/style.css";
import { App } from "./src/App.js";
import { setUp } from "./src/Dev.js";
const app = new App();
app.mount();
setUp();
