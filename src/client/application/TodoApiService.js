import { TodoApiRepository } from "./TodoApiRepository";

export class TodoApiService {
  constructor(apiUrl) {
    this.repository = new TodoApiRepository(apiUrl);
  }

  createTodoItem(entity) {
    return new Promise((resolve, reject) => {
      resolve(this.repository.create(entity));
    }).catch((error) => {
      console.error(error);
    });
  }

  find(entity) {
    return new Promise((resolve, reject) => {
      resolve(this.repository.find(entity.id));
    }).catch((error) => {
      console.error(error);
    });
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      this.repository.selectAll().then((result) => resolve(result));
    }).catch((error) => {
      console.error(error);
    });
  }

  save(entity) {
    return new Promise((resolve, reject) => {
      this.repository.save(entity).then((result) => {
        resolve(result);
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  delete(entity) {
    return new Promise((resolve, reject) => {
      resolve(this.repository.delete(entity.id));
    }).catch((error) => {
      console.error(error);
    });
  }

  count() {
    return new Promise((resolve, reject) => {
      this.repository.count().then((result) => resolve(result));
    }).catch((error) => {
      console.error(error);
    });
  }
}
