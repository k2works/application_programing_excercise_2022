import express from "express";
import { Todo } from "../domain/Todo";
import { TodoService } from "../application/TodoService";

export interface TodoRequest {
  title: string;
  completed: boolean;
  createdAt: Date | null;
  completedAt: Date | null;
  dueDate: Date | null;
  id: number | null;
}
const service = new TodoService();
const router = express.Router();

router.get("/todos", async (req, res) => {
  try {
    const result = await service.selectAll();
    res.send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/todos/count", async (req, res) => {
  try {
    const result = await service.count();
    res.send(result.toString());
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.find(parseInt(id));
    res.send({ value: result });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/todo", async (req, res) => {
  try {
    const request: TodoRequest = req.body;
    const todo = new Todo(request.title, request.completed);
    await service.create(todo);
    res.send({ success: "success" });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/todo", async (req, res) => {
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

router.put("/todo", async (req, res) => {
  try {
    const request: TodoRequest = req.body;
    await service.update(request);
    res.send({ success: "success" });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
