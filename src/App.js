console.log("App.js: loaded");
export class App {
  constructor() {
    document.getElementById("app").innerHTML = Fibonacci.greeting();
  }
}

export class Fibonacci {
  static greeting() {
    return "hello world";
  }
}
