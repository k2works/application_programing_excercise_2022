/**
 * タイトル
 */
export class Title {
  private value: string;

  get Value(): string {
    return this.value;
  }

  constructor(value: string) {
    this.value = value;
  }

  public equals(other: Title): boolean {
    return this.Value === other.Value;
  }
}
