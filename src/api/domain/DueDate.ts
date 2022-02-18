export class DueDate {
  private value: Date | null;

  get Value(): Date | null {
    return this.value;
  }

  constructor(value: Date | null) {
    this.value = value;
  }

  public equals(dueDate: DueDate): boolean {
    return this.value?.getTime() === dueDate.Value?.getTime();
  }

  public overDue(): boolean {
    const due = this.Value;
    if (due === null) {
      return false;
    } else {
      const today = new Date();
      const dueDay = new Date(due);
      return today.getTime() > dueDay.getTime();
    }
  }
}
