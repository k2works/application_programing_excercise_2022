
import { Fibonacci } from "./App.js";

describe("フィボナッチ数列", () => {
  test.each([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 5],
  ])("%iを渡したら%pを返す", (number, expected) => {
    expect(Fibonacci.fib(number)).toEqual(expected);
  });
});
