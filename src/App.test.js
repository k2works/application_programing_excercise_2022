
import {
  Fibonacci,
  FibonacciRecursive,
  FibonacciLoop,
  FibonacciGeneralTerm,
  FibonacciList,
} from "./App.js";

describe("フィボナッチ数列", () => {
  let fib;
  let recursive;
  let loop;
  let generalTerm;
  beforeEach(() => {
    fib = Fibonacci;
    recursive = new Fibonacci(new FibonacciRecursive());
    loop = new Fibonacci(new FibonacciLoop());
    generalTerm = new Fibonacci(new FibonacciGeneralTerm());
  });

  describe("正常ケース", () => {
    test.each([
      [0, 0],
      [1, 1],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 5],
    ])("%iを渡したら%pを返す", (number, expected) => {
      expect(recursive.exec(number)).toEqual(expected);
    });

    test("大きな数値を計算する(再起処理による実装)", () => {
      expect(recursive.exec(40)).toEqual(102334155);
    });

    test("大きな数値を計算する(ループ処理による実装)", () => {
      expect(loop.exec(40)).toEqual(102334155);
    });

    test("大きな数値を計算する(一般項による実装)", () => {
      expect(generalTerm.exec(40)).toEqual(102334155);
    });

    test("10までのフィボナッチ配列を返す", () => {
      const command = new Fibonacci(new FibonacciRecursive());
      const listCommand = new FibonacciList(command);
      const result = listCommand.exec(40);

      expect(result[0]).toEqual(0);
      expect(result[result.length - 1]).toEqual(102334155);
    });
  });

  describe("例外ケース", () => {
    test("マイナスの値はエラーを返す", () => {
      const result = () => {
        recursive.exec(-1);
      };
      expect(result).toThrow("マイナスの値は指定できません");
    });
  });
});
