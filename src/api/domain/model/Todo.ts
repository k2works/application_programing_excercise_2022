import { CompletedAt } from "./CompletedAt";
import { CreatedAt } from "./CreatedAt";
import { DueDate } from "./DueDate";
import { Title } from "./Title";

/**
 * やること
 */
export class Todo {
  private title: Title;
  private completed: boolean;
  private createdAt: CreatedAt;
  private completedAt: CompletedAt;
  private dueDate: DueDate;
  private status: string;
  private id: number | null = null;

  get Title(): string {
    return this.title.Value;
  }

  get Completed(): boolean {
    return this.completed;
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

  get Status(): string {
    return this.status;
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
    status: string = "未着手",
    id: number | null = null
  ) {
    this.title = new Title(title);
    this.completed = completed;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.dueDate = dueDate;
    this.status = status;
    this.id = id;
  }

  public complete(): void {
    this.completed = true;
  }

  public overDue(): boolean {
    return this.dueDate.overDue();
  }

  public setDueDate(due: DueDate): Todo {
    const dueDate = due.Value;
    if (dueDate !== null) {
      if (this.createdAt.Value.getTime() > dueDate.getTime()) {
        throw new Error("開始日より前に期限を設定できません");
      }
    }

    return new Todo(
      this.title.Value,
      this.completed,
      this.createdAt,
      this.completedAt,
      due
    );
  }

  public equals(other: Todo): boolean {
    return (
      this.title.equals(other.title) &&
      this.completed === other.completed &&
      this.createdAt.equals(other.createdAt) &&
      this.completedAt.equals(other.completedAt) &&
      this.dueDate.equals(other.dueDate)
    );
  }
}