import { CompletedAt } from "./CompletedAt";
import { CreatedAt } from "./CreatedAt";
import { DueDate } from "./DueDate";
import { Title } from "./Title";

export class Todo {
  private title: Title;
  private isCompleted: boolean;
  private createdAt: CreatedAt;
  private completedAt: CompletedAt;
  private dueDate: DueDate;
  private isOverDue: boolean;
  private id: number | null = null;
  private status: TodoStatus;

  get Title(): string {
    return this.title.Value;
  }

  get Completed(): boolean {
    return this.isCompleted;
  }

  get OverDue(): boolean {
    return this.isOverDue;
  }

  get CreatedAt(): Date {
    return this.createdAt.Value;
  }

  get CompletedAt(): Date | null {
    return this.completedAt.Value;
  }

  get DueDate(): Date | null {
    return this.dueDate.Value;
  }

  get Id(): number | null {
    return this.id;
  }

  get Status(): string {
    return this.status.Value;
  }

  constructor(
    title: string,
    completed: boolean = false,
    createdAt: CreatedAt = new CreatedAt(new Date()),
    completedAt: CompletedAt = new CompletedAt(null),
    dueDate: DueDate = new DueDate(null),
    id: number | null = null
  ) {
    this.title = new Title(title);
    this.isCompleted = completed;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.dueDate = dueDate;
    this.isOverDue = this.overDue();
    this.id = id;
    this.status = TodoStatus.create(this);
  }

  public complete(): Todo {
    return new Todo(
      this.title.Value,
      true,
      this.createdAt,
      new CompletedAt(new Date()),
      this.dueDate,
      this.Id
    );
  }

  public overDue(): boolean {
    return this.dueDate.overDue();
  }

  public setDueDate(due: DueDate): Todo {
    if (due.overDue(this.createdAt.Value))
      throw new Error("開始日より前に期限を設定できません");

    return new Todo(
      this.title.Value,
      this.isCompleted,
      this.createdAt,
      this.completedAt,
      due,
      this.Id
    );
  }

  public equals(other: Todo): boolean {
    return (
      this.title.equals(other.title) &&
      this.isCompleted === other.isCompleted &&
      this.createdAt.equals(other.createdAt) &&
      this.completedAt.equals(other.completedAt) &&
      this.dueDate.equals(other.dueDate)
    );
  }
}

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

export enum TodoStatusType {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}
export namespace TodoStatusTypeEnum {
  export function valueOf(value: TodoStatusType): TodoStatus {
    switch (value) {
      case TodoStatusType.NOT_STARTED:
        return new NotStarted();
      case TodoStatusType.IN_PROGRESS:
        return new InProgress();
      case TodoStatusType.COMPLETED:
        return new Completed();
      default:
        return new Undefined();
    }
  }
}
