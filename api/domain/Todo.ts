import { CompletedAt } from "./CompletedAt";
import { CreatedAt } from "./CreatedAt";
import { DueDate } from "./DueDate";
import { Title } from "./Title";

export class Todo {
  private title: Title;
  private completed: boolean;
  private createdAt: CreatedAt;
  private completedAt: CompletedAt;
  private dueDate: DueDate;
  private id: number | null;

  getTitle(): string {
    return this.title.getValue();
  }

  getCompleted(): boolean {
    return this.completed;
  }

  getCreatedAt(): Date {
    return this.createdAt.getValue();
  }

  getCompletedAt(): Date | null {
    return this.completedAt?.getValue();
  }

  getDueDate(): Date | null {
    return this.dueDate?.getValue();
  }

  getId(): number | null {
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
    this.completed = completed;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.dueDate = dueDate;
    this.id = id;
  }

  public complete(): void {
    this.completed = true;
    this.completedAt = new CompletedAt(new Date());
  }

  public overDue(): boolean {
    return this.dueDate.overDue();
  }

  public setDueDate(due: DueDate): Todo {
    const dueDate = due.getValue();
    if (dueDate !== null) {
      if (this.createdAt.getValue().getTime() > dueDate.getTime())
        throw new Error("開始日より前に期限が設定されています");
    }

    return new Todo(
      this.title.getValue(),
      this.completed,
      this.createdAt,
      this.completedAt,
      due
    );
  }

  public equals(other: Todo): boolean {
    return (
      this.title.equals(other.title) &&
      this.completed == other.completed &&
      this.createdAt.equals(other.createdAt) &&
      this.completedAt?.equals(other.completedAt) &&
      this.dueDate?.equals(other.dueDate)
    );
  }
}
