export class Todo {
  private title: Title;
  private completed: boolean;
  private createdAt: Date;
  private completedAt: Date | null;
  private dueDate: Date | null;

  get Title(): string {
    return this.title.Value;
  }

  get Completed(): boolean {
    return this.completed;
  }

  get CreatedAt(): Date {
    return this.createdAt;
  }

  get CompletedAt(): Date | null {
    return this.completedAt;
  }

  get DueDate(): Date | null {
    return this.dueDate;
  }

  set DueDate(date: Date | null) {
    this.dueDate = date;
  }

  constructor(title: string) {
    this.title = new Title(title);
    this.completed = false;
    this.createdAt = new Date();
    this.completedAt = null;
    this.dueDate = null;
  }

  public complete(): void {
    this.completed = true;
  }

  public overDue(): boolean {
    if (this.dueDate === null) {
      return false;
    }
    return this.createdAt.getTime() > this.dueDate.getTime();
  }

  public equals(other: Todo): boolean {
    return (
      this.title.equals(other.title) &&
      this.completed === other.completed &&
      this.createdAt === other.createdAt &&
      this.completedAt === other.completedAt &&
      this.dueDate === other.dueDate
    );
  }
}

/**
 * タイトル
 */
class Title {
  private value: string;

  get Value(): string {
    return this.value;
  }

  constructor(value: string) {
    this.value = value;
  }

  public equals(other: Title): boolean {
    return this.Value === other.Value;
  }
}
