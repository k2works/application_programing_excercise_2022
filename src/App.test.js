
import { Fibonacci } from "./App.js";

describe("フィボナッチ数列", () => {
  test("0を渡したら0を返す", () => {
    expect(Fibonacci.fib(0)).toEqual(0);
  });

  test("1を渡したら1を返す", () => {
    expect(Fibonacci.fib(1)).toEqual(1);
  });
});
