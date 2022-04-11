import { Todo } from "../../entity/Todo";
import { Command } from "./Command";
import { Params, Type } from "../TodoService";

export class UpdateCommand implements Command {
  private type: Type;

  constructor(type: Type) {
    this.type = type;
  }
  async execute(params: Params): Promise<Todo[] | void> {
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
        } else {
          const completedAt = params.completed ? null : new Date();
          const status = params.completed ? "完了" : "着手";
          result.completed = params.completed ? true : false;
          result.completedAt = completedAt;
          result.status = status;
          await result.save();
        }
      }
    }
  }
}
