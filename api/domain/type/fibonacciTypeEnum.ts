import { FibonacciGenralTerm } from "../model/fibonacciGeneralTerm";
import { FibonacciLoop } from "../model/fibonacciLoop";
import { FibonacciRecursive } from "../model/fibonacciRecursive";

export enum FibonacciType {
  Recursive = 1,
  Loop = 2,
  GeneralTerm = 3,
}

export namespace FibonacciTypeEnum {
  export function valueOf(value: FibonacciType) {
    switch (value) {
      case FibonacciType.Recursive:
        return new FibonacciRecursive();
      case FibonacciType.Loop:
        return new FibonacciLoop();
      case FibonacciType.GeneralTerm:
        return new FibonacciGenralTerm();
      default:
        throw new Error("該当するアルゴリズムが存在しません");
    }
  }
}
