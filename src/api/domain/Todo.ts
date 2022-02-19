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
