console.log("App.js: loaded");
export class App {
  constructor() {
    this._command = new FibonacciList(new Fibonacci(new FibonacciRecursive()));
    this._list = this._command.exec(100);

    const select = (render, table) => {
      let list;
      let command;
      const changeEvent = (e) => {
        const value = e.target.value;
        switch (value) {
          case "1":
            command = new FibonacciList(
              new Fibonacci(new FibonacciRecursive())
            );
            list = command.exec(100);
            render(table(list));
            break;
          case "2":
            command = new FibonacciList(new Fibonacci(new FibonacciLoop()));
            list = this._command.exec(100);
            render(table(list));
            break;
          case "3":
            command = new FibonacciList(
              new Fibonacci(new FibonacciGeneralTerm())
            );
            list = this._command.exec(100);
            render(table(list));
            break;
          default:
            throw new Error("該当するアルゴリズムが存在しません");
        }
      };

      const contents = `
        <select id="app-select">
          <option value="1">再帰</option>
          <option value="2">ループ</option>
          <option value="3">一般項</option>
        </select>
      `;

      return { contents, changeEvent };
    };

    const table = (list) => {
      const header = [...Array(10).keys()]
        .map((i) => `<td>${i + 1}</td>`)
        .join("");
      const body = [...Array(10).keys()]
        .map((i) => (i === 0 ? 0 : i * 10))
        .map((j) =>
          [...Array(10).keys()].map((k) => `<td>${list[k + j]}`).join("")
        );
      return `
        <table>
          <thead bgcolor="darkgray">
           <tr>
            ${header}
           </tr>
          </thead>
          <thead></thead>
          <tbody bgcolor="ivory">
            <tr>${body[0]}</t>
            <tr>${body[1]}</t>
            <tr>${body[2]}</t>
            <tr>${body[3]}</t>
            <tr>${body[4]}</t>
            <tr>${body[5]}</t>
            <tr>${body[6]}</t>
            <tr>${body[7]}</t>
            <tr>${body[8]}</t>
            <tr>${body[9]}</t>
          </tbody>
        </table>
      `;
    };

    const renderTable = (contents) => {
      document.getElementById("app-table").innerHTML = contents;
    };

    const contents = `
      <div>
      ${select(table).contents}
      <div id="app-table">
        ${table(this._list)}
      </div>
      </div>
    `;
    document.getElementById("app").innerHTML = contents;
    document
      .getElementById("app-select")
      .addEventListener("change", select(renderTable, table).changeEvent);
  }
}

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