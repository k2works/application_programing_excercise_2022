import { Command } from "./command";
import { FibonacciAlgorithm } from "./fibonacciAlgorithm";

export class Fibonacci implements Command {
  private _algorithm: FibonacciAlgorithm;

  constructor(algorithm: FibonacciAlgorithm) {
    this._algorithm = algorithm;
  }

  exec(number: number): bigint {
    if (number < 0) throw new Error("マイナスの値は指定できません");
    if (number > 100) throw new Error("100以上は計算できません");
    return this._algorithm.calc(number);
  }
}
