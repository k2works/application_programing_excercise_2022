import express from "express";
import cors from "cors";
import { TodoService } from "../application/TodoService";
import { createConnection } from "typeorm";
import { Todo } from "../domain/Todo";
import { CompletedAt } from "../domain/CompletedAt";
import { CreatedAt } from "../domain/CreatedAt";
import { DueDate } from "../domain/DueDate";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
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
    app.get("/api/todos", async (req, res) => {
      const result = await service.selectAll();
      res.send(result);
    });

    app.get("/api/todo/:id", async (req, res) => {
      const id = req.params.id;
      const result = await service.find(parseInt(id));
      console.log(result);
      res.send({ value: result });
    });

    app.post("/api/todo", async (req, res) => {
      const request: TodoRequest = req.body;
      const todo = new Todo(request.title, request.completed);
      await service.create(todo);
      res.send({ message: "success" });
    });

    app.delete("/api/todo", async (req, res) => {
      const data = req.body;
      if (data.id !== null) {
        const todo = await service.find(parseInt(data.id));
        await service.delete(todo);
      }
      res.send({ message: "success" });
    });

    app.put("/api/todo", async (req, res) => {
      const request: TodoRequest = req.body;
      if (request.id !== null) {
        const todo = await service.find(request.id);
        const updatedTodo = new Todo(
          todo.Title,
          request.completed,
          new CreatedAt(todo.CreatedAt),
          new CompletedAt(todo.CompletedAt),
          new DueDate(todo.DueDate),
          todo.Id
        );
        await service.update(updatedTodo);
      }
      res.send({ message: "success" });
    });
  })
  .catch((error) => console.log(error));

export default app;
