import { CompletedAt } from "./CompletedAt";
import { CreatedAt } from "./CreatedAt";
import { DueDate } from "./DueDate";
import { Title } from "./Title";
import { TodoStatus } from "./TodoStatus";

/**
 * やること
 */
export class Todo {
  private title: Title;
  private isCompleted: boolean;
  private createdAt: CreatedAt;
  private completedAt: CompletedAt;
  private dueDate: DueDate;
  private isOverDue: boolean;
  private status: TodoStatus;
  private id: number | null = null;

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
    return this.completedAt.Value;
  }

  get DueDate(): Date | null {
    return this.dueDate.Value;
  }

  get OverDue(): boolean {
    return this.isOverDue;
  }

  get Status(): string {
    return this.status.Value;
  }

  get Id(): number | null {
    return this.id;
  }

  get StatusCode(): string {
    return this.status.Code;
  }

  get StatusType(): string {
    return this.status.Type;
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
    this.status = TodoStatus.create(this);
    this.isOverDue = dueDate.overDue();
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

  public setDueDate(due: DueDate): Todo {
    if (due.overDue(this.createdAt.Value))
      throw new Error("開始日より前に期限を設定できません");

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
      this.isCompleted === other.isCompleted &&
      this.createdAt.equals(other.createdAt) &&
      this.completedAt.equals(other.completedAt) &&
      this.dueDate.equals(other.dueDate) &&
      this.status.Value === other.status.Value &&
      this.id === other.id
    );
  }
}
