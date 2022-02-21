import { Todo } from "../domain/Todo";
import { TodoList } from "../domain/TodoList";
import { TodoRequest } from "../presentation/TodoController";

export interface IService {
  create(todo: TodoRequest): void | PromiseLike<void>;
  selectAll(): PromiseLike<TodoList>;
  find(id: number): PromiseLike<Todo>;
  update(todo: TodoRequest): void | PromiseLike<void>;
  delete(id: number): void;
  count(): number | PromiseLike<number>;
}
