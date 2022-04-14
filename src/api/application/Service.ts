import { TodoList } from "../domain/model/TodoList";
import { TodoRequest } from "../presentaion/TodoController";

export interface Service {
  create(params: TodoRequest): PromiseLike<void>;
  selectAll(): PromiseLike<TodoList>;
  update(params: TodoRequest): PromiseLike<void>;
  delete(params: TodoRequest): PromiseLike<void>;
}
