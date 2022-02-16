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
  private id: number | null;
  private status: TodoStatus;

  get Title(): string {
    return this.title.Value;
  }

  get Completed(): boolean {
    return this.isCompleted;
  }

  get CreatedAt(): Date {
    return this.createdAt.Value;
  }

  get CompletedAt(): Date | null {
    return this.completedAt?.Value;
  }

  get DueDate(): Date | null {
    return this.dueDate?.Value;
  }

  get Id(): number | null {
    return this.id;
  }

  get Status(): string {
    return this.status.Value;
  }

  get StatusCode(): string {
    return this.status.Code.toString();
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
    this.id = id;
    this.isOverDue = this.overDue();
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
    const dueDate = due.Value;
    if (dueDate !== null) {
      const otherDay = new Date(dueDate);
      if (this.createdAt.Value.getTime() > otherDay.getTime())
        throw new Error("開始日より前に期限が設定されています");
    }

    return new Todo(
      this.title.Value,
      this.isCompleted,
      this.createdAt,
      this.completedAt,
      due,
      this.id
    );
  }

  public equals(other: Todo): boolean {
    return (
      this.title.equals(other.title) &&
      this.isCompleted == other.isCompleted &&
      this.createdAt.equals(other.createdAt) &&
      this.completedAt?.equals(other.completedAt) &&
      this.dueDate?.equals(other.dueDate)
    );
  }
}

export class TodoList {
  private value: Todo[];

  get Value() {
    return this.value;
  }

  constructor(value: Todo[] = []) {
    this.value = value;
  }

  add(todo: Todo): TodoList {
    return new TodoList(this.value.map((t) => t).concat(todo));
  }
}

export abstract class TodoStatus {
  protected value: string;
  protected code: number;

  constructor() {
    this.value = "";
    this.code = TodoType.UNDEFINED;
  }
  get Value(): string {
    return this.value;
  }

  get Code(): number {
    return this.code;
  }

  public static create(todo: Todo) {
    if (todo.Completed) {
      return TodoTypeEnum.valueOf(3);
    } else if (todo.DueDate) {
      return TodoTypeEnum.valueOf(2);
    } else {
      return TodoTypeEnum.valueOf(1);
    }
  }
}

export class NotStarted extends TodoStatus {
  protected value: string;
  constructor() {
    super();
    this.value = "未着手";
    this.code = TodoType.NOT_STARTED;
  }
  get Value(): string {
    return this.value;
  }
}

export class InProgress extends TodoStatus {
  protected value: string;
  constructor() {
    super();
    this.value = "進行中";
    this.code = TodoType.IN_PROGRESS;
  }

  get Value(): string {
    return this.value;
  }
}

export class Completed extends TodoStatus {
  protected value: string;
  constructor() {
    super();
    this.value = "完了";
    this.code = TodoType.COMPLETED;
  }

  get Value(): string {
    return this.value;
  }
}

export class Undefined extends TodoStatus {
  protected value: string;
  constructor() {
    super();
    this.value = "未定義";
  }

  get Value(): string {
    return this.value;
  }
}

export enum TodoType {
  UNDEFINED = 0,
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export namespace TodoTypeEnum {
  export function valueOf(value: TodoType): TodoStatus {
    switch (value) {
      case TodoType.NOT_STARTED:
        return new NotStarted();
      case TodoType.IN_PROGRESS:
        return new InProgress();
      case TodoType.COMPLETED:
        return new Completed();
      default:
        return new Undefined();
    }
  }
}