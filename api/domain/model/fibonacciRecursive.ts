import { FibonacciAlgorithm } from "../../application/fibonacciAlgorithm";

export class FibonacciRecursive implements FibonacciAlgorithm {
  calc(number: number, memo: bigint[] = []): bigint {
    if (memo[number]) return memo[number];
    if (number === 0) return BigInt(0);
    if (number === 1) return BigInt(1);
    memo[number] = this.calc(number - 1, memo) + this.calc(number - 2, memo);
    return memo[number];
  }
}
