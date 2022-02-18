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

  postApi(url, data) {
    const service = (resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
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

  deleteApi(url, data) {
    const service = (resolve, reject) => {
      fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data }),
      })
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

  putApi(url, data) {
    const service = (resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
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
    return new Promise((resolve, reject) => {
      this.postApi(this._apiUrl + "/todo", data)
        .then((result) => {
          return resolve(result.message);
        })
        .catch((error) => {
          return reject(error);
        });
    });
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
    return new Promise((resolve, reject) => {
      this.getApi(`${this._apiUrl}/todo/${id}`)
        .then((result) => {
          return resolve(result.value);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.deleteApi(`${this._apiUrl}/todo`, id)
        .then((result) => {
          return resolve(result.message);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  save(data) {
    return new Promise((resolve, reject) => {
      this.putApi(`${this._apiUrl}/todo`, data)
        .then((result) => {
          return resolve(result.message);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  count() {
    return new Promise((resolve, reject) => {});
  }
}
