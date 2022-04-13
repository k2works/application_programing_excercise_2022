import express from "express";
import { Route, Get, Tags, Body, Delete, Post, Put } from "tsoa";
import { Params, TodoService } from "../application/TodoService";
import { TodoList } from "../domain/model/TodoList";

export type TodoRequest = {
  title: string;
  completed: boolean;
  createdAt: Date | null;
  completedAt: Date | null;
  dueDate: Date | null;
  id: number | null;
};

const service = new TodoService();
@Route("api")
@Tags("todo")
class TodoController {
  private service: TodoService;

  constructor() {
    this.service = new TodoService();
  }
  @Get("/todos")
  public async selectAll(): Promise<TodoList> {
    return this.service.selectAll();
  }

  @Post("/todo")
  public async create(@Body() todo: TodoRequest): Promise<void> {
    return this.service.create(todo);
  }

  @Delete("/todo")
  public async delete(@Body() req: any): Promise<void> {
    const request = JSON.parse(JSON.stringify(req.body));
    if (request.id !== null) await this.service.delete(request.id);
  }

  @Put("/todo")
  public async update(@Body() todo: TodoRequest): Promise<void> {
    return this.service.update(todo);
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
