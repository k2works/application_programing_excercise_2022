console.log("App.js: loaded");
export class App {
  constructor() {
    document.getElementById("app").innerHTML = Fibonacci.calc(5);
  }
}

export class Fibonacci {
  static calc(number) {
    if (number === 0) return 0;
    if (number === 1) return 1;

    return this.calc(number - 1) + this.calc(number - 2);
  }
}
