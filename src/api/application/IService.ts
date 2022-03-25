export interface IService<T1, T2, T3> {
  create(arg: T1): void | PromiseLike<void>;
  selectAll(): PromiseLike<T3>;
  find(id: number): PromiseLike<T2>;
  update(arg: T1): void | PromiseLike<void>;
  delete(id: number): void | PromiseLike<void>;
  count(): number | PromiseLike<number>;
}
