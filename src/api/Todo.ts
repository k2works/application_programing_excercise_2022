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

  constructor(
    title: string,
    completed: boolean = false,
    createdAt: CreatedAt = new CreatedAt(new Date()),
    completedAt: CompletedAt = new CompletedAt(null),
    dueDate: DueDate = new DueDate(null)
  ) {
    this.title = new Title(title);
    this.completed = completed;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.dueDate = dueDate;
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

  public overDue(): boolean {
    const due = this.Value;
    const today = new Date();
    if (due === null) {
      return false;
    }
    return today.getTime() > due.getTime();
  }
} 