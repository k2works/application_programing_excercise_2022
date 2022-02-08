import {
  Fibonacci,
  FibonacciGenralTerm,
  FibonacciLoop,
  FibonacciRecursive,
} from "./fibonacci";

describe("フィボナッチ数列", () => {
  let command: FibonacciRecursive;
  beforeEach(() => {
    command = new FibonacciRecursive();
  });
  test.each([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 5],
  ])("%iを渡した%pを返す", (number: number, expected: number) => {
    expect(command.exec(number)).toEqual(expected);
  });

  test("大きな数値で計算する(再帰による実装)", () => {
    const command = new FibonacciRecursive();
    expect(command.exec(40)).toEqual(102334155);
  });

  test("大きな数値で計算する(ループによる実装)", () => {
    const command = new FibonacciLoop();
    expect(command.exec(40)).toEqual(102334155);
  });

  test("大きな数値で計算する(一般項による実装)", () => {
    const command = new FibonacciGenralTerm();
    expect(command.exec(40)).toEqual(102334155);
  });
});
