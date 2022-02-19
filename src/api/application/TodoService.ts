import { CompletedAt } from "../domain/CompletedAt";
import { CreatedAt } from "../domain/CreatedAt";
import { DueDate } from "../domain/DueDate";
import { Todo } from "../domain/Todo";
import { TodoList } from "../domain/TodoList";
import { TodoRequest } from "../presentation/TodoController";
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
        todo.Title,
        params.completed,
        new CreatedAt(todo.CreatedAt),
        new CompletedAt(null),
        new DueDate(params.dueDate),
        todo.Id
      );
      if (params.completed) updatedTodo.complete();
      await this.repository.updateTodo(updatedTodo);
    }
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
