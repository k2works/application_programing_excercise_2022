import { Todo } from "../domain/model/Todo";
import { TodoRepository } from "../infrastructure/repository/TodoRepository";
import { CreatedAt } from "../domain/model/CreatedAt";
import { CompletedAt } from "../domain/model/CompletedAt";
import { DueDate } from "../domain/model/DueDate";
import { TodoList } from "../domain/model/TodoList";

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

  async selectAll(): Promise<TodoList> {
    return this.repository.getTodos();
  }

  async create(params: Params): Promise<void> {
    const title = params.title;
    if (title !== undefined) {
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
        const todo = new Todo(
          result.Title,
          completed,
          new CreatedAt(result.CreatedAt),
          new CompletedAt(result.CompletedAt),
          new DueDate(result.DueDate),
          result.Id
        );
        if (dueDate) {
          const parsedDate = new Date(dueDate);
          const update = todo.setDueDate(new DueDate(parsedDate));
          await this.repository.updateTodo(update);
        } else {
          await this.repository.updateTodo(todo);
        }
      }
    }
  }
}
