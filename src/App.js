console.log("App.js: loaded");
export class App {
  constructor() {
    document.getElementById("app").innerHTML = Fibonacci.recursive(40);
  }
}

export class Fibonacci {
  static recursive(number, memo = {}) {
    if (memo[number]) return memo[number];
    if (number === 0) return 0;
    if (number === 1) return 1;

    memo[number] =
      this.recursive(number - 1, memo) + this.recursive(number - 2, memo);
    return memo[number];
  }

  static loop(number) {
    let a = 0;
    let b = 1;
    let c = 0;
    for (let i = 0; i < number; i++) {
      a = b;
      b = c;
      c = a + b;
    }
    return c;
  }

  static generalTerm(number) {
    let a = ((1 + Math.sqrt(5)) / 2) ** number;
    let b = ((1 - Math.sqrt(5)) / 2) ** number;
    const result = (a - b) / Math.sqrt(5);
    return Math.round(result);
  }
}

export class FibonacciRecursive {
  exec(number, memo = []) {
    if (memo[number]) return memo[number];
    if (number === 0) return 0;
    if (number === 1) return 1;

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
    return c;
  }
}

export class FibonacciGeneralTerm {
  exec(number) {
    let a = ((1 + Math.sqrt(5)) / 2) ** number;
    let b = ((1 - Math.sqrt(5)) / 2) ** number;
    const result = (a - b) / Math.sqrt(5);
    return Math.round(result);
  }
}