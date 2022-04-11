import { Todo } from "../../infrastructure/entity/Todo";
import { Command } from "./Command";
import { Params, Type } from "../TodoService";

export class DeleteCommand implements Command {
  private type: Type;

  constructor(type: Type) {
    this.type = type;
  }

  async execute(params: Params): Promise<Todo[] | void> {
    const id = params.id;
    if (id) {
      const resutl = await Todo.findOneBy({ id });
      if (resutl) {
        await resutl.remove();
      }
    }
  }
}
