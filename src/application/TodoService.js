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
        const todo = {
          title: params.title,
          completed: params.completed,
          dueDate: params.dueDate,
          createdAt: params.createdAt,
          status: params.status,
        };
        this.db
          .addTodo(todo)
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
            todo.dueDate = params.dueDate;
            todo.completedAt = params.completedAt;
            todo.status = params.status;
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