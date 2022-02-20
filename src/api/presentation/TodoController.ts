import express from "express";
import { Body, Delete, Get, Patch, Path, Post, Put, Route, Tags } from "tsoa";
import { TodoService } from "../application/TodoService";

export interface Todo {
  Title: string;
  Completed: boolean;
  OverDue: boolean;
  CreatedAt: Date | null;
  CompletedAt: Date | null;
  DueDate: Date | null;
  Id: number | null;
  Status: string;
  StatusCode: string;
  StatusType: string;
}

export interface TodoList {
  Value: Todo[];
}
export interface TodoRequest {
  title: string;
  completed: boolean;
  createdAt: Date | null;
  completedAt: Date | null;
  dueDate: Date | null;
  id: number | null;
}
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

  @Get("/todos/count")
  public async count(): Promise<number> {
    return this.service.count();
  }

  @Get("/todo/{id}")
  public async select(@Path() id: number): Promise<Todo> {
    return this.service.find(id);
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
    await service.create(request);
    res.send({ success: "success" });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/todo", async (req, res) => {
  try {
    const request = JSON.parse(JSON.stringify(req.body));
    if (request.id !== null) await service.delete(request.id);
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
