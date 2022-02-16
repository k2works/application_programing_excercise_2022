import "./src/style.css";
import { App } from "./src/App.js";
import { setUp } from "./src/Dev.js";

if (process.env.NODE_ENV === "production") {
  const app = new App({ apiUrl: "/api" });
  app.mount();
  setUp();
} else {
  const app = new App({ apiUrl: "http://localhost:3000/api" });
  app.mount();
  setUp();
}