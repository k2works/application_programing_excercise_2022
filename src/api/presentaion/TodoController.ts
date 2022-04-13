import express from "express";
import { Params, TodoService } from "../application/TodoService";

const service = new TodoService();
const router = express.Router();

router.get("/todos", async (req, res) => {
  const result = await service.selectAll();
  res.send(result);
});

router.post("/todo", async (req, res) => {
  const request: Params = req.body;
  await service.create(request);
  const result = await service.selectAll();
  res.send(result);
});

router.put("/todo", async (req, res) => {
  const request: Params = req.body;
  await service.update(request);
  const result = await service.selectAll();
  res.send(result);
});

router.delete("/todo", async (req, res) => {
  const request: Params = req.body;
  await service.delete(request);
  const result = await service.selectAll();
  res.send(result);
});

export default router;
