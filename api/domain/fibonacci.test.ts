import { Fibonacci } from "./fibonacci";

describe("フィボナッチ数列", () => {
  test("0を渡したら0を返す", () => {
    const fib = new Fibonacci();
    expect(fib.calc(0)).toEqual(0);
  });
});
