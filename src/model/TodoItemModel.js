let todoIdx = 0;

export class TodoItemModel {
  constructor({ title, completed, dueDate }) {
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
    this.dueDate = dueDate;
  }
}
