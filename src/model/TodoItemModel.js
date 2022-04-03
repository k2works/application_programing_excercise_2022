export class TodoItemModel {
  constructor({ id, title, completed, dueDate, status }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.dueDate = dueDate;
    this.createdAt = new Date();
    this.completedAt = null;
    this.status = status;
  }
}
