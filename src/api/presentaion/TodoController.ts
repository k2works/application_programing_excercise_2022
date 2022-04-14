import { Route, Get, Tags, Body, Delete, Post, Put } from "tsoa";
import { Service } from "../application/Service";
import { TodoService } from "../application/TodoService";
import { TodoList } from "../domain/model/todo/TodoList";

export type TodoRequest = {
  title: string;
  completed: boolean;
  createdAt: Date | null;
  completedAt: Date | null;
  dueDate: Date | null;
  id: number | null;
};

@Route("api")
@Tags("todo")
export class TodoController {
  private service: Service<TodoRequest, TodoList>;

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
  public async delete(@Body() todo: TodoRequest): Promise<void> {
    await this.service.delete(todo);
  }

  @Put("/todo")
  public async update(@Body() todo: TodoRequest): Promise<void> {
    return this.service.update(todo);
  }
}
