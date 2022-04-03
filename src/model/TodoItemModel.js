export class TodoItemModel {
  constructor({ title, completed, dueDate }) {
    this.id = 0;
    this.title = title;
    this.completed = completed;
    this.dueDate = dueDate;
    this.createdAt = new Date();
  }
}
