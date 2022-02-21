import { CompletedAt } from "../domain/model/todo/CompletedAt";
import { CreatedAt } from "../domain/model/todo/CreatedAt";
import { DueDate } from "../domain/model/todo/DueDate";
import { Todo } from "../domain/model/todo/Todo";
import { TodoList } from "../domain/model/todo/TodoList";
import { TodoRequest } from "../presentation/TodoController";
import { IService } from "./IService";
import { TodoRepository } from "../infrastructure/TodoRepository";

export class TodoService implements IService {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  async selectAll(): Promise<TodoList> {
    return this.repository.getTodos();
  }

  async find(id: number): Promise<Todo> {
    return this.repository.getTodo(id);
  }

  async create(params: TodoRequest): Promise<void> {
    const todo = new Todo(params.title, params.completed);
    await this.repository.addTodo(todo);
  }

  async delete(id: number): Promise<void> {
    const todo = await this.find(id);
    await this.repository.deleteTodo(todo);
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

      await this.repository.updateTodo(updatedTodo);
    }
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
