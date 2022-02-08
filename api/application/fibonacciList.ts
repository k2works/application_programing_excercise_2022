import { Command } from "./command";

export class FibonacciList implements Command {
  private _command: Command;

  constructor(command: Command) {
    this._command = command;
  }

  exec(number: number): number[] {
    return [...Array(number)].map((_, i: number) => this._command.exec(i + 1));
  }
}
