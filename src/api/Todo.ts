/**
 * やること
 */
export class Todo {
  private title: Title;
  private completed: boolean;
  private createdAt: CreatedAt;
  private completedAt: CompletedAt;
  private dueDate: DueDate;

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

  set DueDate(date: Date | null) {
    this.dueDate = new DueDate(date);
  }

  constructor(title: string) {
    this.title = new Title(title);
    this.completed = false;
    this.createdAt = new CreatedAt(new Date());
    this.completedAt = new CompletedAt(null);
    this.dueDate = new DueDate(null);
  }

  public complete(): void {
    this.completed = true;
  }

  public overDue(): boolean {
    const due = this.dueDate.Value;
    if (due === null) {
      return false;
    }
    return this.createdAt.Value.getTime() > due.getTime();
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

/**
 * タイトル
 */
export class Title {
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
/**
 * 作成日
 */
export class CreatedAt {
  private value: Date;

  get Value(): Date {
    return this.value;
  }

  constructor(value: Date) {
    this.value = value;
  }

  public equals(createdAt: CreatedAt): boolean {
    return this.value.getTime() === createdAt.Value.getTime();
  }
}
/**
 * 完了日
 */
export class CompletedAt {
  private value: Date | null;

  get Value(): Date | null {
    return this.value;
  }

  constructor(value: Date | null) {
    this.value = value;
  }

  public equals(completedAt: CompletedAt): boolean {
    return this.value?.getTime() === completedAt.Value?.getTime();
  }
}
/**
 * 期限
 */
export class DueDate {
  private value: Date | null;

  get Value(): Date | null {
    return this.value;
  }

  constructor(value: Date | null) {
    this.value = value;
  }

  public equals(dueDate: DueDate): boolean {
    return this.value?.getTime() === dueDate.Value?.getTime();
  }
}
