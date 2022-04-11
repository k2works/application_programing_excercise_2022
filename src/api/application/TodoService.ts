import { Command } from "./command/Command";
import { CreateCommand } from "./command/CreateCommand";
import { DeleteCommand } from "./command/DeleteCommand";
import { ReadCommand } from "./command/ReadCommand";
import { UpdateCommand } from "./command/UpdateCommand";

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
  private command: Command;

  constructor(type: Type) {
    switch (type) {
      case Type.CREATE:
        this.command = new CreateCommand(type);
        break;
      case Type.READ:
        this.command = new ReadCommand(type);
        break;
      case Type.UPDATE:
        this.command = new UpdateCommand(type);
        break;
      case Type.DELETE:
        this.command = new DeleteCommand(type);
        break;
      default:
        throw new Error("Invalid type");
    }
  }

  async execute(params: Params) {
    return await this.command.execute(params);
  }
}
