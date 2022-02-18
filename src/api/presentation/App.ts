import express from "express";
import cors from "cors";
import { TodoService } from "../application/TodoService";
import { createConnection } from "typeorm";
import { Todo } from "../domain/Todo";
import { TodoList } from "../domain/TodoList";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.text());
const service = new TodoService();

createConnection()
  .then(async (connection) => {
    app.get("/api/todos", async (req, res) => {
      //const result = await service.selectAll();
      const todo1 = new Todo("タイトル1");
      const todo2 = new Todo("タイトル2");
      const result = new TodoList([todo1, todo2]);
      console.log(result);
      res.send(result);
    });
  })
  .catch((error) => console.log(error));

export default app;
