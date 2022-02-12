export class Todo {
  private title: Title;
  private completed: boolean;
  private createdAt: Date;
  private completedAt: Date | null;
  private dueDate: Date | null;

  getTitle(): string {
    return this.title.getValue();
  }

  getCompleted(): boolean {
    return this.completed;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getCompletedAt(): Date | null {
    return this.completedAt;
  }

  getDueDate(): Date | null {
    return this.dueDate;
  }

  setDueDate(due: Date) {
    this.dueDate = due;
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
    this.completedAt = new Date();
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
      this.createdAt == other.createdAt &&
      this.completedAt == other.completedAt &&
      this.dueDate == other.dueDate
    );
  }
}

class Title {
  private value: string;

  public getValue(): string {
    return this.value;
  }

  constructor(value: string) {
    this.value = value;
  }

  public equals(title: Title): boolean {
    return this.value === title.getValue();
  }
}
