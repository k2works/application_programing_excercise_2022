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

interface TodoRequest {
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

    app.post("/api", async (req, res) => {
      const request: TodoRequest = JSON.parse(req.body);
      const todo = new Todo(request.title, request.completed);
      await service.create(todo);
      res.end();
    });

    app.delete("/api", async (req, res) => {
      const data = JSON.parse(JSON.stringify(req.body));
      if (data.id !== null) {
        const todo = await service.find(parseInt(data.id));
        await service.delete(todo);
      }
      res.end();
    });
  })
  .catch((error) => console.log(error));

export default app;
