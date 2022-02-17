import { Todo } from "../domain/Todo";
import { TodoList } from "../domain/TodoList";
import { TodoRepository } from "./TodoRepository";

export class TodoService {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  async selectAll(): Promise<TodoList> {
    return this.repository.getTodos();
  }

  async create(todo: Todo): Promise<void> {
    await this.repository.addTodo(todo);
  }

  async delete(todo: Todo): Promise<void> {
    await this.repository.deleteTodo(todo);
  }

  async update(todo: Todo): Promise<void> {
    await this.repository.updateTodo(todo);
  }
}
