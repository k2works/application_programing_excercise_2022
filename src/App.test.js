
import { Fibonacci } from "./App.js";

describe("フィボナッチ数列", () => {
  test("0を渡したら0を返す", () => {
    expect(Fibonacci.fib(0)).toEqual(0);
  });

  test("1を渡したら1を返す", () => {
    expect(Fibonacci.fib(1)).toEqual(1);
  });

  test("2を渡したら2を返す", () => {
    expect(Fibonacci.fib(2)).toEqual(1);
  });

  test("3を渡したら2を返す", () => {
    expect(Fibonacci.fib(3)).toEqual(2);
  });

  test("4を渡したら3を返す", () => {
    expect(Fibonacci.fib(4)).toEqual(3);
  });
  test("5を渡したら5を返す", () => {
    expect(Fibonacci.fib(5)).toEqual(5);
  });
});
