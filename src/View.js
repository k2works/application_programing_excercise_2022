import {
  Fibonacci,
  FibonacciRecursive,
  FibonacciLoop,
  FibonacciGeneralTerm,
  FibonacciList,
} from "./Model.js";

export class View {
  get MAX_COUNT() {
    return 100;
  }

  constructor() {
    this._command = new FibonacciList(new Fibonacci(new FibonacciRecursive()));
  }

  render() {
    const renderTable = (contents) => {
      document.getElementById("app-table").innerHTML = contents;
    };

    const select = this.createSelectComponent(renderTable);
    const list = this._command.exec(this.MAX_COUNT);
    const table = this.createTableComponent(list);
    const contents = `
      <div>
        <div id="app-select">
          ${select.contents}
        </div>
        <div id="app-table">
          ${table.contents}
        </div>
      </div>
    `;

    document.getElementById("app").innerHTML = contents;
    document
      .getElementById("app-select")
      .addEventListener("change", select.changeEvent);
  }

  createSelectComponent(render) {
    let list;
    const changeEvent = (e) => {
      const value = e.target.value;
      switch (value) {
        case "1":
          this._command = new FibonacciList(
            new Fibonacci(new FibonacciRecursive())
          );
          list = this._command.exec(this.MAX_COUNT);
          render(this.createTableComponent(list).contents);
          break;
        case "2":
          this._command = new FibonacciList(new Fibonacci(new FibonacciLoop()));
          list = this._command.exec(this.MAX_COUNT);
          render(this.createTableComponent(list).contents);
          break;
        case "3":
          this._command = new FibonacciList(
            new Fibonacci(new FibonacciGeneralTerm())
          );
          list = this._command.exec(this.MAX_COUNT);
          render(this.createTableComponent(list).contents);
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
  }

  createTableComponent(list) {
    const header = [...Array(10).keys()]
      .map((i) => `<td>${i + 1}</td>`)
      .join("");
    const body = [...Array(10).keys()]
      .map((i) => (i === 0 ? 0 : i * 10))
      .map((j) =>
        [...Array(10).keys()].map((k) => `<td>${list[k + j]}`).join("")
      );
    const contents = `
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

    return { contents };
  }
}