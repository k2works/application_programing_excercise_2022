import { Todo } from "../domain/model/Todo";
import { TodoRepository } from "../infrastructure/repository/TodoRepository";
import { CreatedAt } from "../domain/model/CreatedAt";
import { CompletedAt } from "../domain/model/CompletedAt";
import { DueDate } from "../domain/model/DueDate";
import { TodoList } from "../domain/model/TodoList";
import { TodoRequest } from "../presentaion/TodoController";
export class TodoService {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  async selectAll(): Promise<TodoList> {
    return this.repository.getTodos();
  }

  async create(params: TodoRequest): Promise<void> {
    const title = params.title;
    if (title !== undefined) {
      const todo = Todo.create({
        title,
        completed: false,
        createdAt: new CreatedAt(new Date()),
        completedAt: new CompletedAt(null),
        dueDate: new DueDate(null),
        id: null,
      });
      await this.repository.addTodo(todo);
    }
  }

  async delete(params: TodoRequest): Promise<void> {
    const id = params.id;
    if (id) {
      const todo = await this.repository.getTodo(id);
      if (todo) await this.repository.deleteTodo(todo);
    }
  }

  async update(params: TodoRequest): Promise<void> {
    if (params.id) {
      const result = await this.repository.getTodo(params.id);
      if (result) {
        const completed = params.completed;
        const dueDate = params.dueDate;
        const todo = Todo.create({
          title: result.Title,
          completed: completed,
          createdAt: new CreatedAt(result.CreatedAt),
          completedAt: new CompletedAt(result.CompletedAt),
          dueDate: new DueDate(dueDate),
          id: result.Id,
        });
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
