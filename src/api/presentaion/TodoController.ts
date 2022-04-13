import express from "express";
import { Route, Get } from "tsoa";
import { Params, TodoService } from "../application/TodoService";
import { TodoList } from "../domain/model/TodoList";

const service = new TodoService();
@Route("api")
class TodoController {
  @Get("/todos")
  public async selectAll(): Promise<TodoList> {
    return service.selectAll();
  }
}

const router = express.Router();

router.get("/todos", async (req, res) => {
  try {
    const result = await service.selectAll();
    res.send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/todo", async (req, res) => {
  try {
    const request: Params = req.body;
    await service.create(request);
    const result = await service.selectAll();
    res.send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.put("/todo", async (req, res) => {
  try {
    const request: Params = req.body;
    await service.update(request);
    const result = await service.selectAll();
    res.send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/todo", async (req, res) => {
  try {
    const request: Params = req.body;
    await service.delete(request);
    const result = await service.selectAll();
    res.send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
