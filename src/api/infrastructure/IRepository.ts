import { Todo } from "../domain/model/todo/Todo";
import { TodoList } from "../domain/model/todo/TodoList";

export interface IRepository<T> {
  count(): number | PromiseLike<number>;
  updateTodo(updatedTodo: Todo): Promise<void>;
  deleteTodo(todo: Todo): Promise<void>;
  addTodo: any;
  getTodo(id: number): PromiseLike<Todo>;
  getTodos(): PromiseLike<TodoList>;
}
