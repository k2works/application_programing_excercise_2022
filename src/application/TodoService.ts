export const Type = {
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
};

export class TodoService {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  execute(type: number, params: any) {
    return new Promise((resolve: any, reject: any) => {
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
            this.db.getTodos().then((todos: any) => {
              resolve(todos);
            });
          })
          .catch((error: any) => {
            reject(error);
          });
      } else if (type === Type.READ) {
        this.db
          .getTodos()
          .then((todos: any) => {
            resolve(todos);
          })
          .catch((error: any) => {
            reject(error);
          });
      } else if (type === Type.UPDATE) {
        this.db
          .getTodo(params.id)
          .then((todo: any) => {
            todo.completed = params.completed;
            todo.dueDate = params.dueDate;
            todo.completedAt = params.completedAt;
            todo.status = params.status;
            this.db.updateTodo(todo).then(() => {
              this.db.getTodos().then((todos: any) => {
                resolve(todos);
              });
            });
          })
          .catch((error: any) => {
            reject(error);
          });
      } else if (type === Type.DELETE) {
        this.db
          .deleteTodo(params.id)
          .then(() => {
            this.db.getTodos().then((todos: any) => {
              resolve(todos);
            });
          })
          .catch((error: any) => {
            reject(error);
          });
      } else {
        reject(new Error("Invalid type"));
      }
    });
  }
}
