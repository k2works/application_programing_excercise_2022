export class Todo {
  private title: Title;
  private completed: boolean;
  private createdAt: CreatedAt;
  private completedAt: CompletedAd;
  private dueDate: DueDate;

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

  constructor(
    title: string,
    completed: boolean = false,
    createdAt: CreatedAt = new CreatedAt(new Date()),
    completedAt: CompletedAd = new CompletedAd(null),
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
    this.completedAt = new CompletedAd(new Date());
  }

  public overDue(): boolean {
    const due = this.dueDate.getValue();
    if (due === null) {
      return false;
    }
    const today = new Date();
    return today.getTime() > due.getTime();
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

export class Title {
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

export class CreatedAt {
  private value: Date;

  public getValue(): Date {
    return this.value;
  }

  constructor(value: Date) {
    this.value = value;
  }

  public equals(createdAt: CreatedAt): boolean {
    return this.value.getTime() === createdAt.getValue().getTime();
  }
}

export class CompletedAd {
  private value: Date | null;

  public getValue(): Date | null {
    return this.value;
  }

  constructor(value: Date | null) {
    this.value = value;
  }

  public equals(completedAt: CompletedAd): boolean {
    return this.value?.getTime() === completedAt.getValue()?.getTime();
  }
}

export class DueDate {
  private value: Date | null;

  public getValue(): Date | null {
    return this.value;
  }

  constructor(value: Date | null) {
    this.value = value;
  }

  public equals(dueDate: DueDate): boolean {
    return this.value?.getTime() === dueDate.getValue()?.getTime();
  }
}
