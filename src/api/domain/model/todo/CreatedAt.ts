/**
 * 作成日
 */
export class CreatedAt {
  private value: Date;

  get Value(): Date {
    return this.value;
  }

  constructor(value: Date) {
    this.value = value;
  }

  public equals(createdAt: CreatedAt): boolean {
    return this.value.getTime() === createdAt.Value.getTime();
  }
}
