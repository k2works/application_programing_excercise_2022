import { Todo } from "../domain/Todo";
import { TodoRepository } from "../infrastructure/repository/TodoRepository";
import { CreatedAt } from "../domain/CreatedAt";
import { CompletedAt } from "../domain/CompletedAt";
import { DueDate } from "../domain/DueDate";

export enum Type {
  CREATE,
  READ,
  UPDATE,
  DELETE,
}

export type Params = {
  id?: number | undefined;
  title?: string | undefined;
  completed?: boolean;
  dueDate?: Date;
  completedAt?: Date;
  status?: string;
};

export class TodoService {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  async selectAll(): Promise<Todo[]> {
    return this.repository.getTodos();
  }

  async create(params: Params): Promise<void> {
    const title = params.title;
    if (title) {
      const todo = new Todo(title);
      await this.repository.addTodo(todo);
    }
  }

  async delete(params: Params): Promise<void> {
    const id = params.id;
    if (id) {
      const todo = await this.repository.getTodo(id);
      if (todo) await this.repository.deleteTodo(todo);
    }
  }

  async update(params: Params): Promise<void> {
    if (params.id) {
      const result = await this.repository.getTodo(params.id);
      if (result) {
        const completed = params.completed;
        const dueDate = params.dueDate;
        const status = params.completed ? "完了" : "着手";
        if (dueDate) {
          const todo = new Todo(
            result.Title,
            completed,
            new CreatedAt(result.CreatedAt),
            new CompletedAt(result.CompletedAt),
            new DueDate(dueDate),
            status,
            result.Id
          );
          await this.repository.updateTodo(todo);
        } else {
          const todo = new Todo(
            result.Title,
            completed,
            new CreatedAt(result.CreatedAt),
            new CompletedAt(result.CompletedAt),
            new DueDate(result.DueDate),
            status,
            result.Id
          );
          await this.repository.updateTodo(todo);
        }
      }
    }
  }
}
