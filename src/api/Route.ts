import express from "express";
import { TodoController, TodoRequest } from "./presentaion/TodoController";

const router = express.Router();
const controller = new TodoController();

router.get("/todos", async (req, res) => {
  try {
    const result = await controller.selectAll();
    res.send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/todo", async (req, res) => {
  try {
    const request: TodoRequest = req.body;
    await controller.create(request);
    const result = await controller.selectAll();
    res.send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.put("/todo", async (req, res) => {
  try {
    const request: TodoRequest = req.body;
    await controller.update(request);
    const result = await controller.selectAll();
    res.send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/todo", async (req, res) => {
  try {
    const request: TodoRequest = req.body;
    await controller.delete(request);
    const result = await controller.selectAll();
    res.send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
