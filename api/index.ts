import express from "express";
import cors from "cors";
import { Todo } from "./domain/Todo";
import { createConnection } from "typeorm";
import { TodoService } from "./application/TodoService";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.text());

export interface TodoRequest {
  title: string;
  completed: boolean;
  createdAt: Date | null;
  completedAt: Date | null;
  dueDate: Date | null;
  id: number | null;
}
const service = new TodoService();

createConnection()
  .then(async (connection) => {
    app.get("/api", async (req, res) => {
      const result = await service.selectAll();
      res.send(result);
    });

    app.get("/api/todo/:id", async (req, res) => {
      const id = req.params.id;
      const result = await service.find(parseInt(id));
      res.send(result);
    });

    app.get("/api/todos/count", async (req, res) => {
      const result = await service.count();
      res.send(result.toString());
    });

    app.post("/api", async (req, res) => {
      const request: TodoRequest = JSON.parse(JSON.stringify(req.body));
      const result = await service.create(request);
      res.send(result);
    });

    app.delete("/api", async (req, res) => {
      const request = JSON.parse(JSON.stringify(req.body));
      if (request.id !== null) await service.delete(parseInt(request.id));
      res.end();
    });

    app.put("/api", async (req, res) => {
      const request: TodoRequest = JSON.parse(JSON.stringify(req.body));
      await service.update(request);
      res.end();
    });
  })
  .catch((error) => console.log(error));

export default app;
