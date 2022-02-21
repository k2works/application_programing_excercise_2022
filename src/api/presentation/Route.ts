import express from "express";
import { TodoRequest, TodoController } from "./TodoController";

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

router.get("/todos/count", async (req, res) => {
  try {
    const result = await controller.count();
    res.send(result.toString());
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/todo/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await controller.find(id);
    res.send({ value: result });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/todo", async (req, res) => {
  try {
    const request: TodoRequest = req.body;
    await controller.create(request);
    res.send({ success: "success" });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/todo", async (req, res) => {
  try {
    const request = JSON.parse(JSON.stringify(req.body));
    await controller.delete(request);
    res.send({ success: "success" });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.put("/todo", async (req, res) => {
  try {
    const request: TodoRequest = req.body;
    await controller.update(request);
    res.send({ success: "success" });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
