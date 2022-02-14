import express from "express";
import cors from "cors";
import { Todo } from "./domain/Todo";
import { createConnection } from "typeorm";
import { TodoService } from "./application/TodoService";
import { CreatedAt } from "./domain/CreatedAt";
import { CompletedAt } from "./domain/CompletedAt";
import { DueDate } from "./domain/DueDate";

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

    app.get("/api/:id", async (req, res) => {
      const id = req.params.id;
      const result = await service.find(parseInt(id));
      res.send(result);
    });

    app.post("/api", async (req, res) => {
      const request: TodoRequest = JSON.parse(JSON.stringify(req.body));
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

    app.put("/api", async (req, res) => {
      const request: TodoRequest = JSON.parse(JSON.stringify(req.body));
      console.log(request);
      if (request.id !== null) {
        const todo = await service.find(request.id);
        const updatedTodo = new Todo(
          todo.Title,
          todo.Completed,
          new CreatedAt(todo.CreatedAt),
          new CompletedAt(todo.CompletedAt),
          new DueDate(todo.DueDate),
          todo.Id
        );
        await service.update(updatedTodo);
      }
      res.send();
    });
  })
  .catch((error) => console.log(error));

export default app;
