export class CompletedAt {
  private value: Date | null;

  get Value(): Date | null {
    return this.value;
  }

  constructor(value: Date | null) {
    this.value = value;
  }

  public equals(completedAt: CompletedAt): boolean {
    return this.value?.getTime() === completedAt.Value?.getTime();
  }
}