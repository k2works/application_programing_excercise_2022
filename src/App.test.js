
import { Fibonacci } from "./App.js";

describe("フィボナッチ数列", () => {
  let fib;
  beforeEach(() => {
    fib = Fibonacci;
  });

  test.each([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 5],
  ])("%iを渡したら%pを返す", (number, expected) => {
    expect(fib.recursive(number)).toEqual(expected);
  });

  test("大きな数値を計算する(再起処理による実装)", () => {
    expect(fib.recursive(40)).toEqual(102334155);
  });

  test("大きな数値を計算する(ループ処理による実装)", () => {
    expect(fib.loop(40)).toEqual(102334155);
  });

  test("大きな数値を計算する(一般項による実装)", () => {
    expect(fib.generalTerm(40)).toEqual(102334155);
  });
});
