import express from "express";
import { Todo } from "./Todo";
const app = express();

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const todo = new Todo();
  res.send(todo.greeting());
});

export default app;
