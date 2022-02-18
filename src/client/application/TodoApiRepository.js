export class TodoApiRepository {
  constructor(apiUrl = "http://localhost:3000/api") {
    this._apiUrl = apiUrl;
  }

  create(data) {
    return new Promise((resolve, reject) => {});
  }

  selectAll() {
    return new Promise((resolve, reject) => {});
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
