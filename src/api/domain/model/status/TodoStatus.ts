import { Todo } from "../todo/Todo";
import { TodoStatusTypeEnum, TodoStatusType } from "../../type/TodoStatusType";
import { Status } from "./Status";

/**
 * @module
 * ステータス
 */

/**
 * やることステータス
 */
export abstract class TodoStatus implements Status {
  protected value: string;
  protected type: string;
  protected code: string;

  constructor() {
    this.value = "";
    this.type = "TODO";
    this.code = "";
  }

  get Value(): string {
    return this.value;
  }

  get Type(): string {
    return this.type;
  }

  get Code(): string {
    return this.code;
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

/**
 * 未着手ステータス
 */
export class NotStarted extends TodoStatus {
  constructor() {
    super();
    this.value = "未着手";
    this.code = TodoStatusType.NOT_STARTED.toString();
  }
}

/**
 * 着手ステータス
 */
export class InProgress extends TodoStatus {
  constructor() {
    super();
    this.value = "着手";
    this.code = TodoStatusType.IN_PROGRESS.toString();
  }
}

/**
 * 完了ステータス
 */
export class Completed extends TodoStatus {
  constructor() {
    super();
    this.value = "完了";
    this.code = TodoStatusType.COMPLETED.toString();
  }
}

/**
 * ステータス未定義
 */
export class Undefined extends TodoStatus {
  constructor() {
    super();
    this.value = "未定義";
    this.code = TodoStatusType.UNDEFINED.toString();
  }
}
