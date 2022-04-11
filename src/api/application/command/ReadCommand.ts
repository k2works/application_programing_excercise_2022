import { Todo } from "../../entity/Todo";
import { Command } from "./Command";
import { Params, Type } from "../TodoService";

export class ReadCommand implements Command {
  private type: Type;

  constructor(type: Type) {
    this.type = type;
  }
  async execute(params: Params): Promise<Todo[] | void> {
    return await Todo.find();
  }
}
