export class TodoItemModel {
  constructor({ title, completed, dueDate, status }) {
    this.id = 0;
    this.title = title;
    this.completed = completed;
    this.dueDate = dueDate;
    this.createdAt = new Date();
    this.completedAt = null;
    this.status = status;
  }
}
