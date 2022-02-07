console.log("App.js: loaded");
export class App {
  constructor() {
    document.getElementById("app").innerHTML = Fibonacci.calc(40);
  }
}

export class Fibonacci {
  static calc(number, memo = {}) {
    if (memo[number]) return memo[number];
    if (number === 0) return 0;
    if (number === 1) return 1;

    memo[number] = this.calc(number - 1, memo) + this.calc(number - 2, memo);
    return memo[number];
  }

  static calc2(number) {
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

  static calc3(number) {
    let a = ((1 + Math.sqrt(5)) / 2) ** number;
    let b = ((1 - Math.sqrt(5)) / 2) ** number;
    const result = (a - b) / Math.sqrt(5);
    return Math.round(result);
  }
}
