import express from "express";
import { Todo } from "./domain/Todo";
import { createConnection } from "typeorm";
import { TodoService } from "./application/TodoService";

const app = express();
const service = new TodoService();

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

createConnection()
  .then(async (connection) => {
    app.get("/api", async (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const result = await service.selectAll();
      res.send(result);
    });

    app.post("/api", async (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const request: TodoRequest = JSON.parse(req.body);
      const todo = new Todo(request.title, request.completed);
      await service.create(todo);
      const result = await service.selectAll();
      res.send(result);
    });
  })
  .catch((error) => console.log(error));

export default app;