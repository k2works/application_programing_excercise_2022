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
  private isOverDue: boolean;
  private id: number | null;

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
    return this.completedAt?.Value;
  }

  get DueDate(): Date | null {
    return this.dueDate?.Value;
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
    this.completed = completed;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.dueDate = dueDate;
    this.id = id;
    this.isOverDue = this.overDue();
  }

  public complete(): void {
    this.completed = true;
    this.completedAt = new CompletedAt(new Date());
  }

  public overDue(): boolean {
    return this.dueDate.overDue();
  }

  public setDueDate(due: DueDate): Todo {
    const dueDate = due.Value;
    if (dueDate !== null) {
      if (this.createdAt.Value.getTime() > dueDate.getTime())
        throw new Error("開始日より前に期限が設定されています");
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
      this.completed == other.completed &&
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