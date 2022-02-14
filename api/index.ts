import express from "express";
import { Todo } from "./domain/Todo";
import { createConnection } from "typeorm";
import { TodoService } from "./application/TodoService";

const app = express();
const service = new TodoService();

createConnection()
  .then(async (connection) => {
    app.get("/api", async (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const result = await service.selectAll();
      console.log(result);
      res.send(result);
    });

    app.post("/api", async (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const todo = new Todo("helllo world");
      await service.create(todo);
      const result = await service.selectAll();
      console.log(result);
      res.send(result);
    });
  })
  .catch((error) => console.log(error));

export default app;