export interface IRepository<T1, T2> {
  add(arg: T1): Promise<void>;
  getAll(): PromiseLike<T2>;
  get(id: number): PromiseLike<T1>;
  update(arg: T1): Promise<void>;
  delete(arg: T1): Promise<void>;
  count(): number | PromiseLike<number>;
}
