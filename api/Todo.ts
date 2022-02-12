export class Todo {
  private title: Title;
  private completed: boolean;

  getTitle(): string {
    return this.title.getValue();
  }

  getCompleted(): boolean {
    return this.completed;
  }

  constructor(title: string) {
    this.title = new Title(title);
    this.completed = false;
  }

  public complete(): void {
    this.completed = true;
  }

  equals(other: Todo): boolean {
    return this.title.equals(other.title) && this.completed === other.completed;
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