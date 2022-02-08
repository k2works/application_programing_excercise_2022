export class FibonacciList {
  constructor(command) {
    this._command = command;
  }

  exec(count) {
    return [...Array(count).keys()].map((i) => this._command.exec(i + 1));
  }
}

export class Fibonacci {
  constructor(algorithm) {
    this._algorithm = algorithm;
  }

  exec(number) {
    if (number < 0) throw new Error("マイナスの値は指定できません");
    return this._algorithm.exec(number);
  }
}

export class FibonacciRecursive {
  exec(number, memo = []) {
    if (memo[number]) return memo[number];
    if (number === 0) return BigInt(0);
    if (number === 1) return BigInt(1);

    memo[number] = this.exec(number - 1, memo) + this.exec(number - 2, memo);
    return memo[number];
  }
}

export class FibonacciLoop {
  exec(number) {
    let a = 0;
    let b = 1;
    let c = 0;
    for (let i = 0; i < number; i++) {
      a = b;
      b = c;
      c = a + b;
    }
    return BigInt(c);
  }
}

export class FibonacciGeneralTerm {
  exec(number) {
    let a = ((1 + Math.sqrt(5)) / 2) ** number;
    let b = ((1 - Math.sqrt(5)) / 2) ** number;
    const result = (a - b) / Math.sqrt(5);
    return BigInt(Math.round(result));
  }
}
