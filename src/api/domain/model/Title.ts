/**
 * タイトル
 */
export class Title {
  private value: string;

  get Value(): string {
    return this.value;
  }

  constructor(value: string) {
    if (value === null || value === undefined || value === "")
      throw new Error("タイトルが未入力です");
    this.value = value;
  }

  public equals(other: Title): boolean {
    return this.Value === other.Value;
  }
}
