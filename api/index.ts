import express from "express";
import { Todo } from "./domain/Todo";
const app = express();

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const todo = new Todo("hello World");
  res.send(todo.Title);
});

export default app;
