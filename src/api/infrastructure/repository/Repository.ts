import { Todo } from "../../domain/model/Todo";
import { TodoList } from "../../domain/model/TodoList";

export interface Repository<T> {
  getTodos(): Promise<TodoList>;
  getTodo(id: number): Promise<Todo>;
  updateTodo(updatedTodo: Todo): Promise<void>;
  deleteTodo(todo: Todo): Promise<void>;
  addTodo: any;
}
