export interface Repository<T1, T2> {
  getTodos(): Promise<T2>;
  getTodo(id: number): Promise<T1>;
  updateTodo(updatedTodo: T1): Promise<void>;
  deleteTodo(todo: T1): Promise<void>;
  addTodo(todo: T1): Promise<void>;
}
