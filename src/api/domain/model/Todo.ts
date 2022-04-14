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

  constructor(params: {
    title: string;
    completed: boolean;
    createdAt: CreatedAt;
    completedAt: CompletedAt;
    dueDate: DueDate;
    id: number | null;
  }) {
    this.title = new Title(params.title);
    this.isCompleted = params.completed;
    this.createdAt = params.createdAt;
    this.completedAt = params.completedAt;
    this.dueDate = params.dueDate;
    this.id = params.id ? params.id : null;
    this.status = TodoStatus.create(this);
    this.isOverDue = params.dueDate.overDue();
  }

  public static create(params: {
    title: string;
    completed?: boolean;
    createdAt?: CreatedAt;
    completedAt?: CompletedAt;
    dueDate?: DueDate;
    id?: number | null;
  }): Todo {
    const completed = params.completed ? params.completed : false;
    const createdAt = params.createdAt
      ? params.createdAt
      : new CreatedAt(new Date());
    const completedAt = params.completedAt
      ? params.completedAt
      : new CompletedAt(null);
    const dueDate = params.dueDate ? params.dueDate : new DueDate(null);
    const id = params.id ? params.id : null;

    return new Todo({
      ...params,
      completed,
      createdAt,
      completedAt,
      dueDate,
      id,
    });
  }

  public complete(): Todo {
    return Todo.create({
      title: this.title.Value,
      completed: true,
      createdAt: this.createdAt,
      completedAt: new CompletedAt(new Date()),
      dueDate: this.dueDate,
      id: this.id,
    });
  }

  public setDueDate(due: DueDate): Todo {
    if (due.overDue(this.createdAt.Value))
      throw new Error("開始日より前に期限を設定できません");

    return Todo.create({
      title: this.title.Value,
      completed: this.isCompleted,
      createdAt: this.createdAt,
      completedAt: this.completedAt,
      dueDate: due,
      id: this.id,
    });
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
