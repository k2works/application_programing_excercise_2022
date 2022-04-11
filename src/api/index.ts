import express from "express";
import cors from "cors";
import { Todo } from "./Todo";
import { Params, TodoService, Type } from "./TodoService";
import { AppDataSource } from "./data-source";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

AppDataSource.initialize()
  .then(() => {
    app.get("/api", (req, res) => {
      const todo = new Todo();
      res.send(todo.greeting());
    });

    app.get("/api/todos", async (req, res) => {
      const service = new TodoService();
      const result = await service.execute(Type.READ, {});
      res.send(result);
    });

    app.post("/api/todo", async (req, res) => {
      const request: Params = req.body;
      const service = new TodoService();
      await service.execute(Type.CREATE, request);
      const result = await service.execute(Type.READ, {});
      res.send(result);
    });

    app.put("/api/todo", async (req, res) => {
      const request: Params = req.body;
      const service = new TodoService();
      await service.execute(Type.UPDATE, request);
      const result = await service.execute(Type.READ, {});
      res.send(result);
    });

    app.delete("/api/todo", async (req, res) => {
      const request: Params = req.body;
      const service = new TodoService();
      await service.execute(Type.DELETE, request);
      const result = await service.execute(Type.READ, {});
      res.send(result);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
