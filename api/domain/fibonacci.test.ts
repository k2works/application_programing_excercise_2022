import { Fibonacci } from "./fibonacci";

describe("フィボナッチ数列", () => {
  let fib: Fibonacci;
  beforeEach(() => {
    fib = new Fibonacci();
  });
  test.each([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 5],
  ])("%iを渡した%pを返す", (number: number, expected: number) => {
    expect(fib.calc(number)).toEqual(expected);
  });

  test("大きな数値で計算する(再帰による実装)", () => {
    expect(fib.calc(40)).toEqual(102334155);
  });

  test("大きな数値で計算する(ループによる実装)", () => {
    expect(fib.calc2(40)).toEqual(102334155);
  });
});
