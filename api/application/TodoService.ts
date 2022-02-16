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

  async create(params: TodoRequest): Promise<Todo> {
    const todo = new Todo(params.title, params.completed);
    await this.repository.addTodo(todo);
    return todo;
  }

  async delete(id: number): Promise<void> {
    const todo = await this.find(id);
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

      if (params.completed) {
        const updateCompletedTodo = updatedTodo.complete();
        await this.repository.updateTodo(updateCompletedTodo);
      } else {
        await this.repository.updateTodo(updatedTodo);
      }
    }
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}