let todoIdx = 0;

export class TodoItemModel {
  constructor({ id = null, title, completed, dueDate }) {
    if (id == null) {
      this.id = todoIdx++;
    } else {
      this.id = id;
    }
    this.title = title;
    this.completed = completed;
    this.dueDate = dueDate;
  }
}
