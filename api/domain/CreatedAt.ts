export class CreatedAt {
  private value: Date;

  public getValue(): Date {
    return this.value;
  }

  constructor(value: Date) {
    this.value = value;
  }

  public equals(createdAt: CreatedAt): boolean {
    return this.value.getTime() === createdAt.getValue().getTime();
  }
}
