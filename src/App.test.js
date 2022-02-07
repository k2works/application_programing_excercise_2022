
import { Fibonacci } from "./App.js";

describe("フィボナッチ数列", () => {
  test("0を渡したら0を返す", () => {
    expect(Fibonacci.fib(0)).toEqual(0);
  });
});
