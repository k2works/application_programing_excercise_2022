export class TodoApiRepository {
  constructor(apiUrl = "http://localhost:3000/api") {
    this._apiUrl = apiUrl;
  }

  getApi(url) {
    const service = (resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          return resolve(json);
        })
        .catch((error) => {
          return reject(error);
        });
    };
    return new Promise(service);
  }

  create(data) {
    return new Promise((resolve, reject) => {});
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      this.getApi(this._apiUrl + "/todos")
        .then((result) => {
          return resolve(result.value);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {});
  }

  delete(id) {
    return new Promise((resolve, reject) => {});
  }

  save(data) {
    return new Promise((resolve, reject) => {});
  }

  count() {
    return new Promise((resolve, reject) => {});
  }
}
