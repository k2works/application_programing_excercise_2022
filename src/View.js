export class View {
  get MAX_COUNT() {
    return 100;
  }

  constructor(params) {
    this._apiUrl = params.apiUrl;
  }

  fetchApi(url) {
    const service = (resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    };
    return new Promise(service);
  }

  render() {
    const renderTable = (contents) => {
      document.getElementById("app-table").innerHTML = contents;
    };

    const select = this.createSelectComponent(renderTable);
    this.fetchApi(this._apiUrl).then((list) => {
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
    });
  }

  createSelectComponent(render) {
    const changeEvent = (e) => {
      const value = e.target.value;
      this.fetchApi(`${this._apiUrl}/${value}`).then((list) => {
        render(this.createTableComponent(list).contents);
      });
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
