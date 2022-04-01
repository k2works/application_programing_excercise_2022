import { TodoItemModel } from "../model/TodoItemModel";

export const Type = {
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
};

export class TodoService {
  constructor(db) {
    this.db = db;
  }

  execute(type, params) {
    return new Promise((resolve, reject) => {
      if (type === Type.CREATE) {
        const title = params.title;
        const todo = new TodoItemModel({ title, completed: false });
        this.db
          .addTodo(new TodoItemModel(todo))
          .then(() => {
            this.db.getTodos().then((todos) => {
              resolve(todos);
            });
          })
          .catch((error) => {
            reject(error);
          });
      } else if (type === Type.READ) {
        this.db
          .getTodos()
          .then((todos) => {
            resolve(todos);
          })
          .catch((error) => {
            reject(error);
          });
      } else if (type === Type.UPDATE) {
        this.db
          .getTodo(params.id)
          .then((todo) => {
            todo.completed = params.completed;
            this.db.updateTodo(todo).then(() => {
              this.db.getTodos().then((todos) => {
                resolve(todos);
              });
            });
          })
          .catch((error) => {
            reject(error);
          });
      } else if (type === Type.DELETE) {
        this.db
          .deleteTodo(params.id)
          .then(() => {
            this.db.getTodos().then((todos) => {
              resolve(todos);
            });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error("Invalid type"));
      }
    });
  }
}
