console.log("App.js: loaded");
export class App {
  constructor() {
    document.getElementById("app").innerHTML = Fibonacci.fib(3);
  }
}

export class Fibonacci {
  static fib(n) {
    if (n === 0) return 0;
    if (n <= 2) return 1;

    return 2;
  }
}
