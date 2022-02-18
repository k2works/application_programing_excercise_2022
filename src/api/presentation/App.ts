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
      try {
        const result = await service.selectAll();
        res.send(result);
      } catch (err: any) {
        res.status(400).send({ error: err.message });
      }
    });

    app.get("/api/todos/count", async (req, res) => {
      try {
        const result = await service.count();
        res.send(result.toString());
      } catch (err: any) {
        res.status(400).send({ error: err.message });
      }
    });

    app.get("/api/todo/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await service.find(parseInt(id));
        res.send({ value: result });
      } catch (err: any) {
        res.status(400).send({ error: err.message });
      }
    });

    app.post("/api/todo", async (req, res) => {
      try {
        const request: TodoRequest = req.body;
        const todo = new Todo(request.title, request.completed);
        await service.create(todo);
        res.send({ success: "success" });
      } catch (err: any) {
        res.status(400).send({ error: err.message });
      }
    });

    app.delete("/api/todo", async (req, res) => {
      try {
        const data = req.body;
        if (data.id !== null) {
          const todo = await service.find(parseInt(data.id));
          await service.delete(todo);
        }
        res.send({ success: "success" });
      } catch (err: any) {
        res.status(400).send({ error: err.message });
      }
    });

    app.put("/api/todo", async (req, res) => {
      try {
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
        res.send({ success: "success" });
      } catch (err: any) {
        res.status(400).send({ error: err.message });
      }
    });
  })
  .catch((error) => console.log(error));

export default app;
