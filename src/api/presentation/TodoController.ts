import { Body, Delete, Get, Patch, Path, Post, Put, Route, Tags } from "tsoa";
import { IService } from "../application/IService";
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
export class TodoController {
  private service: IService;

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
  public async find(@Path() id: number): Promise<Todo> {
    return this.service.find(id);
  }

  @Post("/todo")
  public async create(@Body() todo: TodoRequest): Promise<void> {
    return this.service.create(todo);
  }

  @Delete("/todo")
  public async delete(@Body() request: { id: number }): Promise<void> {
    if (request.id !== null) await this.service.delete(request.id);
  }

  @Put("/todo")
  public async update(@Body() todo: TodoRequest): Promise<void> {
    return this.service.update(todo);
  }
}
