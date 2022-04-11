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

interface Command {
  execute(params: Params): Promise<Todo[] | void>;
}

class CreateCommand implements Command {
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

class ReadCommand implements Command {
  private type: Type;

  constructor(type: Type) {
    this.type = type;
  }
  async execute(params: Params): Promise<Todo[] | void> {
    return await Todo.find();
  }
}

class UpdateCommand implements Command {
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

class DeleteCommand implements Command {
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
