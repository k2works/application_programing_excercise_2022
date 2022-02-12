export class DueDate {
  private value: Date | null;

  public getValue(): Date | null {
    return this.value;
  }

  constructor(value: Date | null) {
    this.value = value;
  }

  public equals(dueDate: DueDate): boolean {
    return this.value?.getTime() === dueDate.getValue()?.getTime();
  }

  public overDue(): boolean {
    const due = this.getValue();
    if (due === null) {
      return false;
    }
    const today = new Date();
    return today.getTime() > due.getTime();
  }
}
