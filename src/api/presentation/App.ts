import express from "express";
import cors from "cors";
import { Todo } from "../domain/Todo";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.text());

app.get("/api", (req, res) => {
  const todo = new Todo("hello world");
  res.send(todo.Title);
});

export default app;
