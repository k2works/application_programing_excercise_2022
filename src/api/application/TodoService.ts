import { CompletedAt } from "../domain/model/todo/CompletedAt";
import { CreatedAt } from "../domain/model/todo/CreatedAt";
import { DueDate } from "../domain/model/todo/DueDate";
import { Todo } from "../domain/model/todo/Todo";
import { TodoList } from "../domain/model/todo/TodoList";
import { TodoRequest } from "../presentation/TodoController";
import { IService } from "./IService";
import { TodoRepository } from "../infrastructure/TodoRepository";
import { IRepository } from "../infrastructure/IRepository";

export class TodoService implements IService<TodoRequest, Todo, TodoList> {
  private repository: IRepository<Todo, TodoList>;

  constructor() {
    this.repository = new TodoRepository();
  }

  async selectAll(): Promise<TodoList> {
    return this.repository.getAll();
  }

  async find(id: number): Promise<Todo> {
    return this.repository.get(id);
  }

  async create(params: TodoRequest): Promise<void> {
    const todo = new Todo(params.title, params.completed);
    await this.repository.add(todo);
  }

  async delete(id: number): Promise<void> {
    const todo = await this.find(id);
    await this.repository.delete(todo);
  }

  async update(params: TodoRequest): Promise<void> {
    if (params.id !== null) {
      const todo = await this.find(params.id);
      let updatedTodo = new Todo(
        params.title,
        params.completed,
        new CreatedAt(todo.CreatedAt),
        new CompletedAt(null),
        new DueDate(params.dueDate),
        todo.Id
      );

      if (params.dueDate)
        updatedTodo = updatedTodo.setDueDate(new DueDate(params.dueDate));

      if (params.completed) updatedTodo = updatedTodo.complete();

      await this.repository.update(updatedTodo);
    }
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
