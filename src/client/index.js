import "./style.css";
import { App } from "./App.js";
import { setUp } from "./Dev.js";

let apiUrl = "http://localhost:3000/api";
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://ape2022.herokuapp.com/api";
}
const app = new App(apiUrl);
app.mount();
setUp();
