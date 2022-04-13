import express from "express";
import cors from "cors";
import { Params, TodoService } from "./application/TodoService";
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
      const service = new TodoService();
      const result = await service.selectAll();
      res.send(result);
    });

    app.post("/api/todo", async (req, res) => {
      const request: Params = req.body;
      const service = new TodoService();
      await service.create(request);
      const result = await service.selectAll();
      res.send(result);
    });

    app.put("/api/todo", async (req, res) => {
      const request: Params = req.body;
      const service = new TodoService();
      await service.update(request);
      const result = await service.selectAll();
      res.send(result);
    });

    app.delete("/api/todo", async (req, res) => {
      const request: Params = req.body;
      const service = new TodoService();
      await service.delete(request);
      const result = await service.selectAll();
      res.send(result);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
