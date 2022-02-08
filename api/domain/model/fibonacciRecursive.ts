import { Command } from "../../application/command";

export class FibonacciRecursive implements Command {
  exec(number: number, memo: bigint[] = []): bigint {
    if (memo[number]) return memo[number];
    if (number === 0) return BigInt(0);
    if (number === 1) return BigInt(1);
    memo[number] = this.exec(number - 1, memo) + this.exec(number - 2, memo);
    return memo[number];
  }
}
