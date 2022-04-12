import express from "express";
import cors from "cors";
import { Params, TodoService, Type } from "./application/TodoService";
import { AppDataSource } from "./infrastructure/data-source";
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
    app.get("/api/todos", async (req, res) => {
      const read = new TodoService(Type.READ);
      const result = await read.selectAll();
      res.send(result);
    });

    app.post("/api/todo", async (req, res) => {
      const request: Params = req.body;
      const create = new TodoService(Type.CREATE);
      await create.create(request);
      const read = new TodoService(Type.READ);
      const result = await read.selectAll();
      res.send(result);
    });

    app.put("/api/todo", async (req, res) => {
      const request: Params = req.body;
      const update = new TodoService(Type.UPDATE);
      await update.update(request);
      const read = new TodoService(Type.READ);
      const result = await read.selectAll();
      res.send(result);
    });

    app.delete("/api/todo", async (req, res) => {
      const request: Params = req.body;
      const dele = new TodoService(Type.DELETE);
      await dele.delete(request);
      const read = new TodoService(Type.READ);
      const result = await read.selectAll();
      res.send(result);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
