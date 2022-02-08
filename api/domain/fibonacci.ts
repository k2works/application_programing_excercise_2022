export interface Command {
  exec(number: number): number;
}

export class Fibonacci implements Command {
  private _algorithm;

  constructor(algorithm: Command) {
    this._algorithm = algorithm;
  }

  exec(number: number): number {
    if (number < 0) throw new Error("マイナスの値は指定できません");
    return this._algorithm.exec(number);
  }
}

export class FibonacciRecursive implements Command {
  exec(number: number, memo: number[] = []): number {
    if (memo[number]) return memo[number];
    if (number === 0) return 0;
    if (number === 1) return 1;
    memo[number] = this.exec(number - 1) + this.exec(number - 2);
    return memo[number];
  }
}

export class FibonacciLoop implements Command {
  exec(number: number): number {
    let a: number = 0;
    let b: number = 1;
    let c: number = 0;
    for (let i = 0; i < number; i++) {
      a = b;
      b = c;
      c = a + b;
    }
    return c;
  }
}

export class FibonacciGenralTerm implements Command {
  exec(number: number): number {
    let a: number = ((1 + Math.sqrt(5)) / 2) ** number;
    let b: number = ((1 - Math.sqrt(5)) / 2) ** number;
    const result: number = (a - b) / Math.sqrt(5);
    return Math.round(result);
  }
}
