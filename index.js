import { View } from "./src/View";
import { setUp } from "./src/Dev.js";

let view;
if (process.env.NODE_ENV === "production") {
  view = new View({ apiUrl: "/api" });
  view.render();
  setUp();
} else {
  view = new View({ apiUrl: "http://localhost:3000/api" });
  view.render();
  setUp();
}