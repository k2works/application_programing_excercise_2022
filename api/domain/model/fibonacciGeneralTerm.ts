import { Command } from "../../application/command";

export class FibonacciGenralTerm implements Command {
  exec(number: number): bigint {
    let a: number = ((1 + Math.sqrt(5)) / 2) ** number;
    let b: number = ((1 - Math.sqrt(5)) / 2) ** number;
    const result: number = (a - b) / Math.sqrt(5);
    return BigInt(Math.round(result));
  }
}
