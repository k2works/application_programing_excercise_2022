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
    return new Promise(async (resolve: any, reject: any) => {
      if (type === Type.CREATE) {
        const todo = new Todo();
        todo.title = params.title ? params.title : "";
        todo.completed = false;
        todo.createdAt = new Date();
        todo.status = "未着手";
        const result = await todo.save();
        resolve(result);
      } else if (type === Type.READ) {
        const result = await Todo.find();
        resolve(result);
      } else if (type === Type.UPDATE) {
        const id = params.id;
        if (id) {
          const result = await Todo.findOneBy({ id });
          if (result) {
            const dueDate = params.dueDate;
            if (dueDate) {
              const completedAt = params.completed ? null : new Date();
              const status = params.completed ? "完了" : "着手";
              result.completed = params.completed ? true : false;
              result.dueDate = dueDate;
              result.completedAt = completedAt;
              result.status = status;
              await result.save();
              resolve();
            } else {
              const completedAt = params.completed ? null : new Date();
              const status = params.completed ? "完了" : "着手";
              result.completed = params.completed ? true : false;
              result.completedAt = completedAt;
              result.status = status;
              await result.save();
              resolve();
            }
          }
        }
      } else if (type === Type.DELETE) {
        const id = params.id;
        if (id) {
          const resutl = await Todo.findOneBy({ id });
          if (resutl) {
            await resutl.remove();
            resolve();
          }
        } else {
          reject(new Error("Invalid type"));
        }
      }
    });
  }
}
