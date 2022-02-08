import {
  Command,
  Fibonacci,
  FibonacciGenralTerm,
  FibonacciLoop,
  FibonacciRecursive,
} from "./fibonacci";

describe("フィボナッチ数列", () => {
  let recursive: Command;
  let loop: Command;
  let generalTerm: Command;
  beforeEach(() => {
    recursive = new Fibonacci(new FibonacciRecursive());
    loop = new Fibonacci(new FibonacciLoop());
    generalTerm = new Fibonacci(new FibonacciGenralTerm());
  });
  test.each([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 5],
  ])("%iを渡した%pを返す", (number: number, expected: number) => {
    expect(recursive.exec(number)).toEqual(expected);
  });

  test("大きな数値で計算する(再帰による実装)", () => {
    expect(recursive.exec(40)).toEqual(102334155);
  });

  test("大きな数値で計算する(ループによる実装)", () => {
    expect(loop.exec(40)).toEqual(102334155);
  });

  test("大きな数値で計算する(一般項による実装)", () => {
    expect(generalTerm.exec(40)).toEqual(102334155);
  });

  test("マイナスの値はエラーを返す", () => {
    const result = () => recursive.exec(-1);
    expect(result).toThrowError("マイナスの値は指定できません");
  });
});
