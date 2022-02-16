export class Title {
  private value: string;

  get Value(): string {
    return this.value;
  }

  constructor(value: string) {
    if (value === undefined || value === null || value === "")
      throw new Error("タイトルが指定されていません");
    this.value = value;
  }

  public equals(title: Title): boolean {
    return this.value === title.Value;
  }
}
