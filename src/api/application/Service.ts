export interface Service<T1, T2> {
  create(params: T1): PromiseLike<void>;
  selectAll(): PromiseLike<T2>;
  update(params: T1): PromiseLike<void>;
  delete(params: T1): PromiseLike<void>;
}
