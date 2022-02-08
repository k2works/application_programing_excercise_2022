import { Command } from "./command";

export class Fibonacci implements Command {
  private _algorithm: Command;

  constructor(algorithm: Command) {
    this._algorithm = algorithm;
  }

  exec(number: number): number {
    if (number < 0) throw new Error("マイナスの値は指定できません");
    if (number > 100) throw new Error("100以上は計算できません");
    return this._algorithm.exec(number);
  }
}
