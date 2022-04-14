export interface Repository<T1, T2> {
  getAll(): Promise<T2>;
  get(id: number): Promise<T1>;
  update(updatedTodo: T1): Promise<void>;
  delete(todo: T1): Promise<void>;
  add(todo: T1): Promise<void>;
}
