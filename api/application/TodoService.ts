import { param } from "cypress/types/jquery";
import { TodoRequest } from "..";
import { CompletedAt } from "../domain/CompletedAt";
import { CreatedAt } from "../domain/CreatedAt";
import { DueDate } from "../domain/DueDate";
import { Todo, TodoList } from "../domain/Todo";
import { TodoRepository } from "./TodoRepository";

export class TodoService {
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

  async create(todo: Todo): Promise<void> {
    await this.repository.addTodo(todo);
  }

  async delete(todo: Todo): Promise<void> {
    await this.repository.deleteTodo(todo);
  }

  async update(params: TodoRequest): Promise<void> {
    if (params.id !== null) {
      const todo = await this.find(params.id);
      const updatedTodo = new Todo(
        params.title,
        params.completed,
        new CreatedAt(todo.CreatedAt),
        new CompletedAt(null),
        new DueDate(params.dueDate),
        params.id
      );
      if (params.completed) updatedTodo.complete();
      await this.repository.updateTodo(updatedTodo);
    }
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
