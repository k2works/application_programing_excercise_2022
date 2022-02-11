export class Todo {
  private title: string;
  private completed: boolean;

  getTitle(): string {
    return this.title;
  }

  getCompleted(): boolean {
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
