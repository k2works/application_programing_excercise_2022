import { FibonacciAlgorithm } from "../../application/fibonacciAlgorithm";

export class FibonacciLoop implements FibonacciAlgorithm {
  calc(number: number): bigint {
    let a: number = 0;
    let b: number = 1;
    let c: number = 0;
    for (let i = 0; i < number; i++) {
      a = b;
      b = c;
      c = a + b;
    }
    return BigInt(c);
  }
}
