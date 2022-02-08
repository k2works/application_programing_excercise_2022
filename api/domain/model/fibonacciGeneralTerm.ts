import { FibonacciAlgorithm } from "../../application/fibonacciAlgorithm";

export class FibonacciGenralTerm implements FibonacciAlgorithm {
  calc(number: number): bigint {
    let a: number = ((1 + Math.sqrt(5)) / 2) ** number;
    let b: number = ((1 - Math.sqrt(5)) / 2) ** number;
    const result: number = (a - b) / Math.sqrt(5);
    return BigInt(Math.round(result));
  }
}
