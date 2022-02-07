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
}
