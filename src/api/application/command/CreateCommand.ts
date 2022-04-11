import { Todo } from "../../infrastructure/entity/Todo";
import { Command } from "./Command";
import { Params, Type } from "../TodoService";

export class CreateCommand implements Command {
  private type: Type;

  constructor(type: Type) {
    this.type = type;
  }
  async execute(params: Params): Promise<Todo[] | void> {
    const todo = new Todo();
    todo.title = params.title ? params.title : "";
    todo.completed = false;
    todo.createdAt = new Date();
    todo.status = "未着手";
    await todo.save();
  }
}
