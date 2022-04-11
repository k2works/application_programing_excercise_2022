import { Todo } from "./entity/Todo";

export enum Type {
  CREATE,
  READ,
  UPDATE,
  DELETE,
}

export type Params = {
  id?: number;
  title?: string;
  completed?: boolean;
  dueDate?: Date;
  completedAt?: Date;
  status?: string;
};

export class TodoService {
  execute(type: number, params: Params) {
    return new Promise((resolve: any, reject: any) => {
      if (type === Type.CREATE) {
        const todo = new Todo();
        todo.title = params.title ? params.title : "";
        todo.completed = false;
        todo.createdAt = new Date();
        todo.status = "未着手";
        todo
          .save()
          .then((result: Todo) => {
            resolve(result);
          })
          .catch((err: any) => {
            reject(err);
          });
      } else if (type === Type.READ) {
        Todo.find()
          .then((result: Todo[]) => {
            resolve(result);
          })
          .catch((err: any) => {
            reject(err);
          });
      } else if (type === Type.UPDATE) {
        const id = params.id;
        if (id) {
          Todo.findOneBy({ id }).then((result: Todo | null) => {
            if (result) {
              const dueDate = params.dueDate;
              if (dueDate) {
                const completedAt = params.completed ? null : new Date();
                const status = params.completed ? "完了" : "着手";
                result.completed = params.completed ? true : false;
                result.dueDate = dueDate;
                result.completedAt = completedAt;
                result.status = status;
                result
                  .save()
                  .then((result: any) => {
                    resolve(result);
                  })
                  .catch((err: any) => {
                    reject(err);
                  });
              } else {
                const completedAt = params.completed ? null : new Date();
                const status = params.completed ? "完了" : "着手";
                result.completed = params.completed ? true : false;
                result.completedAt = completedAt;
                result.status = status;
                result
                  .save()
                  .then((result: any) => {
                    resolve(result);
                  })
                  .catch((err: any) => {
                    reject(err);
                  });
              }
            }
          });
        }
      } else if (type === Type.DELETE) {
        const id = params.id;
        if (id) {
          Todo.findOneBy({ id }).then((result: Todo | null) => {
            if (result) {
              result
                .remove()
                .then((result: any) => {
                  resolve(result);
                })
                .catch((err: any) => {
                  reject(err);
                });
            }
          });
        } else {
          reject(new Error("Invalid type"));
        }
      }
    });
  }
}
