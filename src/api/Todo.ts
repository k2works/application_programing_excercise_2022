export class Todo {
  private title: string;
  private completed: boolean;

  get Title(): string {
    return this.title;
  }

  get Completed(): boolean {
    return this.completed;
  }

  constructor(title: string) {
    this.title = title;
    this.completed = false;
  }

  public complete(): void {
    this.completed = true;
  }
}
