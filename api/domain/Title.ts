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
