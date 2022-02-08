import {
  Command,
  Fibonacci,
  FibonacciList,
  FibonacciTypeEnum,
} from "./fibonacci";

describe("フィボナッチ数列", () => {
  let recursive: Command;
  let loop: Command;
  let generalTerm: Command;
  beforeEach(() => {
    recursive = new Fibonacci(FibonacciTypeEnum.valueOf(1));
    loop = new Fibonacci(FibonacciTypeEnum.valueOf(2));
    generalTerm = new Fibonacci(FibonacciTypeEnum.valueOf(3));
  });
  describe("正常系", () => {
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

    test("40までのフィボナッチ配列を返す", () => {
      const command = new Fibonacci(FibonacciTypeEnum.valueOf(1));
      const listCommand = new FibonacciList(command);
      const result = listCommand.exec(40);

      expect(result[0]).toEqual(1);
      expect(result[result.length - 3]).toEqual(39088169);
      expect(result[result.length - 2]).toEqual(63245986);
      expect(result[result.length - 1]).toEqual(102334155);
    });
  });

  describe("異常系", () => {
    test("マイナスの値はエラーを返す", () => {
      const result = () => recursive.exec(-1);
      expect(result).toThrowError("マイナスの値は指定できません");
    });
  });
});
