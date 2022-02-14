export class Title {
  private value: string;

  get Value(): string {
    return this.value;
  }

  constructor(value: string) {
    this.value = value;
  }

  public equals(title: Title): boolean {
    return this.value === title.Value;
  }
}
