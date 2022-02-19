import { Todo } from "./Todo";
import { TodoStatusTypeEnum, TodoStatusType } from "./type/TodoStatusType";

export abstract class TodoStatus {
  protected value: string;
  protected type: string;

  constructor() {
    this.value = "";
    this.type = "TODO";
  }

  get Value(): string {
    return this.value;
  }

  get Type(): string {
    return this.type;
  }

  public static create(todo: Todo) {
    if (todo.Completed) {
      return TodoStatusTypeEnum.valueOf(TodoStatusType.COMPLETED);
    } else if (todo.DueDate) {
      return TodoStatusTypeEnum.valueOf(TodoStatusType.IN_PROGRESS);
    } else {
      return TodoStatusTypeEnum.valueOf(TodoStatusType.NOT_STARTED);
    }
  }
}

export class NotStarted extends TodoStatus {
  constructor() {
    super();
    this.value = "未着手";
  }
}

export class InProgress extends TodoStatus {
  constructor() {
    super();
    this.value = "進行中";
  }
}

export class Completed extends TodoStatus {
  constructor() {
    super();
    this.value = "完了";
  }
}

export class Undefined extends TodoStatus {
  constructor() {
    super();
    this.value = "未定義";
  }
}
