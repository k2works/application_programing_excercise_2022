import express from "express";
import cors from "cors";
import { Todo } from "./Todo";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.text());

app.get("/api", (req, res) => {
  const todo = new Todo();
  res.send(todo.greeting());
});
app.use(express.static("public"));

export default app;