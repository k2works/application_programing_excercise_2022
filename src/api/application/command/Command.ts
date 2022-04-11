import { Todo } from "../../infrastructure/entity/Todo";
import { Params } from "../TodoService";

export interface Command {
  execute(params: Params): Promise<Todo[] | void>;
}
