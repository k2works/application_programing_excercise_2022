
import { Fibonacci } from "./App.js";

describe("フィボナッチ数列", () => {
  test("挨拶する", () => {
    expect(Fibonacci.greeting()).toEqual("hello world");
  });
});
