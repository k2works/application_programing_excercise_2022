import express from "express";
import { Todo } from "./Todo";
const app = express();

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const todo = new Todo("hello World");
  res.send(todo.getTitle());
});

export default app;
